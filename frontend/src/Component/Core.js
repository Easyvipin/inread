import React from "react";
import { useSpeechContext } from "../SpeechContextProvider";
import Listen from "./Listen";
import Result from "./Result";

const Core = () => {
  const { result } = useSpeechContext();
  return <>{result ? <Result /> : <Listen />}</>;
};

export default Core;
