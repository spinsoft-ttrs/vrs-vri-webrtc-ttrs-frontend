import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { GoLocation } from "react-icons/go";
import { savelocation } from '../../../actions/fetchAPI';
import { setControlVideo } from '../../../actions';
var linkify = require('linkify-it')();
const { detect } = require('detect-browser');
const browser    = detect();

const ResponsiveChatPush = (props) => {
    var originClass;
    if (props.origin === 'local') {
        originClass = 'chat-item-right-mobile';
    } else {
        originClass = 'chat-item-left-mobile';
    }
    var tmp = props.message;
    var link = linkify.match(props.message);

    const renderText = (text) => {
        
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        let parts = text.split(urlRegex) // re is a matching regular expression

        for (let i = 1; i < parts.length; i += 2) {
            parts[i] = <a target="_blank" key={'link' + i} href={parts[i]}>{parts[i]}</a>
        }
        return parts
    }

    if(link !== null){
        tmp = renderText(tmp);
    }
    return (
        <div className="chat-row-mobile">
            <div className={originClass}>{tmp}</div>
            {/* <b>{props.sender}</b> {props.date} */}
        </div>
    )
}
const MessageRealTimeView = (props) => {
    if(props.messageRealtime !== ""){
        return (
            <div className="chat-row-mobile">
                <div className="chat-item-left-mobile">{props.messageRealtime}</div>
            </div>
        )
    }else{
        return (<div></div>)
    }
}

const ChatInVideo = (props) => {
    const dispatch = useDispatch();
    const messagedata = useSelector(state => state.messagedata)
    const controlVideo = useSelector(state => state.controlVideo)
    const registerData = useSelector(state => state.registerData);
    const [isFocus, setIsFocus] = useState(false);
    const inputRef = useRef(null);
    
    const messagesEndRef = useRef(null)

    const [writeMessage, setWriteMessage] = useState("")
    const [sequenceNumber, setSequenceNumber] = useState(Math.floor((Math.random() * 100000) + 1));
    const [eventRtt, setEventRtt] = useState("new");
    // const [iosDeviceStatus, setiOSDeviceStatus] = useState(null);

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
    const handleSendMessageButton = (event) => {
        if(event.target.value.trim() !== ""){
            registerData.userAgent.sendMessage(`sip:${registerData.callNumber}@${registerData.domain}`, writeMessage);
            setWriteMessage("")
            setSequenceNumber(Math.floor((Math.random() * 100000) + 1));
            setEventRtt("new");
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
            registerData.userAgent.sendMessage(`sip:${registerData.callNumber}@${registerData.domain}`, `ส่งพิกัดเรียบร้อย`);
        });
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "instant" })
    }
    useEffect(scrollToBottom, [messagedata]);
    
    useEffect(scrollToBottom, [controlVideo.show]);

    useEffect(() => {
        scrollToBottom();
    },[controlVideo.show])

    useEffect(() => {
        scrollToBottom();
    },[props.iOSDevice])

    useEffect(() => {
        scrollToBottom();
    },[props.messageRealtime])

    const handleFocus = () => {
        dispatch(setControlVideo("show", false));
        setIsFocus(true);
        scrollToBottom()
    }
    const handleBlur = () => {
        dispatch(setControlVideo("show", true));
        setIsFocus(false);
        scrollToBottom()
    }
    const handleClick = () => {
        inputRef.current.focus();
        setIsFocus(true);
        scrollToBottom();
    }
    const handleIOSKeyboardClass = () => {

        if (browser.os === 'iOS'){ 
            if(isFocus){
                return `chat-content-mobile-ios-keyboard`
            }else{
                return `chat-content-mobile-ios`
            }
        }else{
            return `chat-content-mobile`
        }
    }

    return (
        <div className="d-block d-lg-none call-message">
            <div  
                className={`chat-send-message-mobile ${controlVideo.openMessage? "":"hide"}`}
            >
                <GoLocation className="input-location" onClick={event => handleSendLocation()} />
                <input 
                    className="input-message"
                    type="text" 
                    placeholder="พิมพ์ข้อความ"
                    ref={inputRef}
                    onClick={handleClick}
                    onKeyDown={handleSendMessage} 
                    onChange={handleOnChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={writeMessage} 
                />
                <input type="submit" value="ส่ง" className="input-sendmessage" onClick={handleSendMessageButton}/>
            </div>
            <div className="message-conversation" id="slideMessage">
                <div 
                    className={handleIOSKeyboardClass()}
                >
                    <div className="chat-data-mobile" >
                        <span>
                        </span>
                        <div className="show_date_history">วันที่ 01/01/2019</div>
                        <div 
                            className={`${props.iOSDevice === "iphone-control"? "messages-mobile-ios":"messages-mobile"}`}
                            // className="messages-mobile"
                        >
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
                            <MessageRealTimeView messageRealtime={props.messageRealtime} />
                            <div id="scrollbot" ref={messagesEndRef}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatInVideo;