import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setWebStatus } from '../../actions';
import './css/style.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);
    const dispatch = useDispatch();

    document.body.style.backgroundColor = "#FAFAFF";
    const handleUsername = (event) => {
        setUsername(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleLogin = (event) => {
        fetch(`${process.env.REACT_APP_URL_MAIN_API}/auth/loginwebrtc`, {
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                type : "webrtc",
                username, 
                password,
            })
        })
        .then((response) => {return response.json();})
        .then((response) => {
            if(response.status === "OK"){
                localStorage.setItem("directlogin", "true");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("datetoken", new Date());
                dispatch(setWebStatus("dialpad"));
                setLoginStatus(false)
            }else{
                localStorage.setItem("token", "");
                setLoginStatus(true)
            }
        });
    }
    return (<>
        <div className="page">
            <div className="log-in">
                <div className="login_box">
                    <div className="log-in_box">
                        <div className="logo">
                            <img className="logo-hand2-blue" src={require("./img/logo-hand2-blue.png").default} style={{width:`calc(100% + 38px)`, marginLeft:"-14px"}} alt=""/>
                        </div>
                        <br/>
                        <h2 className="entry-title" style={{color:"blue"}}>บริการถ่ายทอดการสื่อสารแบบสนทนาวิดีโอบนอินเทอร์เน็ต</h2>
                        <div className="ipt_log-in">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <img src={require("./img/logo-user.png")} alt=""/>
                                </div>
                                <input type="text" className="form-control" placeholder="ชื่อผู้ใช้" aria-label="Username" value={username} onChange={handleUsername}
                                    aria-describedby="addon-wrapping"/>
                            </div>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <img src={require("./img/logo-password.png")} alt=""/>
                                </div>
                                <input type="password" className="form-control" placeholder="รหัสผ่าน" aria-label="Password" value={password} onChange={handlePassword}
                                    aria-describedby="addon-wrapping"/>
                            </div>
                            <div className={`input-group warning-password ${!loginStatus? "hide":""}`}>
                                <div>ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง</div>
                            </div>
                            <br/>
                            
                            <button className="btn btn-login" type="submit" onClick={event => handleLogin()} >เข้าสู่ระบบ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Login;