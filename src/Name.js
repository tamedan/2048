import React, { Component } from "react";
import autoBind from "react-autobind";

export default class Layout extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }

  clickInput(e) {
    let x = e.target.value;
    if (e.key === "Enter") {
      console.log(x);
    }
    // let name = e.target.value;
  }

  render() {
    return (
      <div>
        <input
          name="name"
          id="name"
          placeholder="Имя"
          onKeyPress={this.clickInput}
        />
      </div>
    );
  }
}
