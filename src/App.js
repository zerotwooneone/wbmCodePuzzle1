import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = null;
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    }
  }

  handleInputChanged(e) {
    //console.log('value is', e.target.value)
    this.state.value = e.target.value;
    this.forceUpdate(); //this is a HACK
  }

  render() {
    return (
      <div>
        <h1>Input Numpad String (0-9#*)</h1>
        <div>
          <input
            value={this.state.value}
            onChange={this.handleInputChanged.bind(this)}
            type="text" />
        </div>
        <h1>Solution</h1>
        <div>
          <Solution input={this.state.value}></Solution>
        </div>
      </div>
    );
  }
}

class Solution extends React.Component {

  state = null;
  constructor(props) {
    super(props);

    this.state = {
      inputMap: {
        "1": [],
        "2": ['A', 'B', 'C'],
        "3": ['D', 'E', 'F'],
        "4": ['G', 'H', 'I'],
        "5": ['J', 'K', 'L'],
        "6": ['M', 'N', 'O'],
        "7": ['P', 'Q', 'R', 'S'],
        "8": ['T', 'U', 'V'],
        "9": ['W', 'X', 'Y', 'Z'],
        "0": [],
        "*": [],
        "#": [],
      }
    }
  }

  mapInputs(input) {
    //console.log(input);
    return input
      .split("")
      .map(c => {
        //console.log(c);      	
        return this.state.inputMap[c];
      });
  }

  permutate(array1D, others) {
    //console.log("currentArr",JSON.stringify(currentArr));
    //console.log("others",JSON.stringify(others));

    if (!array1D.length ||
      !others.length) {
      return [];
    }

    if (others.length === 1) {
      return array1D.map((v, i) => {
        let result = others[0].map((ov, oi) => [v, ...ov]);
        //console.log("result", JSON.stringify(result));
        return result;
      })
    } else {
      //console.log("others 2",JSON.stringify(others));
      let permutated = this.permutate2d(others);
      //console.log("permutated", JSON.stringify(permutated ? permutated : null));
      if (permutated) {
        let result = permutated.map((v, i) => {
          return array1D.map((cv, ci) => {
            let ra = [cv, ...v];
            //console.log("ra",JSON.stringify(ra));
            return ra;
          })
        });
        //console.log("result",JSON.stringify(result)); 
        return result;
      } else {
        return [];
      }
    }
  }

  permutate2d(array2d) {
    //console.log("array2d", JSON.stringify(array2d));
    let target = array2d.shift();

    //console.log("innerArray", JSON.stringify(innerArray));
    //console.log("array2d", JSON.stringify(array2d));
    if (array2d.length === 0 ||
      target.length === 0) {
      return null;
    }
    let perm = this.permutate(target, array2d)
      .flat();
    //console.log("perm",JSON.stringify(perm));
    return perm;
  }

  renderCombos(input) {
    //console.log(JSON.stringify(input));
    return (this.permutate2d(input) || []).map((arr, index) => {
      //console.log("arr",JSON.stringify(arr));
      return (<div key={index}>
        {JSON.stringify(arr)}
      </div>)
    })
  }

  render() {
    return (
      <div className="solution">
        {this.renderCombos.bind(this)(
          this.mapInputs.bind(this)(this.props.input))
        }
      </div>
    );
  }
}


export default App;
