import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRegisterData, setWebStatus } from '../../actions';
import './css/style.css';

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
                    dispatch(setRegisterData("callNumber", 1111161700666 ));
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

    useEffect(() => {
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
                        <img src="data:image/png;base64,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" alt="Public Service Emergency"/>
                    </div>
                    <h2 className="entry-title " style={{marginTop:"15px"}}>สนทนาวิดีโอ</h2>
                </div>
                <br/>
                <div className="row justify-content-md-center">
                    <div className="col col-md-6">
                        <div>
                            <div className="form-group">
                                <label htmlFor="fieldFullName">ชื่อ - นามสกุล</label>
                                <input type="text" className="form-control" id="fieldFullName" onChange={handleName} value={fullName}/>
                                <div className="invalid-feedback">
                                    กรุณากรอกชื่อ - นามสกุล
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fieldPhone">เบอร์โทรศัพท์</label>
                                <input type="text" className="form-control" id="fieldPhone" onChange={handlePhone} value={phone} placeholder="กรอกเบอร์โทรศัพท์"/>
                                <div className="invalid-feedback">
                                    กรุณากรอกเบอร์โทรศัพท์
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fieldPhone">หน่วยงาน</label>
                                <input type="text" className="form-control" id="fieldAgency" onChange={handleAgency} value={agency} placeholder="หน่วยงาน"/>
                                <div className="invalid-feedback">
                                    กรุณากรอกหน่วยงาน
                                </div>
                            </div>
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary btn-block" onClick={handleAccessPublicService}>เข้าใช้งาน</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PublicService;