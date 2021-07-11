import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const WordResult = () => {
  const { word } = useParams();
  const [result, setResult] = useState("");
  const token = process.env.REACT_APP_WORDAPI;

  useEffect(() => {
    async function fetchData() {
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
      } catch (err) {
        setResult(null);
      }
    }
    fetchData();
  }, [word]);

  return (
    <div className="result-container">
      <Link to="/save" className="btn action-btn">
        {" "}
        <i class="fa fa-arrow-left"></i> Back
      </Link>
      <ul className="result-list">
        {result &&
          result.map((word) => {
            return (
              <li className="each-result card">
                <div className="card-header">
                  <button className="btn">
                    <i class="fa fa-bookmark"></i>
                  </button>
                  <div className="badge">{word.type}</div>
                </div>
                <div className="card-body">
                  <h5 className="light-italic">Defintion:</h5>
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

export default WordResult;
