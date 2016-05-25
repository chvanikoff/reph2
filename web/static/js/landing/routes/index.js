import React from "react";
import { Route, IndexRoute } from "react-router";

import AppContainer from "containers/App";
import Main from "components/Main";
import Login from "components/Login";
import Registration from "components/Registration";


export default (<Route path="/" component={AppContainer}>
  <IndexRoute component={Main} />

  <Route path="/auth">
    <Route path="/auth/login" component={Login} />
    <Route path="/auth/register" component={Registration} />
  </Route>
</Route>);