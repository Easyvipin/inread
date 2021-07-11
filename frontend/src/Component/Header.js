import React from "react";
import { Link } from "react-router-dom";
import AuthenticationButton from "./AuthenticationButton";
import SpeechRecognition from "react-speech-recognition";
import { useSpeechContext } from "../SpeechContextProvider";
const Header = () => {
  const { listening } = useSpeechContext();
  return (
    <div className="header">
      <ul className="links">
        <h3>InRead.</h3>
        <li className="each-nav">
          <Link to="/save">
            <i className="fa fa-bookmark"></i>
          </Link>
        </li>
        <li className="each-nav">
          {listening ? (
            <button
              className="btn"
              onClick={() => SpeechRecognition.abortListening()}
            >
              <i className="fa fa-microphone-slash"></i>
            </button>
          ) : (
            <button
              className="btn"
              onClick={() =>
                SpeechRecognition.startListening({ continuous: true })
              }
            >
              <i className="fa fa-microphone"></i>
            </button>
          )}
        </li>
        <li className="each-nav">
          <AuthenticationButton />
        </li>
      </ul>
    </div>
  );
};

export default Header;
