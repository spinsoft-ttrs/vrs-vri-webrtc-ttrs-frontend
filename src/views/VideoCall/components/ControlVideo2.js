import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setControlVideo } from '../../../actions';

const ControlVideo = () => {

    const dispatch = useDispatch();
    // const webStatus    = useSelector(state => state.webStatus);
    const controlVideo = useSelector(state => state.controlVideo)
    const messagedata  = useSelector(state => state.messagedata);
    const [newMessage, setNewMessage] = useState(false);
    
    const handleOpenMessage = () =>{
        setNewMessage(false)
        if(controlVideo.openMessage === false){
            dispatch(setControlVideo("openMessage", true));
        }else if(controlVideo.openMessage === true){
            dispatch(setControlVideo("openMessage", false));
        }
    }
    const handleOpenVideo = () =>{
        if(controlVideo.openVideo === false){
            dispatch(setControlVideo("openVideo", true));
        }else if(controlVideo.openVideo === true){
            dispatch(setControlVideo("openVideo", false));
        }
    }
    const handleOpenAudio = () =>{
        if(controlVideo.openAudio === false){
            dispatch(setControlVideo("openAudio", true));
        }else if(controlVideo.openAudio === true){
            dispatch(setControlVideo("openAudio", false));
        }
    }
    const handleOpenMic = () =>{
        if(controlVideo.openMic === false){
            dispatch(setControlVideo("openMic", true));
        }else if(controlVideo.openMic === true){
            dispatch(setControlVideo("openMic", false));
        }
    }
    useEffect(() => {
        if(messagedata.length === 0){
            setNewMessage(false);
        }else 
        if(controlVideo.openMessage === true){
            setNewMessage(false);
        }else{
            setNewMessage(true)
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[messagedata])

    const handleTerminate = () => {
        dispatch(setControlVideo("openTerminate", true));
    }
    return (
        <ul className={`unction-calls-mobile control-list ${controlVideo.show? "" : "hide"}`} align="center" alt="controlVideo2">
            <li 
                // className={webStatus === "callVRS"? "hide": ""}
            >
                <button className={`btn icon-novideo control-button ${!controlVideo.openVideo? "control-icon-active" : ""}`} onClick={event => handleOpenVideo()}>
                    <img src={require('../img/icon-novideo-white.png').default} alt="control-video" className="control-icon"/>
                    ปิดกล้อง
                </button>
            </li>
            <li onClick={event => handleOpenMic()} 
                // className={webStatus === "callVRS"? "hide": ""}
            >
                <button className={`btn icon-mute control-button ${!controlVideo.openMic? "control-icon-active" : ""}`} >
                    <img src={require('../img/icon-mutemicrophone-white.png').default} alt="control-mic" className="control-icon"/>
                    ปิดไมค์
                </button>
            </li>
            <li onClick={handleOpenAudio} 
                // className={webStatus === "callVRS"? "hide": ""}
            >
                <button className={`btn icon-voiceoff control-button ${!controlVideo.openAudio? "control-icon-active" : "" }`} >
                    <img src={require('../img/icon-volumeoff-white.png').default} alt="control-audio" className="control-icon"/>
                    ปิดเสียง
                </button>
            </li>  
            <li onClick={handleOpenMessage} >
                <button className={`btn icon-message control-button ${controlVideo.openMessage? "control-icon-active" : "" } `} id="open-open" >
                    {
                    newMessage?
                        <span className={`badge badge-danger`} style={{position:"absolute"}}>
                            มีข้อความใหม่
                        </span>
                    :
                    <div></div>
                    }
                    <img src={require('../img/icon-message-white.png').default} alt="control-message" className="control-icon"/>
                    ข้อความ
                </button>
            </li>
            <li onClick={handleTerminate}>
                <button className={`btn icon-hangup control-button ${controlVideo.openTerminate? "control-icon-active" : "" } `} >
                    <img src={require('../img/icon-hangup-white.png').default} alt="control-hangup" className="control-icon"/>
                    วางสาย
                </button>
            </li>
        </ul>
    )
}

export default ControlVideo;