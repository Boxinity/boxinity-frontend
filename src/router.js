import React from "react";
import { BrowserRouter } from "react-router-dom";

export default (Component) => (
  <BrowserRouter>
    <Component/>
  </BrowserRouter>
);
