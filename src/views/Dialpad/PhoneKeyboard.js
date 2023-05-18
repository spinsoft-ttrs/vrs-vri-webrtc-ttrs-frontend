import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MdKeyboardBackspace } from "react-icons/md";
import { setWebStatus, setRegisterData } from "../../actions";
import "./css/style.css";
const { detect } = require("detect-browser");
const browser = detect();

const PhoneKeyboard = (props) => {
  const dispatch = useDispatch();
  const [callNumber, setCallNumber] = useState("");

  const handleDialpad = (value) => {
    setCallNumber(callNumber + value);
  };
  const handleRemoveCallNumber = (event) => {
    const current = callNumber.slice(0, -1);
    setCallNumber(current);
  };
  const handleVRSCall = () => {
    if (browser.os === "firefox") return;
    localStorage.setItem("callType", "callVRS");
    if (callNumber === "9999") {
      dispatch(setRegisterData("callNumber", "9999"));
    } else if (callNumber === "9002") {
      dispatch(setRegisterData("callNumber", "9002"));
    } else {
      dispatch(setRegisterData("callNumber", "1" + callNumber));
    }
    if (callNumber !== "") {
      dispatch(setWebStatus("register"));
    }
  };
  const handleDialpadInput = (event) => {
    if (!isNaN(event.target.value)) {
      setCallNumber(event.target.value);
    }
  };

  return (
    <>
      <div className={`phonekeypad ${props.cls}`} style={{ backgroundColor: "white" }}>
        <div className="vrs_map">
          <div className="txt-vrs">{localStorage.getItem("locationName")}</div>
        </div>
        <div className="show-keypad">
          <div className="container_keypad">
            <div className="d-flex justify-content-between align-items-center position-relative show-number" style={{ top: "60px" }}>
              <div id="output">
                <div className="title-input">
                  <input type="text" className="dialpad-input" value={callNumber} onChange={(event) => handleDialpadInput(event)} />
                </div>
              </div>
              <div onClick={handleRemoveCallNumber} className="delete-callnumber">
                <MdKeyboardBackspace size={35} onClick={handleRemoveCallNumber} style={{ marginLeft: "-33px" }} />
              </div>
            </div>
            <br />
            <br />
            <div className="row" style={{ marginTop: "3vh" }}>
              <div className="col-4">
                <div className="digit" onClick={(event) => handleDialpad(1)}>
                  <img src={require("./img/numpad_one_normal.png").default} alt="one" />
                </div>
              </div>
              <div className="col-4">
                <div className="digit" onClick={(event) => handleDialpad(2)}>
                  <img src={require("./img/numpad_two_normal.png").default} alt="two" />
                </div>
              </div>
              <div className="col-4">
                <div className="digit" onClick={(event) => handleDialpad(3)}>
                  <img src={require("./img/numpad_three_normal.png").default} alt="three" />
                </div>
              </div>
              <div className="col-4">
                <div className="digit" onClick={(event) => handleDialpad(4)}>
                  <img src={require("./img/numpad_four_normal.png").default} alt="four" />
                </div>
              </div>
              <div className="col-4">
                <div className="digit" onClick={(event) => handleDialpad(5)}>
                  <img src={require("./img/numpad_five_normal.png").default} alt="five" />
                </div>
              </div>
              <div className="col-4">
                <div className="digit" onClick={(event) => handleDialpad(6)}>
                  <img src={require("./img/numpad_six_normal.png").default} alt="six" />
                </div>
              </div>
              <div className="col-4">
                <div className="digit" onClick={(event) => handleDialpad(7)}>
                  <img src={require("./img/numpad_seven_normal.png").default} alt="seven" />
                </div>
              </div>
              <div className="col-4">
                <div className="digit" onClick={(event) => handleDialpad(8)}>
                  <img src={require("./img/numpad_eight_normal.png").default} alt="eight" />
                </div>
              </div>
              <div className="col-4">
                <div className="digit" onClick={(event) => handleDialpad(9)}>
                  <img src={require("./img/numpad_nine_normal.png").default} alt="nine" />
                </div>
              </div>
              <div className="col-4">
                <div className="digit" onClick={(event) => handleDialpad("*")}>
                  <img src={require("./img/numpad_star_normal.png").default} alt="star" />
                </div>
              </div>
              <div className="col-4">
                <div className="digit" onClick={(event) => handleDialpad(0)}>
                  <img src={require("./img/numpad_zero_normal.png").default} alt="zero" />
                </div>
              </div>
              <div className="col-4">
                <div className="digit" onClick={(event) => handleDialpad("#")}>
                  <img src={require("./img/numpad_sharp_normal.png").default} alt="sharp" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shortcuts-call" onClick={handleVRSCall}>
        <div className={`btn_shortcuts-menu`}>
          <img className="bar-img-menu" src={require("./img/icon-calling-white.png").default} alt="call" />
        </div>
      </div>
    </>
  );
};

export default PhoneKeyboard;
