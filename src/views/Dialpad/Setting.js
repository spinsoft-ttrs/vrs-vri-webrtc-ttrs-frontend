import React, {useState, useEffect} from 'react';
import './css/style.css'

const Setting = (props) => {

    const [turnEnable, setTurnEnable] = useState(false);
    const [turnURL, setTurnURL] = useState("");
    const [turnUsername, setTurnUsername] = useState("");
    const [turnCredential, setTurnCredential] = useState("");

    const handleChangeTurnURL = (event) =>{
        setTurnURL(event.target.value)
        localStorage.setItem("turnURL", event.target.value);
    }    
    const handleChangeTurnUsername = (event) =>{
        setTurnUsername(event.target.value)
        localStorage.setItem("turnUsername", event.target.value);
    }   
    const handleChangeTurnCredential = (event) =>{
        setTurnCredential(event.target.value)
        localStorage.setItem("turnCredential", event.target.value);
    }
    const handleTurnEnable = (event) => {
        if(event.target.checked === true){
            setTurnEnable(true)
        }else{
            setTurnEnable(false)
        }
        
        localStorage.setItem("turnEnable", event.target.checked);
    }

    useEffect(() => {
        if(localStorage.getItem("turnEnable") === "true"){
            setTurnEnable(true)
        }else{
            setTurnEnable(false)
        }
        
        setTurnURL(localStorage.getItem("turnURL"))
        setTurnUsername(localStorage.getItem("turnUsername"))
        setTurnCredential(localStorage.getItem("turnCredential"))
    },[])


    return (
        <>
            <div className={`phonekeypad ${props.cls}`} style={{backgroundColor:"white"}}>
                <div className="shortcuts-phonekeypad">
                    <div className="shortcuts setting" style={{width:"100%"}}>
                        <div className="position-relative">
                            <br/><br/>
                            <h2 className="head-title">ตั้งค่า</h2>
                            <br/><br/>
                        </div>
                        <div className="setting_form">
                            <ul>
                                <li>
                                    <input type="checkbox" checked={turnEnable? "checked":""} onChange={handleTurnEnable}></input> เปิดการใช้ TURN
                                </li>
                                <li>
                                    Turn URL : <input className="input-setting" type="text" placeholder="turn url" onChange={handleChangeTurnURL} value={turnURL}/>
                                    Turn Username :  <input className="input-setting" type="text" placeholder="turn username" onChange={handleChangeTurnUsername} value={turnUsername}/>
                                    Turn Credential : <input className="input-setting" type="text" placeholder="turn credential" onChange={handleChangeTurnCredential} value={turnCredential}/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Setting;