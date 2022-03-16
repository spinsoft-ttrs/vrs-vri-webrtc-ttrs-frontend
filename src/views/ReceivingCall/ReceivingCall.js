import React from 'react';
import { useDispatch } from 'react-redux';
import Statusbar from '../../components/Statusbar';
import { setWebStatus } from '../../actions';

const ReceivingCall = () => {

    // const registerData = useSelector(state => state.registerData);

    const dispatch  = useDispatch();

    const handleStartVideoCall = () => {
        // registerData.session
        dispatch(setWebStatus("vrsReceivingCall"));
    }

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
                        <h6 className="txt-incoming-calls">สายโทรเข้า</h6>
                        <h3 className="txt-phone-number">02 2883 434</h3>

                        <div className="img-logo">
                            <img className="logo-ttrs" src={require("./img/logo-ttrs-white.png")} alt=""/>
                            <img className="logo-hand" src={require("./img/logo-hand-white.png")} alt=""/>
                        </div>

                        <button className="btn btn-start-conversation" onClick={handleStartVideoCall}>
                            <p className="start-conversation">เริ่มการสนทนา</p>
                        </button>

                        <button className="btn btn-end-conversation">
                            <p className="end-conversation">ยกเลิกการสนทนา</p>
                        </button>

                    </div>
                </div>
            </div>
        </>
    )

}

export default ReceivingCall;