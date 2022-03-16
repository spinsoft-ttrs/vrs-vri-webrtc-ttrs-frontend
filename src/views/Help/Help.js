import React, {useEffect} from 'react';
// import { useDispatch } from 'react-redux';
import './css/style.css';
const { detect } = require('detect-browser');
const browser = detect();

const EndCall = () => {
    
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        showEnableCameraViaBrowser();

    },[])

    const showEnableCameraViaBrowser = () => {
        switch (browser.name) {
            case "chrome":
                return (
                    <>
                        <h2 className="head">Google Chrome</h2>
                        <br/>
                        <div className="sec_confirm" >
                            <img className="setting-camera-icon" src={require("./img/help_chrome.png")} alt="chromecamera"/>
                        </div>     
                        <br/>          
                    </>
                )   
            case "opera" :
                return (
                    <>
                        <h2 className="head">Opera</h2>     
                        <br/>           
                        <div className="sec_confirm" >
                            <img className="setting-camera-icon" src={require("./img/help_opera.png")} alt="operacamera"/>
                        </div>                 
                        <br/>
                    </>
                )
            case "edge-chromium" : 
                return (
                    <>
                        <h2 className="head">Microsoft Edge</h2>            
                        <br/>      
                        <div className="sec_confirm" >
                            <img className="setting-camera-icon" src={require("./img/help_edge.png")} alt="microsoftedgecamera"/>
                        </div>
                        <br/> 
                    </>
                )
            default:
                break;
        }

    }

    // const openLocalSettingCamera = (value) => {
    //     switch (value) {
    //         case "chrome":
    //             console.log(value)
    //             break;
    //         case "chrome":
            
    //             break;
    //         case "microsoftedge":

    //             break;
    //         default:
    //             break;
    //     }
    // }

    return (
        <>
            <div className="vrs_map" style={{backgroundColor:"#168ACE", textAlign:"center"}}>
                <div className="txt-vrs" style={{color:"white", paddingTop:"2px"}}>VRS</div>
            </div>
            <div className="report-problem">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 offset-md-3">
                            <div className="report-problem_box">
                                <div className="form_report">
                                    {showEnableCameraViaBrowser()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default EndCall;