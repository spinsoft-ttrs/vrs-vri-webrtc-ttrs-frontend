import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWebStatus } from "../../actions";
import "./css/style.css";

const HelpDesk = () => {
    const [locationName, setLocationName] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const dispatch = useDispatch();

    const handleName = (event) => {
        setFullName(event.target.value);
    };
    const handlePhone = (event) => {
        setPhone(event.target.value);
    };

    const handleAccessHelpDesk = () => {
        if (fullName.trim() !== "" && phone.trim() !== "") {
            localStorage.setItem("fullname", fullName);
            localStorage.setItem("phone", phone);
            dispatch(setWebStatus("register"));
        }
    };
    useEffect(() => {
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
                        <img className="logo-hand2-blue" src={require("./img/logo-hand2-blue.png")} alt="" />
                        <br />
                    </div>
                    <h2 className="entry-title">TTRS Helpdesk</h2>
                </div>
                <br />
                <div className="row justify-content-md-center">
                    <div className="col col-md-6">
                        <div className="form-group">
                            <label htmlFor="fieldFullName">ชื่อ - นามสกุล</label>
                            <input
                                type="text   "
                                className="form-control"
                                id="fieldFullName"
                                onChange={handleName}
                                value={fullName}
                                placeholder="กรอกชื่อ - นามสกุล"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fieldPhone">เบอร์โทรศัพท์</label>
                            <input type="text" className="form-control" id="fieldPhone" onChange={handlePhone} value={phone} placeholder="กรอกเบอร์โทรศัพท์" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" onClick={handleAccessHelpDesk}>
                            เข้าใช้งาน
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HelpDesk;
