import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWebStatus, setRegisterData } from '../../actions';
import { ProgressBar } from 'react-bootstrap';
const JsSIP = require("jssip");

const Register = () => {
    const [registerProgress, setRegisterProgress] = useState(0);
    const registerData = useSelector(state => state.registerData);
    const dispatch  = useDispatch();

    useEffect(()=>{
        setRegisterProgress(20)
        registerSip(() => {
            dispatch(setWebStatus(localStorage.getItem("callType")));
        });
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const registerSip = (callback) => {
        setRegisterProgress(30)
        console.log(registerData)
        var socket = new JsSIP.WebSocketInterface(`${registerData.websocket}?transport=ws`);
        var configuration = {
            sockets : [ socket ],
            uri      : `${registerData.extension}@${registerData.domain}`, 
            password : registerData.secret,
            register_expires : 60,
        };
        console.log(configuration)
        setRegisterProgress(60)
        var userAgent = new JsSIP.UA(configuration);
        
        userAgent.on("registered", function(){
            console.log("registered")
            setRegisterProgress(100);
            dispatch(setRegisterData("userAgent", userAgent));
            callback()
        });
        userAgent.on("registrationFailed", function(error){
            console.log(error)
            // console.log("registrationFailed")
            // userAgent.unregister();
            // try {
            //     if(localStorage.getItem("directlogin") === "true"){
            //         dispatch(setWebStatus("login"));
            //     }else{
            //         // window.location.href = "https://ttrs.or.th";
            //     }
            // } catch (error) {
            //     console.log(error)
            // }
        });
        userAgent.on("unregistered", function(){
            // try {
            //     if(localStorage.getItem("directlogin") === "true"){
            //         dispatch(setWebStatus("login"));
            //     }else{
            //         // window.location.href = "https://ttrs.or.th";
            //     }
            // } catch (error) {
            //     console.log(error)
            // }
        });
        userAgent.start();
    }
    return (
        <>
            <div className="loading-home" style={{background:"linear-gradient(180deg, #0f3548 0%, #0e3244 67%, #0a2431 100%)", height:"100vh"}}>
                <div className="container">
                    <div className="loading-logo">
                        <div className="logo" style={{width:"20vh"}}>
                            <img src={require("./img/logo-ttrs-white.png")} alt=""/>
                            <img src={require("./img/logo-hand-white.png")} alt=""/>
                        </div>
                    </div>
                    <div className="loading-holdon">
                        <div className="loading">
                            <div className="logo" style={{width:"20vh"}}>
                                <img src={require("./img/logo-hand1-white.png")} alt=""/>
                            </div>
                            <br/><br/>
                            <ProgressBar animated now={registerProgress} style={{width:"42vh"}}/>
                            <p>โปรดรอสักครู่</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Register;