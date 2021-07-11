import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSpeechContext } from "../SpeechContextProvider";
const Saves = () => {
  const { user } = useAuth0();
  const { email } = user;
  const { fetchSaves, saves, deleteWord } = useSpeechContext();
  console.log(saves);
  const handleDelete = (word) => {
    deleteWord(email, word);
  };
  useEffect(() => {
    fetchSaves(email);
  }, []);
  return (
    <>
      <Link to="/" className="btn action-btn">
        {" "}
        <i className="fa fa-arrow-left"></i> Back
      </Link>
      <div className="saves-container">
        {saves !== null && saves !== [] ? (
          saves.map((word) => {
            return (
              <div className="each-word" key={word}>
                <Link to={`/result/${word}`}>{word}</Link>
                <button
                  className="btn btn-outline delete-btn"
                  onClick={() => {
                    handleDelete(word);
                  }}
                >
                  <i className="fa fa-times"></i>
                </button>
              </div>
            );
          })
        ) : (
          <div className="fallback-message">"Looking For books"</div>
        )}
      </div>
    </>
  );
};

export default Saves;
