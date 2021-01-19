import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { GoLocation } from "react-icons/go";
import { savelocation } from '../../../actions/fetchAPI';
import './chat.css';

const ResponsiveChatPush = (props) => {
    var originClass;
    if (props.origin === 'local') {
        originClass = 'chat-item-right';
    } else {
        originClass = 'chat-item-left';
    }

    if(props.message.startsWith("ส่งพิกัดเรียบร้อย (")){
        
        var text = props.message.replace("ส่งพิกัดเรียบร้อย (", "").replace(")","").replace(" ","");
            text = text.split(",")
            var googleMapUrl = "https://maps.google.com/maps?q=" + text[0] + "," + text[1] + "&z=17&output=embed";
        return (
            <div className="chat-row">
                <div className={originClass} id={originClass}  >
                    <div className="mapouter">
                        <div className="gmap_canvas">
                            <iframe 
                                title="map2"
                                width="400" 
                                height="250" 
                                id="gmap_canvas"
                                src={googleMapUrl}
                                frameBorder="0" 
                                scrolling="no" 
                                marginHeight="0"
                                marginWidth="0">
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="chat-row">
            <div className={originClass} id={originClass}  >{props.message}</div>
        </div>
    )
}
const MessageRealTimeView = (props) => {
    if(props.messageRealtime !== ""){
        return (
            <div className="chat-row">
                <div className="chat-item-left" id="chat-item-left">{props.messageRealtime}</div>
            </div>
        )
    }else{
        return (<div></div>)
    }
}

const Chat = (props) => {
    const messagedata  = useSelector(state => state.messagedata)
    const registerData = useSelector(state => state.registerData);
    const messagesEndRef = useRef(null)
    const cursorRef = useRef(null);

    const [writeMessage, setWriteMessage] = useState("")
    const [sequenceNumber, setSequenceNumber] = useState(Math.floor((Math.random() * 100000) + 1));
    const [eventRtt, setEventRtt] = useState("new");
    const [textChatSize, setTextChatSize] = useState(14);

    const handleSendMessage = (event) => {
        if(event.key === "Enter"){
            if(event.target.value.trim() !== ""){
                registerData.userAgent.sendMessage(`sip:${registerData.callNumber}@${registerData.domain}`, event.target.value);
                setWriteMessage("")
                setSequenceNumber(Math.floor((Math.random() * 100000) + 1));
                setEventRtt("new");
            }
        }
    }

    const handleOnChange = (event) => {
        setSequenceNumber(sequenceNumber+1);
        if(writeMessage !== ""){
            registerData.userAgent.sendMessage(
                `sip:${registerData.callNumber}@${registerData.domain}`, 
                `<rtt event='${eventRtt}' seq='${sequenceNumber}'><t>${event.target.value}</t></rtt>`
            );
            if(event === "new"){
                setEventRtt("reset")        
            }
        }
        if(event === "reset" && writeMessage === ""){
            registerData.userAgent.sendMessage(
                `sip:${registerData.callNumber}@${registerData.domain}`, 
                `<rtt event='${eventRtt}' seq='${sequenceNumber}'><t>${event.target.value}</t></rtt>`
            );
        }
        setWriteMessage(event.target.value)
    }
    const handleSendMessageButton = (event) => {
        if(event.target.value.trim() !== ""){
            registerData.userAgent.sendMessage(`sip:${registerData.callNumber}@${registerData.domain}`, writeMessage);
            setWriteMessage("")
            setSequenceNumber(Math.floor((Math.random() * 100000) + 1));
            setEventRtt("new");
        }
    }

    const handleSendLocation = () => {

        navigator.geolocation.getCurrentPosition((position) => {
            localStorage.setItem("accuracy", position.coords.accuracy);
            localStorage.setItem("lat", position.coords.latitude)
            localStorage.setItem("long", position.coords.longitude)
            savelocation({
                extension : registerData.extension,
                accuracy : position.coords.accuracy,
                latitude : position.coords.latitude,
                longitude : position.coords.longitude
            },() => {})
            registerData.userAgent.sendMessage(`sip:${registerData.callNumber}@${registerData.domain}`, `ส่งพิกัดเรียบร้อย (${position.coords.latitude}, ${position.coords.longitude})`);
        });
    }

    const increseTextSize = () => {
        setTextChatSize(textChatSize+1);
    }
    const decreseTextSize = () =>{
        setTextChatSize(textChatSize-1);
    }

    useEffect(() => {
        changeFont("chat-item-left");
        changeFont("chat-item-right")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[textChatSize])

    const changeFont = (className) => {
        var list = document.getElementsByClassName(className);
        for (var i = 0; i < list.length; ++i) {
            list[i].style.fontSize = textChatSize + "px";
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "instant" })
    }
    useEffect(scrollToBottom, [messagedata]);

    return (
        <div className="shortcuts-phonekeypad" id="mySidenav">
            <div className="shortcuts conversation">
                <div className="vrs_map" id="xxx">
                    <div className="d-flex">
                        <span className="txt-resize" onClick={event => increseTextSize()}>A+</span>
                        <span className="txt-resize" onClick={event => decreseTextSize()}>A-</span>
                    </div>
                </div>
                <div className="chat-content">
                    <div className="chat-data" id="chat-data" >
                        {
                            messagedata.map ((chatdata, index) => {
                                return (
                                    <ResponsiveChatPush
                                        key={index}
                                        sender=''
                                        origin={chatdata.origin}
                                        date={chatdata.date}
                                        message={chatdata.body}
                                    />
                                )
                            })
                        }
                        {props.messageRealtime === "" ? <span></span> : <MessageRealTimeView messageRealtime={props.messageRealtime}/>}
                        <div id="scrollbot" ref={messagesEndRef}></div>
                    </div>
                </div>
                <div  className="chat-send-message">
                    <GoLocation className="input-location-fullscreen" onClick={event => handleSendLocation()} />
                    <input 
                        className="input-message"
                        type="text" 
                        placeholder="พิมพ์ข้อความ"
                        ref={cursorRef}
                        onKeyDown={handleSendMessage} 
                        onChange={handleOnChange}
                        value={writeMessage} 
                    />
                    <input 
                        type="submit" value="ส่ง" 
                        className="input-sendmessage"
                        onClick={event => handleSendMessageButton()}
                    />
                </div>
            </div>
        </div>
    )
}

export default Chat;