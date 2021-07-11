import React from "react";
import { useSpeechContext } from "../SpeechContextProvider";

const Result = () => {
  const { result } = useSpeechContext();
  return (
    <div className="result-container">
      <div className="commands">
        <button className="command-badge btn">
          <i className="fa fa-microphone"></i> Close
        </button>
        <button className="command-badge btn">
          <i className="fa fa-microphone"></i> Save
        </button>
        <button className="command-badge btn">
          <i className="fa fa-microphone"></i> Stop
        </button>
      </div>
      <ul className="result-list">
        {result &&
          result.map((word, index) => {
            return (
              <li className="each-result card" key="index">
                <div className="card-header">
                  <i className="fa fa-bookmark"></i>

                  <div className="badge">{word.type}</div>
                </div>
                <div className="card-body">
                  <p className="definition ">{word.definition}</p>
                  <h5 className="light-italic">Example:</h5>
                  <p className="example bold-italic">
                    {word.example ? word.example : "Not available"}
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Result;
