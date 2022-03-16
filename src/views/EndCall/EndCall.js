import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { setWebStatus } from '../../actions';
// import { MdCallEnd } from "react-icons/md";

const EndCall = () => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setWebStatus("dialpad"));
        // window.location = "/";
    },[dispatch])

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
            <div className="loading-home" style={{background:"linear-gradient(180deg, #0f3548 0%, #0e3244 67%, #0a2431 100%)", height:"100vh"}}>
                <div className="container">
                    <div className="loading-holdon">
                        <div className="loading">
                            {/* <div className="logo" style={{width:"20vh"}}> */}
                                {/* <img src={require("./img/logo-hand1-white.png")} alt=""/> */}
                                {/* <MdCallEnd className="input-location" /> */}
                            {/* </div> */}
                            <br/><br/>
                            <p style={{fontSize:"50px", marginTop : "20vh"}}>จบการสนทนา</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
};

export default EndCall;