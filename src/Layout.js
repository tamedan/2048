import React, { Component } from "react";
import autoBind from "react-autobind";

export default class Layout extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
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

    let position = this.initRC();
    if (plane[position[0]][position[1]] !== null) {
      while (plane[position[0]][position[1]] !== null) {
        position = this.initRC();
      }
    }

    if (plane[position[0]][position[1]] === null) {
      plane[position[0]][position[1]] = randNumber;
      console.log("############# rand: ", plane);
      this.setState({
        plane
      });
    }
  }

  goLeft(plane) {
    for (let i = 0; i < 4; i++) {
      let w = 0;
      while (w < 4) {
        let n = 0;
        while (n < 4) {
          if (plane[i][w] == null) {
            plane[i] = plane[i].concat(plane[i].splice(w, 1));
          }
          n++;
        }
        w++;
      }
    }
    for (let i = 0; i < 4; i++) {
      if (plane[i][0] === plane[i][1] && plane[i][0]) {
        plane[i][0] = plane[i][0] + plane[i][1];
        plane[i][1] = null;
      }
      if (plane[i][1] === plane[i][2] && plane[i][1]) {
        if (plane[i][0]) {
          plane[i][1] = plane[i][1] + plane[i][2];
          plane[i][2] = null;
        } else {
          plane[i][0] = plane[i][1] + plane[i][2];
          plane[i][1] = plane[i][2] = null;
        }
      }
      if (plane[i][2] === plane[i][3] && plane[i][2]) {
        if (plane[i][1]) {
          plane[i][2] = plane[i][2] + plane[i][3];
          plane[i][3] = null;
        } else {
          plane[i][1] = plane[i][2] + plane[i][3];
          plane[i][2] = plane[i][3] = null;
        }
      }
    }
    console.log("@@@@@@@@@@@ plane goLeft:", plane);
    this.setState({
      plane
    });
    this.initPlane(plane);
  }

  goRight(plane) {
    for (let i = 0; i < 4; i++) {
      let w = 3;
      while (w >= 0) {
        let n = 0;
        while (n < 4) {
          if (plane[i][w] == null) {
            plane[i].splice(w, 1);
            // plane[i] = plane[i].concat(sp);
            plane[i].unshift(null);
          }
          n++;
        }
        w--;
      }
    }

    for (let i = 0; i < 4; i++) {
      if (plane[i][0] === plane[i][1] && plane[i][1]) {
        if (plane[i][2]) {
          plane[i][1] = plane[i][0] + plane[i][1];
          plane[i][0] = null;
        } else {
          plane[i][2] = plane[i][0] + plane[i][1];
          plane[i][1] = plane[i][0] = null;
        }
      }
      if (plane[i][1] === plane[i][2] && plane[i][2]) {
        if (plane[i][3]) {
          plane[i][2] = plane[i][1] + plane[i][2];
          plane[i][1] = null;
        } else {
          plane[i][3] = plane[i][1] + plane[i][2];
          plane[i][1] = plane[i][2] = null;
        }
      }
      if (plane[i][2] === plane[i][3] && plane[i][3]) {
        plane[i][3] = plane[i][2] + plane[i][3];
        plane[i][2] = null;
      }
    }

    this.setState({
      plane
    });
    this.initPlane(plane);
  }

  goTop(plane) {
    let newArr = [];
    for (let nr = 0; nr < 4; nr++) {
      for (let r = 0; r < 4; r++) {
        console.log("$$$$$$$$$$$ newArr: ", newArr);
        if (!newArr[nr]) {
          newArr[nr] = [];
        }
        newArr[nr][newArr[nr].length] = plane[r][nr];
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!! newArr: ", newArr);
      }
    }
    this.goLeft(newArr);
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
            <button
              onClick={() => {
                this.goLeft(plane);
              }}
            >
              &lt;
            </button>
            <button
              onClick={() => {
                this.goRight(plane);
              }}
            >
              &gt;
            </button>
            <button
              onClick={() => {
                this.goTop(plane);
              }}
            >
              ^
            </button>
          </div>
        </div>
      </div>
    );
  }
}
