import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import Layout from "./Layout";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <Hello name="CodeSandbox" />
    <h2>2048 {"\u2728"}</h2>
    <Layout />
  </div>
);

render(<App />, document.getElementById("root"));
