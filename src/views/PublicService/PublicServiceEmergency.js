import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRegisterData, setWebStatus } from "../../actions";
import "./css/style.css";
import public_emer from "./img/Emer-VDO-Web-circle-01.png";
const { detect } = require("detect-browser");
const browser = detect();

const PublicServiceEmergency = () => {
    const [locationName, setLocationName] = useState("");
    const [fullName, setFullName] = useState(localStorage.getItem("fullname") === null ? "" : localStorage.getItem("fullname"));
    const [phone, setPhone] = useState(localStorage.getItem("phone") === null ? "" : localStorage.getItem("phone"));
    const [agency, setAgency] = useState(localStorage.getItem("agency") === null ? "" : localStorage.getItem("agency"));
    const emergencyText = ["", "ด่วนหมอ", "ด่วนตำรวจ", "ด่วนไฟไหม้"];
    const [typeEmergency, setTypeEmergency] = useState(localStorage.getItem("typeEmergency") === null ? "1" : localStorage.getItem("typeEmergency"));
    const dispatch = useDispatch();

    const handleName = (event) => {
        setFullName(event.target.value);
    };
    const handlePhone = (event) => {
        setPhone(event.target.value);
    };
    const handleAgency = (event) => {
        setAgency(event.target.value);
    };

    const handleAccessPublicService = () => {
        if (fullName.trim() !== "" && phone.trim() !== "" && agency.trim() !== "") {
            fetch(`${process.env.REACT_APP_URL_MAIN_API}/extension/public`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "webrtc-public",
                    agency,
                    phone,
                    fullName,
                    emergency: 1,
                    emergency_options_data: emergencyText[typeEmergency],
                    user_agent: navigator.userAgent,
                }),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.status === "OK") {
                        localStorage.setItem("fullname", fullName);
                        localStorage.setItem("phone", phone);
                        localStorage.setItem("agency", agency);
                        localStorage.setItem("typeEmergency", typeEmergency);
                        dispatch(setRegisterData("secret", data.data.secret));
                        dispatch(setRegisterData("extension", data.data.ext));
                        dispatch(setRegisterData("domain", data.data.domain));
                        dispatch(setRegisterData("websocket", data.data.websocket));
                        dispatch(setRegisterData("callNumber", 14124));
                        // dispatch(setRegisterData("callNumber", 14152 ));
                        dispatch(setWebStatus("register"));
                    }
                });
        } else {
            handleClassInputInvalid(fullName, "fieldFullName", "is-invalid");
            handleClassInputInvalid(phone, "fieldPhone", "is-invalid");
            handleClassInputInvalid(agency, "fieldAgency", "is-invalid");
        }
    };

    const handleClassInputInvalid = (value, id, className) => {
        try {
            if (value.trim() === "") {
                document.getElementById(id).classList.add(className);
            } else {
                document.getElementById(id).classList.remove(className);
            }
        } catch (error) {}
    };
    const isIpadOS = () => {
        return navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
    };
    useEffect(() => {
        if (!isIpadOS()) {
            if (browser.os === "Android OS") {
                alert("อุปกรณ์ไม่รองรับการใช้งาน");
                window.location.href = "https://play.google.com/store/apps/details?id=ttrs.vrs&hl=en_GB&gl=th";
            } else if (browser.os === "iOS") {
                alert("อุปกรณ์ไม่รองรับการใช้งาน");
                window.location.href = "https://apps.apple.com/th/app/ttrs-video/id1467360876?l=th";
            }
        }
        localStorage.setItem("callType", "callPublic");
        getCurrentLocation();
    }, []);

    const getCurrentLocation = () => {
        if (localStorage.getItem("locationName") === null) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetch(
                        `https://api.longdo.com/map/services/address?lon=${position.coords.longitude}&lat=${position.coords.latitude}&locale=th&key=16b1beda30815bcf31c05d8ad184ca32`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            setLocationName(`${data.district} ${data.subdistrict} ${data.province}`);
                            localStorage.setItem("locationName", `${data.district} ${data.subdistrict} ${data.province}`);
                        });
                },
                (error) => {
                    if (error.code === 1) {
                        alert("ไม่สามารถเรียกตำแหน่งปัจจุบันได้");
                    }
                }
            );
        } else {
            setLocationName(localStorage.getItem("locationName"));
        }
    };

    const handleRadioEmergency = (event) => {
        setTypeEmergency(event.target.value);
    };

    return (
        <>
            <div className="vrs_map" style={{ backgroundColor: "#168ACE", textAlign: "center" }}>
                <div className="txt-vrs" style={{ color: "white", paddingTop: "2px", marginLeft: "5px" }}>
                    {locationName}
                </div>
            </div>
            <br />
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="logo">
                        <img src={public_emer} className="public-image" alt="Public Service Emergency" />
                    </div>
                    <h2 className="entry-title emergency " style={{ marginTop: "15px" }}>
                        สนทนาวิดีโอ ฉุกเฉิน
                    </h2>
                    <h2 className="entry-title">(ติดต่อขอใช้บริการล่ามภาษามือทางไกล)</h2>
                </div>
                <br />
                <div className="row justify-content-md-center">
                    <div className="col col-md-6">
                        <div>
                            <div className="form-group">
                                <label htmlFor="fieldFullName" className="public-label">
                                    ชื่อ - นามสกุล
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fieldFullName"
                                    onChange={handleName}
                                    value={fullName}
                                    maxLength={35}
                                    placeholder="กรอกชื่อ - นามสกุล"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fieldPhone" className="public-label">
                                    เลขหมายโทรศัพท์เพื่อติดต่อกลับ
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fieldPhone"
                                    onChange={handlePhone}
                                    value={phone}
                                    placeholder="กรอกเลขหมายโทรศัพท์"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fieldPhone" className="public-label">
                                    หน่วยงาน
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fieldPhone"
                                    onChange={handleAgency}
                                    value={agency}
                                    placeholder="หน่วยงาน"
                                    maxLength={45}
                                />
                            </div>
                        </div>
                        {/* <div 
                            // className="col offset-3"
                            style={{textAlign:"center"}}
                        >
                            <div className="form-check">
                                <input className="form-check-input public-label" type="radio" name="emergencyRadio" id="emergencyRadio1" onChange={handleRadioEmergency} checked={typeEmergency === "1"} value="1"/>
                                <label className="form-check-label public-label" htmlFor="emergencyRadio1" style={{marginRight:"10px"}}>
                                    {emergencyText[1]}
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input public-label" type="radio" name="emergencyRadio" id="emergencyRadio2" onChange={handleRadioEmergency} checked={typeEmergency === "2"} value="2"/>
                                <label className="form-check-label public-label" htmlFor="emergencyRadio2">
                                    {emergencyText[2]}
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input public-label" type="radio" name="emergencyRadio" id="emergencyRadio3" onChange={handleRadioEmergency} checked={typeEmergency === "3"} value="3"/>
                                <label className="form-check-label public-label" htmlFor="emergencyRadio3">
                                    {emergencyText[3]}
                                </label>
                            </div>
                        </div> */}

                        <br />
                        <button type="submit" className="btn btn-danger btn-block" onClick={handleAccessPublicService}>
                            เข้าใช้งาน
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PublicServiceEmergency;
