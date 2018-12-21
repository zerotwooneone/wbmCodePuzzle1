import React, { Component } from 'react';
import logo from './logo.svg';
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

  sanitize(input) {
    //console.log(input);
    return input
      .split("")
      .map(c => {
        //console.log(c);      	
        return this.state.inputMap[c];
      });
  }

  permutate(currentArr, others) {
//console.log("currentArr",JSON.stringify(currentArr));
//console.log("others",JSON.stringify(others));

    if (!currentArr.length ||
      !others.length) {
      return;
    }

    if (others.length === 1) {
      return currentArr.map((v, i) => {
        let result = others[0].map((ov, oi) => [v, ...ov]);
//console.log("result",JSON.stringify(result));
        return result;
      })
    } else {
      //console.log("others 2",JSON.stringify(others));
      let op = others.map((oArr, index) => {
        let otherOthers = others.filter((v, i) => i !== index);
        //console.log("oArr",JSON.stringify(oArr));
        //console.log("otherOthers",JSON.stringify(otherOthers));
        let permutated = this.permutate(oArr, otherOthers);
console.log("permutated", JSON.stringify(permutated ? permutated.flat() : undefined));
        if (permutated) {
          return permutated.flat().map((v,i)=>{
            return currentArr.map((cv,ci)=>{
              let ra = [cv,...v];
console.log("ra",JSON.stringify(ra));
              return ra;
            })
          })
          .flat();
        } else {
          return null;
        }
      });
//console.log("op.flat",JSON.stringify(op.flat()));
      return op.flat();
    }
  }

  renderCombos(input) {
    let remaining = input.slice(0);
    //console.log(JSON.stringify(input));
    return input.map((arr, index) => {
      //console.log(JSON.stringify(arr));
      remaining[index] = null;
      let others = remaining.filter((v, i) => v !== null);
      //console.log("arr",JSON.stringify(arr));
      //console.log("others",JSON.stringify(others));
      let perm = this.permutate(arr, others);
      return (<div key={index}>
        {JSON.stringify(perm)}
      </div>)
    })
  }

  render() {
    return (
      <div className="solution">
        {this.renderCombos.bind(this)(
          this.sanitize
            .bind(this)(this.props.input)
        )}
      </div>
    );
  }
}


export default App;
