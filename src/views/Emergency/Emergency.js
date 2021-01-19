import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWebStatus } from '../../actions';
import './css/style.css';

const HelpDesk = () => {

    const emergencyText = ["","ด่วนหมอ", "ด่วนตำรวจ", "ด่วนไฟไหม้"];
    const [locationName, setLocationName] = useState("")
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("")
    const [typeEmergency, setTypeEmergency] = useState("1");
    const [isLogin, setIsLogin] = useState(true);
    const registerData = useSelector(state => state.registerData);
    const dispatch  = useDispatch();

    useEffect(()=>{
        if(!registerData.extension.startsWith("0000")){
            setIsLogin(false);
        }
    },[isLogin, registerData.extension])

    const handleName = (event) => {
        setFullName(event.target.value);
    }
    
    const handlePhone = (event) => {
        setPhone(event.target.value);
    }

    const handleAccessEmergency = () => {
        localStorage.setItem("fullname", fullName);
        localStorage.setItem("phone", phone);
        localStorage.setItem("typeEmergency", emergencyText[typeEmergency]);
        dispatch(setWebStatus("register"));
    }

    const handleRadioEmergency = (event) => {
        setTypeEmergency(event.target.value)
    }

    useEffect(() => {
        getCurrentLocation();
    },[])

    const getCurrentLocation = () => {
        if(localStorage.getItem("locationName") === null){
            navigator.geolocation.getCurrentPosition((position) => {
                fetch(`https://api.longdo.com/map/services/address?lon=${position.coords.longitude}&lat=${position.coords.latitude}&locale=th&key=16b1beda30815bcf31c05d8ad184ca32`)
                .then(response => response.json())
                .then((data) =>{
                    console.log(data)
                    setLocationName(`${data.district} ${data.subdistrict} ${data.province}`);
                    localStorage.setItem("locationName", `${data.district} ${data.subdistrict} ${data.province}`);
                });
            },(error) => {
                if(error.code === 1){
                    alert("ไม่สามารถเรียกตำแหน่งปัจจุบันได้")
                }
            });
        }else{
            setLocationName(localStorage.getItem("locationName"));
        }
    }

    return (
        <>
            <div className="vrs_map" style={{backgroundColor:"#168ACE", textAlign:"center"}}>
                <div className="txt-vrs" style={{color:"white", paddingTop:"2px", marginLeft: "5px"}}>{locationName}</div>
            </div>
            <br/>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="logo">
                        <img className="logo-hand2-blue" src={require("./img/ttrs-video-emergency.png")} alt=""/>
                        <br/>
                    </div>
                    <h2 className="entry-title">แจ้งเหตุฉุกเฉิน TTRS</h2>
                </div>
                <br/>
                <div className="row justify-content-md-center">
                    <div className="col col-md-6">
                        <div className={!isLogin?"hide":""}>
                            <div className="form-group">
                                <label htmlFor="fieldFullName">ชื่อ - นามสกุล</label>
                                <input type="text" className="form-control" id="fieldFullName" onChange={handleName} value={fullName} placeholder="กรอกชื่อ - นามสกุล"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fieldPhone">เบอร์โทรศัพท์</label>
                                <input type="text" className="form-control" id="fieldPhone" onChange={handlePhone} value={phone} placeholder="กรอกเบอร์โทรศัพท์"/>
                            </div>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="emergencyRadio" id="emergencyRadio1" onChange={handleRadioEmergency} checked={typeEmergency === "1"} value="1"/>
                            <label className="form-check-label" htmlFor="emergencyRadio1">
                                {emergencyText[1]}
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="emergencyRadio" id="emergencyRadio2" onChange={handleRadioEmergency} checked={typeEmergency === "2"} value="2"/>
                            <label className="form-check-label" htmlFor="emergencyRadio2">
                                {emergencyText[2]}
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="emergencyRadio" id="emergencyRadio3" onChange={handleRadioEmergency} checked={typeEmergency === "3"} value="3"/>
                            <label className="form-check-label" htmlFor="emergencyRadio3">
                                {emergencyText[3]}
                            </label>
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-danger btn-block" onClick={handleAccessEmergency}>เข้าใช้งาน</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default HelpDesk;