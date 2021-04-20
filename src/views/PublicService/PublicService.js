import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRegisterData, setWebStatus } from '../../actions';
import './css/style.css';

const PublicService = () => {

    const [locationName, setLocationName] = useState("")
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("")
    const dispatch  = useDispatch();
    

    const handleName = (event) => {
        setFullName(event.target.value);
    }
    
    const handlePhone = (event) => {
        setPhone(event.target.value);
    }

    const handleAccessPublicService = () => {
        fetch(`https://ttrs.webrtc.api.203.151.21.116.nip.io/extension/public`, {
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                type : "webrtc-public"
            })
        })
        .then((response) => {return response.json();})
        .then((data) => {
            if(data.status === "OK"){
                localStorage.setItem("fullname", fullName);
                localStorage.setItem("phone", phone);
                dispatch(setRegisterData("secret", data.data.secret));
                dispatch(setRegisterData("extension", data.data.ext));
                dispatch(setRegisterData("domain", data.data.domain));
                dispatch(setRegisterData("websocket", data.data.websocket));
                dispatch(setRegisterData("callNumber", 14152 ));

                // dispatch(setRegisterData("secret", "test1234"));
                // dispatch(setRegisterData("extension", "5952"));
                // dispatch(setRegisterData("domain", "sip-51.d1669.in.th"));
                // dispatch(setRegisterData("websocket", "wss://sip-51.d1669.in.th:8002/ws"));
                // dispatch(setRegisterData("callNumber", 5953 ));


                // 5952
                // test1234
                // sip:5952@sip-51.d1669.in.th
                // wss://sip-51.d1669.in.th:8002/ws

                // dispatch(setRegisterData("callNumber", 9999 ));
                dispatch(setWebStatus("register"));
            }
        });
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
                        <img className="logo-hand2-blue"  alt=""/>
                        <br/>
                    </div>
                    <h2 className="entry-title">Public Service</h2>
                </div>
                <br/>
                <div className="row justify-content-md-center">
                    <div className="col col-md-6">
                        <div>
                            <div className="form-group">
                                <label htmlFor="fieldFullName">ชื่อ - นามสกุล</label>
                                <input type="text" className="form-control" id="fieldFullName" onChange={handleName} value={fullName} placeholder="กรอกชื่อ - นามสกุล"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fieldPhone">เบอร์โทรศัพท์</label>
                                <input type="text" className="form-control" id="fieldPhone" onChange={handlePhone} value={phone} placeholder="กรอกเบอร์โทรศัพท์"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fieldPhone">หน่วยงาน</label>
                                <input type="text" className="form-control" id="fieldPhone" defaultValue={"Develop"} placeholder="Develop"/>
                            </div>
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-danger btn-block" onClick={handleAccessPublicService}>เข้าใช้งาน</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PublicService;