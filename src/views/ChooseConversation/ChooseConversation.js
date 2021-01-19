import React from 'react';
import Statusbar from '../../components/Statusbar';
import { GoDeviceCameraVideo } from "react-icons/go";
import { TiMicrophoneOutline } from "react-icons/ti";


const ReceivingCall = () => {

    // const registerData = useSelector(state => state.registerData);


    return (
        <>
            <div className="horizontal">
                <div className="no-horizontal">
                    <div className="loading-logo">
                        <div className="logo">
                            <img src="assets/img/img-horizontal.png" alt=""/>
                        </div>
                        <p>กรุณาเปลี่ยนเป็นแนวตั้งเพื่อการใช้งานที่ดีที่สุด</p>
                    </div>
                </div>
            </div>
            <div className="vdo-calling">
                <Statusbar/>
                <div className="incoming-sec" style={{height:"100vh"}}>
                    <div className="incoming-calls" style={{marginTop:"20vh"}}>
                        <div className="d-flex justify-content-center align-items-center">
                            <h2 className="head-title">เลือกการสนทนา</h2>
                        </div>
                        <br/><br/>
                        <ul className="function-calls function-conversation">
                        <li style={{marginRight:"5vh"}}>
                            <GoDeviceCameraVideo  style={{height:"15vh", width:"15vh"}}/>
                            <button className="btn icon-video_call">
                                สนทนาวิดีโอ
                            </button>
                        </li>
                        <li className="d-block d-lg-none">
                            <TiMicrophoneOutline style={{height:"15vh", width:"15vh"}}/>
                            <button className="btn icon-conversation" id="open-message">
                                สนทนาข้อความ
                            </button>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ReceivingCall;