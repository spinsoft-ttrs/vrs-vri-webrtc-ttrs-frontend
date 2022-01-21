import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRegisterData, setWebStatus } from '../../actions';
import './css/style.css';
import public_normal from './img/Web-TTRS VDO-circle-01.png';
const { detect } = require('detect-browser');
const browser    = detect();

const PublicService = () => {

    const [locationName, setLocationName] = useState("")
    const [fullName, setFullName] = useState(localStorage.getItem("fullname") === null ? "" : localStorage.getItem("fullname"));
    const [phone, setPhone] = useState(localStorage.getItem('phone') === null ? "" : localStorage.getItem("phone"));
    const [agency, setAgency] = useState(localStorage.getItem('agency') === null ? "" : localStorage.getItem("agency"));
    const dispatch  = useDispatch();

    const handleName = (event) => { setFullName(event.target.value) }
    const handlePhone = (event) => { setPhone(event.target.value) }
    const handleAgency = (event) => { setAgency(event.target.value) }

    const handleAccessPublicService = () => {
        localStorage.setItem("directlogin", "");
        console.log(`${process.env.REACT_APP_URL_MAIN_API}/extension/public`)
        if(fullName.trim() !== "" && phone.trim() !== "" && agency.trim() !== ""){
            fetch(`${process.env.REACT_APP_URL_MAIN_API}/extension/public`, {
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    type : "webrtc-public",
                    agency,
                    phone,
                    fullName,
                    emergency : 0,
                    emergency_options_data : "",
                    user_agent : navigator.userAgent + ""
                })
            })
            .then((response) => {return response.json();})
            .then((data) => {
                if(data.status === "OK"){
                    localStorage.setItem("fullname", fullName);
                    localStorage.setItem("phone", phone);
                    localStorage.setItem("agency", agency);
                    dispatch(setRegisterData("secret", data.data.secret));
                    dispatch(setRegisterData("extension", data.data.ext));
                    dispatch(setRegisterData("domain", data.data.domain));
                    dispatch(setRegisterData("websocket", data.data.websocket));
                    // dispatch(setRegisterData("callNumber", 9999 ));

                    dispatch(setRegisterData("callNumber", 14120 ));
                    // dispatch(setRegisterData("callNumber", 14131 ));

                    dispatch(setWebStatus("register"));
                }
            });
        }else{
            handleClassInputInvalid(fullName, "fieldFullName", "is-invalid")
            handleClassInputInvalid(phone, "fieldPhone", "is-invalid")
            handleClassInputInvalid(agency, "fieldAgency", "is-invalid")
        }
    }

    const handleClassInputInvalid = (value, id, className) =>{
        if(value.trim() === ""){ 
            document.getElementById(id).classList.add(className) }
        else{ 
            document.getElementById(id).classList.remove(className) }
    }
    const isIpadOS = () => {
        return navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 2 &&
          /MacIntel/.test(navigator.platform);
    }
    useEffect(() => {
        if(!isIpadOS()){                
            if(browser.os === "Android OS"){
                alert("อุปกรณ์ไม่รองรับการใช้งาน");
                window.location.href = "https://play.google.com/store/apps/details?id=ttrs.vrs&hl=en_GB&gl=th";
            }else if(browser.os === "iOS"){
                alert("อุปกรณ์ไม่รองรับการใช้งาน");
                window.location.href = "https://apps.apple.com/th/app/ttrs-video/id1467360876?l=th";
            }
        }
        localStorage.setItem("callType", "callPublic");
        getCurrentLocation();
    },[])

    const getCurrentLocation = () => {
        if(localStorage.getItem("locationName") === null){
            navigator.geolocation.getCurrentPosition((position) => {
                fetch(`https://api.longdo.com/map/services/address?lon=${position.coords.longitude}&lat=${position.coords.latitude}&locale=th&key=16b1beda30815bcf31c05d8ad184ca32`)
                .then(response => response.json())
                .then((data) =>{
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
                        <img src={public_normal} className="public-image" alt="Public Service"/>
                    </div>
                    <h2 className="entry-title" style={{marginTop:"15px"}}>สนทนาวิดีโอ </h2>
                    <h2 className="entry-title">(ติดต่อขอใช้บริการล่ามภาษามือทางไกล)</h2>
                </div>
                <br/>
                <div className="row justify-content-md-center">
                    <div className="col col-md-6">
                        <div>
                            <div className="form-group">
                                <label htmlFor="fieldFullName" className="public-label">ชื่อ - นามสกุล</label>
                                <input type="text" className="form-control" id="fieldFullName" onChange={handleName} value={fullName} maxLength={35} placeholder="กรอกชื่อ-นามสกุล"/>
                                <div className="invalid-feedback">
                                    กรุณากรอกชื่อ - นามสกุล
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fieldPhone" className="public-label">เลขหมายโทรศัพท์เพื่อติดต่อกลับ</label>
                                <input type="text" className="form-control" id="fieldPhone" onChange={handlePhone} value={phone} placeholder="กรอกเลขหมายโทรศัพท์เพื่อติดต่อกลับ"/>
                                <div className="invalid-feedback">
                                    กรุณากรอกเลขหมายโทรศัพท์เพื่อติดต่อกลับ
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fieldPhone" className="public-label">หน่วยงาน</label>
                                <input type="text" className="form-control" id="fieldAgency" onChange={handleAgency} value={agency} placeholder="หน่วยงาน" maxLength={50}/>
                                <div className="invalid-feedback">
                                    กรุณากรอกหน่วยงาน
                                </div>
                            </div>
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary btn-block btn-access-public" onClick={handleAccessPublicService}>เข้าใช้งาน</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PublicService;