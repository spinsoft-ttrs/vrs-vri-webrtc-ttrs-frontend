import React, { useEffect, useState } from "react";
const { detect } = require("detect-browser");
const browser = detect();

const Statusbar = (props) => {
    const [switchCameraEnable, setSwitchCameraEnable] = useState(true);

    const sizeForDevice = () => {
        if (browser.os !== "iOS" && browser.ios !== "Android OS") {
            return "18px";
        } else return "10x";
    };
    useEffect(() => {
        if (browser.os.startsWith("Windows")) {
            setSwitchCameraEnable(false);
        }
    }, []);

    return (
        <div className="head-sec" style={{ padding: sizeForDevice() }}>
            <div className="head-call">
                <div className="phone-numer">TTRS</div>
                <span style={{ padding: "10px" }}>
                    <div className="cam_img">
                        {props.handleChooseCamera && switchCameraEnable ? (
                            <div className="cam_img" onClick={props.handleChooseCamera}>
                                <img src={require("./img/icon-cam-white.png").default} alt="choose-camera" />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </span>
                <div className="calling-time">{props.stopWatch ? props.stopWatch : "00:00:00"}</div>
            </div>
        </div>
    );
};

export default Statusbar;
