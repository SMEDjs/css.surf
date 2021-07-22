import * as React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from "./header.jsx";
import Home from "../pages/home";
import Notfound from "../pages/notfound";
import Settings from "../pages/settings"
import New from "../pages/new"
import User from "../pages/user"
import Premium from "../pages/premium"
export default () => (
  <BrowserRouter>
    <Header>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/@:username" exact component={User} />
        <Route path="/new" exact component={New} />
        <Route path="/premium" exact component={Premium} />
        <Route component={Notfound} />
      </Switch>
    </Header>
  </BrowserRouter>
);
