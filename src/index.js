import React from "react";
import { render } from "react-dom";
import Layout from "./Layout";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <Layout />
  </div>
);

render(<App />, document.getElementById("root"));
