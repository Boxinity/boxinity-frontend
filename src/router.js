import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { App, Test } from "./components"

export default () => (
  <BrowserRouter>
    <div>
        <Route exact path="/" component={App} />
        <Route exact path="/test" component={Test} />
    </div>
  </BrowserRouter>
);
