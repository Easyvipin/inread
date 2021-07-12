import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Loading from "./Component/Loading";
import toast, { Toaster } from "react-hot-toast";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const SpeechContext = React.createContext();

export function useSpeechContext() {
  return React.useContext(SpeechContext);
}

const SpeechContextProvider = ({ children }) => {
  const [message, setMessage] = useState("Say Meaning of ...");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saves, setSaves] = useState(null);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const token = process.env.REACT_APP_WORDAPI;
  const { isAuthenticated, getAccessTokenSilently, user, loginWithRedirect } =
    useAuth0();
  const notify = (custMessage) => {
    toast(`${custMessage}`, {
      duration: 2000,
      position: "top-center",

      // Styling
      style: {
        boxShadow: "0px 0px 4px 0px #b589d6",
        background: "#b589d6",
        color: "#fff",
      },
      // Custom Icon

      // Change colors of success/error/loading icon
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  };

  const commands = [
    {
      command: "Meaning of *",
      callback: (word, { resetTranscript }) => {
        setMessage(`${word}`);
        searchWord(word);

        resetTranscript();
      },
    },
    {
      command: "close",
      callback: ({ resetTranscript }) => {
        setResult(null);
        setMessage("Say Meaning of...");
        resetTranscript();
      },
    },
    {
      command: "stop",
      callback: () => {
        SpeechRecognition.stopListening();
      },
    },
    {
      command: "save",
      callback: () => {
        if (isAuthenticated) {
          setLoading("true");
          saveWord(user.email, message);
        } else {
          loginWithRedirect();
        }
      },
    },
  ];
  const searchWord = async (word) => {
    setLoading(true);
    try {
      let res = await axios.get(
        `https://owlbot.info/api/v4/dictionary/${word}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setResult(res.data.definitions);
      notify("Some Results..");
    } catch (err) {
      notify(`No Result for ${word}`);
    } finally {
      setLoading(false);
    }
  };

  const saveWord = async (email, word) => {
    try {
      const token = await getAccessTokenSilently();

      const response = await axios({
        method: "post",
        url: `/read-api/save-word`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          email,
          word,
        }),
      });
      notify(response.data.message);
    } catch (error) {
      notify("Error,say save again");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchSaves = async (email) => {
    try {
      const token = await getAccessTokenSilently();

      const response = await axios({
        method: "post",
        url: `/read-api/saves`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          email,
        }),
      });
      setSaves(response.data.words);
    } catch (error) {
      console.log(error);
      notify("Some Error");
    } finally {
      setLoading(false);
    }
  };

  const deleteWord = async (email, word) => {
    try {
      const token = await getAccessTokenSilently();

      const response = await axios({
        method: "post",
        url: `/read-api/delete-word`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          email,
          word,
        }),
      });

      setSaves(response.data.words);
      notify(`${word} Deleted`);
    } catch (error) {
      notify("Error,Try again");
    } finally {
      setLoading(false);
    }
  };

  const { transcript, listening, browserSupportsSpeechRecognization } =
    useSpeechRecognition({ commands });

  return (
    <SpeechContext.Provider
      value={{
        message,
        transcript,
        listening,
        result,
        fetchSaves,
        deleteWord,
        saves,
        searchWord,
      }}
    >
      <Toaster />
      {loading ? <Loading /> : children}
    </SpeechContext.Provider>
  );
};

export default SpeechContextProvider;
