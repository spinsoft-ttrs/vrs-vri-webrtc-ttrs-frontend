import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWebStatus, setRegisterData, setMessagedata } from '../../actions';
import PhoneKeyboard from './PhoneKeyboard';
import { FiLogOut } from "react-icons/fi";
import './css/style.css';
const { detect } = require('detect-browser');
const browser    = detect();
const JsSIP = require("jssip");

const Dialpad = () => {
    
    const dispatch  = useDispatch();
    const [mobileControl, setMobileControl] = useState(false);
    const [locationName, setLocationName] = useState("");
    const registerData = useSelector(state => state.registerData);
    const [cameraEnable, setCameraEnable] = useState(true)

    const handleStaticCall = (type) => {
        // if(type !== "logout"){
            // if(cameraEnable){
                switch (type) {
                    case "vrs":
                        localStorage.setItem("callType", "callVRS");
                        setMobileControl(true)
                        break;
                    case "vri":
                        localStorage.setItem("callType", "callVRI");
                        dispatch(setWebStatus("register"));
                        dispatch(setRegisterData("callNumber", 14120));
                        break;
                    default:
                        handleLogout();
                        break;
                }
            // }
        // }else{
            // handleLogout();
        // }
    }
    const handleMobileDialPad = () => {
        setMobileControl(true)
    }
    const handleLogout = () => {
        var socket = new JsSIP.WebSocketInterface(`${registerData.websocket}`);
        var configuration = {
            sockets : [ socket ],
            uri      : `${registerData.extension}@${registerData.domain}`, 
            password : `${registerData.secret}`,
            register_expires : 3,
        };

        var userAgent = new JsSIP.UA(configuration);
        userAgent.start();

        let promise = new Promise( (resolve, reject) => {
            userAgent.on("registered", function(){
                var options = {
                    all: true
                };
                userAgent.unregister(options);
                resolve();
            });
            userAgent.on("registrationFailed", function(){
                resolve();
            });
        });
        promise.then(() => {
            console.log("directlogin", localStorage.getItem("directlogin"))
            try {
                if(localStorage.getItem("directlogin") === "true"){
                    console.log("logout")
                    // dispatch(setWebStatus("login"));
                }else{
                    console.log("redirect")
                    window.location.href = "https://ttrs.or.th";
                }
            } catch (error) {
                console.log(error)
            }
            localStorage.clear();
        })
    }

    const handleShortCut = (value) => {
        if(value === "MobileDialPad"){
            handleMobileDialPad();
        }else if(value === "Shortcut"){
            setMobileControl(false);
        }
    }

    useEffect(() => {
        document.body.style.backgroundColor = "white";
    },[])

    useEffect(() => {
        if(!isIpadOS()){
            if(browser.os !== "Android OS" && browser.os !== "iOS"){
                checkAllowCameraAndMic();
            }else{
                if(browser.os === "Android OS"){
                    alert("อุปกรณ์ไม่รองรับการใช้งาน");
                    window.location.href = "https://play.google.com/store/apps/details?id=ttrs.vrs&hl=en_GB&gl=th";
                }else if(browser.os === "iOS"){
                    alert("อุปกรณ์ไม่รองรับการใช้งาน");
                    window.location.href = "https://apps.apple.com/th/app/ttrs-video/id1467360876?l=th";
                }
            }
        }
        let promise = new Promise(function(resolve, reject) {

            // dispatch(setRegisterData("domain", registerData.doamin));
            // dispatch(setRegisterData("websocket", registerData.websocket));
            // dispatch(setRegisterData("extension", registerData.extension))
            // dispatch(setRegisterData("secret", registerData.secret));
            dispatch(setMessagedata("UPDATEMESSAGEDATA",null));
            getCurrentLocation();
            resolve();
        });
        promise.then(() => {
            setCameraEnable(true)
        })
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // useEffect(() => {
    //     try {
    //         console.log(localStorage.getItem("directlogin"))
    //         verifyToken(localStorage.getItem("token"), (response) => {
    //             console.log(response)
    //         });
    //     } catch (error) {
    //         console.log(error)
    //     }
    // },[])

    async function checkAllowCameraAndMic() {
        var constraints = { 
            audio: true, 
            video: {
                    frameRate : {
                        min: "15 ",
                        max: "15"
                    },
                    width: {
                        min: "352 ",
                        max: "352 "
                    },
                    height: {
                        min: "240",
                        max: "240"
                    },    
            },
            optional: [
                { facingMode: "user" }
            ]
        };
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            console.log("Permission access")
        })
        .catch(function(err) {
            console.log(err)
            // setCameraEnable(false)
            alert("ไม่สามารถเข้าถึงสิทธิ์การใช้งานกล้องวิดีโอได้")
        });
    }
    const isIpadOS = () => {
        return navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 2 &&
          /MacIntel/.test(navigator.platform);
    }


    const getCurrentLocation = () => {
        if(localStorage.getItem("locationName") === null){
            navigator.geolocation.getCurrentPosition((position) => {
                fetch(`https://api.longdo.com/map/services/address?lon=${position.coords.longitude}&lat=${position.coords.latitude}&locale=th&key=16b1beda30815bcf31c05d8ad184ca32`)
                .then(response => response.json())
                .then((data) =>{
                    setLocationName(`${data.district} ${data.subdistrict} ${data.province}`);
                    localStorage.setItem("locationName", `${data.district} ${data.subdistrict} ${data.province}`);
                });
            },(error) => {
                if(error.code === 1){
                    alert("ไม่สามารถเรียกตำแหน่งปัจจุบันได้")
                }
            });
        }else{
            setLocationName(localStorage.getItem("locationName"));
        }
    }
    return (
        <>
            <div className="show">
                <div className="shortcuts-phonekeypad">
                    {mobileControl? <PhoneKeyboard cameraEnable={cameraEnable} cls=""/> : <></> }
                    {
                        <>
                            <div className={`shortcuts ${mobileControl? "hide" : ""}`}>
                                <div className="d-block" style={{marginLeft: "-16px",marginRight: "-16px"}}>
                                    <div className="vrs_map">
                                        <div className="txt-vrs">
                                            {locationName}
                                        </div>
                                    </div>
                                </div>
                                <div className="row" >
                                <div className="col-lg-12 shorcut-custom">
                                        <div className="shortcuts-box">
                                            <a  
                                                href="#!" 
                                                className="shorcut-link"
                                                onClick={event => handleStaticCall("vrs")}
                                            >
                                             <div className="img-icon">
                                                <img src={require("./img/vrs.png").default} alt="vri"/>
                                            </div>
                                                <div className="txt-desc">
                                                    <div className="head" >
                                                        TTRS VRS
                                                    </div>
                                                </div>
                                            </a>

                                            <div className="exp-vdo" data-toggle="modal" data-target="#ShowVdo7">
                                                <i className="fa fa-play-circle-o" aria-hidden="true"></i>
                                            </div>

                                            <div className="modal fade" id="ShowVdo7" tabIndex="-1" role="dialog" aria-labelledby="Title"
                                                aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content modal_exp_vdo">
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>

                                                        <div className="modal-body">
                                                            <div className="exp_vdo">
                                                                <img src={require("./img/img-vdo.png").default} alt=""/>
                                                            </div>
                                                        </div>

                                                        <h6 className="exp_title">การเข้าระบบ</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 shorcut-custom">
                                        <div className="shortcuts-box">
                                            <a  
                                                href="#!" 
                                                className="shorcut-link"
                                                onClick={event => handleStaticCall("vri")}
                                            >
                                             <div className="img-icon">
                                                <img src={require("./img/vri.png").default} alt="vri"/>
                                            </div>
                                                <div className="txt-desc">
                                                    <div className="head" >
                                                        TTRS VRI
                                                    </div>
                                                </div>
                                            </a>

                                            <div className="exp-vdo" data-toggle="modal" data-target="#ShowVdo7">
                                                <i className="fa fa-play-circle-o" aria-hidden="true"></i>
                                            </div>

                                            <div className="modal fade" id="ShowVdo7" tabIndex="-1" role="dialog" aria-labelledby="Title"
                                                aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content modal_exp_vdo">
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>

                                                        <div className="modal-body">
                                                            <div className="exp_vdo">
                                                                <img src={require("./img/img-vdo.png").default} alt=""/>
                                                            </div>
                                                        </div>

                                                        <h6 className="exp_title">การเข้าระบบ</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 shorcut-logout" >
                                        <div className="shortcuts-box" style={{backgroundColor:"#ffd7d7"}}>

                                            <a 
                                                href="#!" 
                                                className="shorcut-link"
                                                onClick={event => handleStaticCall("logout")}
                                            >
                                                <div className="img-icon">
                                                    <img src={require("./img/logout-button.png").default} alt="vri"/>
                                                </div>
                                                {/* <div className="txt-desc">
                                                    <div className="head">ออกจากระบบ</div>
                                                </div> */}
                                            </a>

                                            <div className="exp-vdo" data-toggle="modal" data-target="#ShowVdo8">
                                                <i className="fa fa-play-circle-o" aria-hidden="true"></i>
                                            </div>

                                            <div className="modal fade" id="ShowVdo8" tabIndex="-1" role="dialog" aria-labelledby="Title"
                                                aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content modal_exp_vdo">
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>

                                                        <div className="modal-body">
                                                            <div className="exp_vdo">
                                                                <img src={require("./img/img-vdo.png")} alt=""/>
                                                            </div>
                                                        </div>

                                                        <h6 className="exp_title">การเข้าระบบ</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`col-md-12 hide`} onClick={event => handleLogout()}>
                                        <div className="shortcuts-box" >
                                            <a 
                                                href="#!" 
                                                className="d-flex align-items-center justify-content-center"
                                                onClick={event => handleLogout()}
                                            >
                                                <div className="img-icon">
                                                    <FiLogOut size={33}/>
                                                </div>
                                                <div className="txt-desc" >
                                                    <div className="head">ออกจากระบบ</div>
                                                </div>
                                            </a>
                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                    <div className="shortcuts-menu">
                        <div className={`btn_shortcuts-menu ${mobileControl? "" : "active"}`} style={{width:"100%"}} onClick={event => handleShortCut("Shortcut") }>
                            <div style={{lineHeight:"1"}}>
                                <img className="bar-img-menu" src={require("./img/ic_speed_dial.png").default} alt="vri" />
                                <a className="shortcut-menu-icon" href="#!">เมนู</a>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </>
    )
};

export default Dialpad;