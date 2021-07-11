import React from "react";
import { useSpeechContext } from "../SpeechContextProvider";
import WelcomeBanner from "./WelcomeBanner";
import Core from "./Core";

const Home = () => {
  const { listening } = useSpeechContext();
  console.log(listening);
  return <div className="home">{listening ? <Core /> : <WelcomeBanner />}</div>;
};

export default Home;
