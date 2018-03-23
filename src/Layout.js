import React, { Component } from "react";

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    let plane = [];
    for (let r = 0; r < 4; r++) {
      plane.push("row_" + r);
      plane[r] = [];
      for (let c = 0; c < 4; c++) {
        plane[r].push(null);
      }
    }
    let position = this.initRC();
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$ : ", plane);
    this.setState({
      plane,
      position
    });
  }
  renderLayout() {
    let plane = this.state.plane;
    let row = [];
    for (let r in plane) {
      for (let c in plane[r]) {
        row.push(`<div class='col-md-3 " + plane[r][c] + "'></div>`);
      }
    }
    // console.log('row: ',row);

    return row;
  }
  initNumber() {
    let randNumber = Math.random() * 2;
    randNumber = Math.floor(randNumber);
    if (randNumber === 0) {
      randNumber = 2;
    } else if (randNumber === 1) {
      randNumber = 4;
    }
    console.log(randNumber);
    return randNumber;
  }
  initRC() {
    let position = [];
    let randRow = 0 + Math.random() * 4;
    let randCol = 0 + Math.random() * 4;
    randRow = Math.floor(randRow);
    randCol = Math.floor(randCol);
    position[0] = randRow;
    position[1] = randCol;
    return position;
  }

  initPlane(plane) {
    let randNumber = this.initNumber();

    let position = this.state.position;

    if (plane[position[0]][position[1]] == null) {
      plane[position[0]][position[1]] = randNumber;
      console.log("############# rand: ", plane);
      this.setState({
        plane
      });
    } else {
      let position = this.initRC();
      this.setState({
        position
      });
    }
  }

  goLeft() {
    let plane = this.state.plane;
    for (let i = 0; i < 4; i++) {
      if (plane[i][0] === plane[i][1]) {
        plane[i][0] = plane[i][0] + plane[i][1];
      }
      if (plane[i][1] === plane[i][2]) {
        plane[i][1] = plane[i][1] + plane[i][2];
      }
      if (plane[i][2] === plane[i][3]) {
        plane[i][2] = plane[i][2] + plane[i][3];
      }
    }
    this.setState({
      plane
    });
  }

  render() {
    let plane = this.state.plane;
    let position = this.state.position;
    // let plane = this.renderLayout();
    console.log("plane: ", plane);
    console.log("position: ", position);
    return (
      <div className="layout">
        <div className="container">
          <div className="row">
            {plane.map(function(obj, i) {
              return (
                <div className={"layout_row row_" + i}>
                  {obj.map(function(cell, index) {
                    return <div className={"col col_" + index}>{cell}</div>;
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => {
            this.initPlane(plane);
          }}
        >
          start
        </button>
        <div className="remote_button">
          <div>
            <button onClick={this.goLeft}>&lt;</button>
          </div>
        </div>
      </div>
    );
  }
}
