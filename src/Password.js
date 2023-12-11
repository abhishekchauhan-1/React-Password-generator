// Import the CSS file for styling
import "./style.css";

// Import necessary modules and components from React and external libraries
import { Component } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

// Define the Password component as a class component
class Password extends Component {
  // Constructor to initialize the component's state
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

  // Function to generate a password based on user preferences
  generatePassword = () => {
    const {
      sliderValue,
      isLowerCase,
      isUpperCase,
      includeNumbers,
      includeSymbols,
    } = this.state;

    // Define character sets for different types of characters
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";
    const numberChars = "0123456789";

    let allowedChars = "";
    let password = "";

    // Concatenate character sets based on user preferences
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

    // Generate the password based on the concatenated character set
    for (let i = 0; i < sliderValue; i++) {
      const randomValue = Math.floor(Math.random() * allowedChars.length);
      password += allowedChars.charAt(randomValue);
    }

    // Update the component state with the generated password
    this.setState({ password });
  };

  // Event handler for slider value change
  handleSliderChange = (event) => {
    const newvalue = event.target.value;
    this.setState({ sliderValue: newvalue });
  };

  // Function to copy the generated password to the clipboard
  copyToClipBoard = () => {
    const { password } = this.state;
    navigator.clipboard.writeText(password).then(() => {
      alert("Copied");
    }).catch((error) => {
      console.error("Failed to Copy", error);
    });
  };

  // Render method for rendering the component
  render() {
    const {
      isUpperCase,
      isLowerCase,
      includeNumbers,
      includeSymbols,
      password
    } = this.state;

    // JSX code for rendering the Password component
    return (
      <div className="main-container">
        <p>Password Generator</p>
        <div className="textArea">
          {/* Display the generated password in a textarea */}
          <textarea className="textElement" defaultValue={password} placeholder="P4$5W0rD!" readOnly></textarea>
          {/* Button to copy the password to the clipboard */}
          <button className="icon-btn" onClick={this.copyToClipBoard}>
            <FontAwesomeIcon className="icon-btn" icon={faCopy} />
          </button>
        </div>

        {/* Section for user preferences and password generation */}
        <div className="elements">
          <div className="charlength">
            {/* Display the character length and slider value */}
            <p className="charP">Character Length</p>
            <p className="zeroP">{this.state.sliderValue}</p>
          </div>
          {/* Slider for selecting the character length */}
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

          {/* Checkbox options for including different types of characters */}
          <div className="checkbox">
            {/* Uppercase letters */}
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
            {/* Lowercase letters */}
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
            {/* Numbers */}
            <input
              type="checkbox"
              id="Numbers"
              name="option"
              className="checkbox1"
              onChange={() => this.setState({ includeNumbers: !includeNumbers })}
            />
            <label htmlFor="Numbers" className="includelabel">
              Include Numbers
            </label>
            <br />
            {/* Symbols */}
            <input
              type="checkbox"
              id="symbols"
              name="option"
              className="checkbox1"
              checked={includeSymbols}
              onChange={() => this.setState({ includeSymbols: !includeSymbols })}
            />
            <label htmlFor="symbols" className="includelabel">
              Include Symbols
            </label>
          </div>

          {/* Display the password strength */}
          <div className="strength">
            <p>STRENGTH</p>
            <div className="inside-div">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          {/* Button to generate a new password */}
          <button className="btn" onClick={this.generatePassword}>GENERATE</button>
        </div>
      </div>
    );
  }
}

// Export the Password component as the default export of this module
export default Password;
