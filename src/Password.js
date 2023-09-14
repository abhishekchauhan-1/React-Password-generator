import "./style.css";

import { Component } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

class Password extends Component {
  constructor() {
    super();
    this.state = {
      sliderValue: 0,
      isUpperCase: false,
      isLowerCase: false,
      includeNumbers: false,
      includeSymbols: false,
      password: "",
    };
  }

  generatePassword = () => {
    const {
      sliderValue,
      isLowerCase,
      isUpperCase,
      includeNumbers,
      includeSymbols,
    } = this.state;

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";
    const numberChars = "0123456789";

    let allowedChars = "";
    let password = "";

    if (isUpperCase) {
      allowedChars += uppercaseChars;
    }
    if (isLowerCase) {
      allowedChars += lowercaseChars;
    }
    if (includeNumbers) {
      allowedChars += numberChars;
    }
    if (includeSymbols) {
      allowedChars += symbolChars;
    }


    for(let i=0;i<sliderValue;i++){
        const randomValue = Math.floor(Math.random()*allowedChars.length);
        password += allowedChars.charAt(randomValue);
    }

    this.setState({password})

  };

  handleSliderChange = (event) => {
    const newvalue = event.target.value;
    this.setState({ sliderValue: newvalue });
  };

  copyToClipBoard = ()=>{
    const {password} = this.state;
    navigator.clipboard.writeText(password).then(()=>{
        alert("Copied");
    }).catch((error)=>{
        console.error("failed to Copy",error);
    })
  }


  render() {
    const {
      isUpperCase,
      isLowerCase,
      includeNumbers,
      includeSymbols,
      password
    } = this.state;

    return (
      <div className="main-container">
        <p>Password Generator</p>
        <div className="textArea">
        <textarea className="textElement" defaultValue={password} placeholder="P4$5W0rD!"></textarea>
        <button className="icon-btn" onClick={this.copyToClipBoard}>
          <FontAwesomeIcon className="icon-btn" icon={faCopy} />
        </button>
        </div>
        
        <div className="elements">
          <div className="charlength">
            <p className="charP">Character Length</p>
            <p className="zeroP">{this.state.sliderValue}</p>
          </div>
          <input
            type="range"
            id="slider"
            name="slider"
            min="0"
            max="20"
            step="1"
            className="custom-slider"
            value={this.state.sliderValue}
            onChange={this.handleSliderChange}
          />

          <div className="checkbox">
            <input
              type="checkbox"
              id="upperCase"
              name="option"
              className="checkbox1"
              onChange={() => this.setState({ isUpperCase: !isUpperCase })}
            />
            <label htmlFor="upperCase" className="includelabel">
              Include Uppercase Letter
            </label>
            <br />
            <input
              type="checkbox"
              id="lowerCase"
              name="option"
              className="checkbox1"
              onChange={() => this.setState({ isLowerCase: !isLowerCase })}
            />
            <label htmlFor="lowerCase" className="includelabel">
              Include Lowercase Letter
            </label>
            <br />
            <input
              type="checkbox"
              id="Numbers"
              name="option"
              className="checkbox1"
              onChange={() =>
                this.setState({ includeNumbers: !includeNumbers })
              }
            />
            <label htmlFor="Numbers" className="includelabel">
              Include Numbers
            </label>
            <br />
            <input
              type="checkbox"
              id="symbols"
              name="option"
              className="checkbox1"
              checked = {includeSymbols}
              onChange={() =>
                this.setState({ includeSymbols: !includeSymbols })
              }
            />
            <label htmlFor="symbols" className="includelabel">
              Include Symbols
            </label>
          </div>
          <div className="strength">
            <p>STRENGTH</p>
            <div className="inside-div">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <button className="btn" onClick={this.generatePassword}>GENERATE</button>
        </div>
      </div>
    );
  }
}

export default Password;
