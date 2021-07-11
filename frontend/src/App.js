import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoutes";
import Saves from "./Component/Saves";
import Home from "./Component/Home";
import Header from "./Component/Header";
import WordResult from "./Component/WordResult";
import NotFound from "./Component/NotFound";

function App() {
  return (
    <div className="App home">
      <Header />
      <Switch>
        <ProtectedRoute exact path="/save" component={Saves} />
        <Route path="/result/:word" component={WordResult} />
        <Route exact path="/" component={Home} />
        <Route path="" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
