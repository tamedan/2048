import React, { Component } from "react";
import autoBind from "react-autobind";
import { Swipeable } from "react-touch";
import { isMobile } from "react-device-detect";
import { styles } from "/src/styles/styles";
import injectSheet from "react-jss";

@injectSheet(styles)
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
    this.setState(
      {
        plane,
        position
      },
      this.initPlane(plane)
    );
  }
  renderLayout() {
    let plane = this.state.plane;
    let row = [];
    for (let r in plane) {
      for (let c in plane[r]) {
        row.push(`<div class='col-md-3 " + plane[r][c] + "'></div>`);
      }
    }
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
    let inn = 0;
    for (let i = 0; i < 4; i++) {
      plane[i].indexOf(null);
      console.log(
        "@@@@@@@@@@@@ plane[i].indexOf(null)",
        plane[i].indexOf(null)
      );
      if (plane[i].indexOf(null) < 0) {
        inn++;
        if (4 <= inn) {
          alert("!!!!!!!!!!!!!");
          return;
        }
      }
    }
    let randNumber = this.initNumber();
    let position = this.initRC();
    if (plane[position[0]][position[1]] !== null) {
      while (plane[position[0]][position[1]] !== null) {
        position = this.initRC();
      }
    }
    if (plane[position[0]][position[1]] === null) {
      plane[position[0]][position[1]] = randNumber;
      this.setState({
        plane
      });
    }
  }

  goLeft(plane) {
    this.moveToLeft(plane);
    this.moveToLeft(plane);
    this.addToLeft(plane);
    this.moveToLeft(plane);
    this.moveToLeft(plane);
    this.initPlane(plane);
    return plane;
  }
  moveToLeft(plane) {
    for (let row = 3; 0 <= row; row--) {
      for (let col = 3; 0 <= col; col--) {
        if (plane[row][col] !== null) {
          if (plane[row][col - 1] === null) {
            plane[row][col - 1] = plane[row][col];
            plane[row][col] = null;
            if (plane[row][col - 1] === 0) {
              plane[row][col - 1] = null;
            }
          }
        }
      }
    }
    return plane;
  }
  addToLeft(plane) {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (plane[row][col] !== null) {
          if (plane[row][col - 1] && plane[row][col] === plane[row][col - 1]) {
            plane[row][col - 1] = plane[row][col] + plane[row][col - 1];
            plane[row][col] = null;
          }
        }
      }
    }
    return plane;
  }

  goRight(plane) {
    this.moveToRight(plane);
    this.moveToRight(plane);
    this.addToRight(plane);
    this.moveToRight(plane);
    this.moveToRight(plane);
    this.initPlane(plane);
    return plane;
  }
  moveToRight(plane) {
    for (let row = 0; 4 > row; row++) {
      for (let col = 0; 4 > col; col++) {
        if (plane[row][col] !== null) {
          if (plane[row][col + 1] === null) {
            plane[row][col + 1] = plane[row][col];
            plane[row][col] = null;
          }
        }
      }
    }
    return plane;
  }
  addToRight(plane) {
    for (let row = 0; row < 4; row++) {
      for (let col = 3; 0 <= col; col--) {
        if (plane[row][col] !== null) {
          if (plane[row][col - 1] && plane[row][col] === plane[row][col - 1]) {
            plane[row][col] = plane[row][col] + plane[row][col - 1];
            plane[row][col - 1] = null;
          }
        }
      }
    }
    return plane;
  }
  goTop(plane) {
    this.moveToTop(plane);
    this.moveToTop(plane);
    this.addToTop(plane);
    this.moveToTop(plane);
    this.moveToTop(plane);
    this.initPlane(plane);
    return plane;
  }
  moveToTop(plane) {
    for (let row = 3; 0 <= row; row--) {
      for (let col = 3; 0 <= col; col--) {
        if (plane[row][col] !== null) {
          if (plane[row - 1] && plane[row - 1][col] === null) {
            plane[row - 1][col] = plane[row][col];
            plane[row][col] = null;
          }
        }
      }
    }
    return plane;
  }
  addToTop(plane) {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (plane[row][col] !== null) {
          if (plane[row - 1] && plane[row][col] === plane[row - 1][col]) {
            plane[row - 1][col] = plane[row][col] + plane[row - 1][col];
            plane[row][col] = null;
          }
        }
      }
    }
    return plane;
  }
  goDown(plane) {
    this.moveToDown(plane);
    this.moveToDown(plane);
    this.addToDown(plane);
    this.moveToDown(plane);
    this.moveToDown(plane);
    this.initPlane(plane);
    return plane;
  }
  moveToDown(plane) {
    for (let row = 0; 4 > row; row++) {
      for (let col = 3; 0 <= col; col--) {
        if (plane[row][col] !== null) {
          if (plane[row + 1] && plane[row + 1][col] === null) {
            plane[row + 1][col] = plane[row][col];
            plane[row][col] = null;
          }
        }
      }
    }
    return plane;
  }
  addToDown(plane) {
    for (let row = 3; 0 <= row; row--) {
      for (let col = 0; col < 4; col++) {
        if (plane[row][col] !== null) {
          if (plane[row - 1] && plane[row][col] === plane[row - 1][col]) {
            plane[row][col] = plane[row][col] + plane[row - 1][col];
            plane[row - 1][col] = null;
          }
        }
      }
    }
    return plane;
  }

  render() {
    let plane = this.state.plane;
    let position = this.state.position;
    console.log("plane: ", plane);
    console.log("position: ", position);

    const option = {
      ismobile: isMobile ? true : false
    };
    const { classes } = this.props;
    console.log(option);
    return (
      <Swipeable
        onSwipeLeft={() => this.goLeft(plane)}
        onSwipeRight={() => this.goRight(plane)}
        onSwipeUp={() => this.goTop(plane)}
        onSwipeDown={() => this.goDown(plane)}>
        <div className="layout">
          <div className="container">
            <div className="row row_l">
              {plane.map(function(obj, i) {
                return (
                  <div className={"layout_row row_" + i}>
                    {obj.map(function(cell, index) {
                      return (
                        <div className={"col col_" + index + " s_" + cell}>
                          {cell}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={classes.remote_button}>
            <div>
              <button
                hidden={option.ismobile}
                onClick={() => {
                  this.goLeft(plane);
                }}>
                &#8672;
              </button>
              <button
                hidden={option.ismobile}
                onClick={() => {
                  this.goRight(plane);
                }}>
                &#8674;
              </button>
              <button
                hidden={option.ismobile}
                onClick={() => {
                  this.goTop(plane);
                }}>
                &#8673;
              </button>
              <button
                hidden={option.ismobile}
                onClick={() => {
                  this.goDown(plane);
                }}>
                &#8675;
              </button>
            </div>
          </div>
        </div>
      </Swipeable>
    );
  }
}
