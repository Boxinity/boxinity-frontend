import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { App, Test, MapTest, ApiCallTest } from "../components";

export default () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/test" component={Test} />
      <Route exact path="/maptest" component={MapTest} />
      <Route exact path="/apitest" component={ApiCallTest} />
    </div>
  </BrowserRouter>
);
