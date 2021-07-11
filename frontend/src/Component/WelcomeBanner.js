import React from "react";
import SpeechRecognition from "react-speech-recognition";
import Feature from "./Feature";
import { useAuth0 } from "@auth0/auth0-react";
import SignupButton from "./SignupButton";
import LogoutButton from "./LogoutButton";

const WelcomeBanner = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="welcome-container">
      <div className="banner">
        <h3 className="">InRead.</h3>
        <p className="desc">For better Reading Experience..</p>
      </div>
      <div className="container actions">
        <button
          className="btn banner-btn bold"
          onClick={() => SpeechRecognition.startListening({ continuous: true })}
        >
          Start Reading
        </button>
        {isAuthenticated ? <LogoutButton /> : <SignupButton />}
        <img src="/images/icons/reading.png" className="banner-img" alt="" />
      </div>
      <i className="fa fa-angle-double-down down-arr"></i>
      <Feature
        feature={"Search Words"}
        desc={"Definition and example With Powerful Api"}
        imgSrc={"./images/icons/voice.png"}
      />
      <Feature
        feature={"Read and Save"}
        desc={
          "Save your words as you read. New words are hard to remember so just say 'save' rest inRead do it for you"
        }
        imgSrc={"./images/icons/saly-29.png"}
      />
      <Feature
        feature={"Voice Commands"}
        desc={
          "No Need to touch your device while reading. InRead listen to your commands."
        }
        imgSrc={"./images/icons/saly-29.png"}
      />
    </div>
  );
};

export default WelcomeBanner;
