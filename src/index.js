import React from "react";
import ReactDOM from "react-dom";
import RouterApp from "./RouterApp";
import RouterV3App from "./RouterV3App";
import { createStore } from "redux";
import allReducer from "./reducers";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { VideoCall, ReceivingCall, ChooseConversation, Register, EndCall, Login, Help } from "./views";
import "./assets/css/style.css";

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/:uuid" component={router} />
      <Route path="/" component={routerV3Normal} />
      <Route path="/v3/emergency" component={routerV3Emergency} />
      <Route path="/v3/normal" component={routerV3Normal} />
      <Route path="/login" component={LoginApp} />
      <Route path="/endcall" component={EndCall} />
      <Route path="/register" component={Register} />
      <Route path="/videocall" component={VideoCall} />
      <Route path="/receivingcall" component={ReceivingCall} />
      <Route path="/help" component={Help} />
      <Route path="/ChooseConversation" component={ChooseConversation} />
    </Switch>
  </Router>
);

const router = ({ match }) => <RouterApp uuid={match.params.uuid} />;
const LoginApp = () => <Login type="login" />;
const routerV3Normal = () => <RouterV3App uuid="normal" />;
const routerV3Emergency = () => <RouterV3App uuid="emergency" />;
const store = createStore(allReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("root")
);
