import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRegisterData, setWebStatus } from "../../actions";
import { getPublicExtension } from "../../actions/fetchAPI";
import "./css/style.css";
import { isIpadOS } from "../../utils/checkDevice";
import public_normal from "./img/Web-TTRS VDO-circle-01.png";
import LocationBar from "./LocationBar";
const { detect } = require("detect-browser");
const browser = detect();
const emergency = 0;

export default function PublicService() {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(localStorage.getItem("fullname") === null ? "" : localStorage.getItem("fullname"));
  const [phone, setPhone] = useState(localStorage.getItem("phone") === null ? "" : localStorage.getItem("phone"));
  const [agency, setAgency] = useState(localStorage.getItem("agency") === null ? "" : localStorage.getItem("agency"));

  const handleName = (event) => {
    setFullName(event.target.value);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleAgency = (event) => {
    setAgency(event.target.value);
  };

  const handleAccessPublicService = async () => {
    localStorage.setItem("directlogin", "");
    if (fullName.trim() !== "" && phone.trim() !== "" && agency.trim() !== "") {
      const extensionData = await getPublicExtension({
        type: "webrtc-public",
        agency,
        phone,
        fullName,
        emergency,
        emergencyOptionsData: "",
      });
      localStorage.setItem("fullname", fullName);
      localStorage.setItem("phone", phone);
      localStorage.setItem("agency", agency);
      dispatch(setRegisterData("secret", extensionData.secret));
      dispatch(setRegisterData("extension", extensionData.extension));
      dispatch(setRegisterData("domain", extensionData.domain));
      dispatch(setRegisterData("websocket", extensionData.websocket));
      dispatch(setRegisterData("callNumber", 14131));
      dispatch(setWebStatus("register"));
    } else {
      handleClassInputInvalid(fullName, "fieldFullName", "is-invalid");
      handleClassInputInvalid(phone, "fieldPhone", "is-invalid");
      handleClassInputInvalid(agency, "fieldAgency", "is-invalid");
    }
  };

  const handleClassInputInvalid = (value, id, className) => {
    if (value.trim() === "") {
      document.getElementById(id).classList.add(className);
    } else {
      document.getElementById(id).classList.remove(className);
    }
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
  }, []);

  return (
    <>
      <LocationBar />
      <br />
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="logo">
            <img src={public_normal} className="public-image" alt="Public Service" />
          </div>
          <h2 className="entry-title" style={{ marginTop: "15px" }}>
            สนทนาวิดีโอ
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
                  placeholder="กรอกชื่อ-นามสกุล"
                />
                <div className="invalid-feedback">กรุณากรอกชื่อ - นามสกุล</div>
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
                  placeholder="กรอกเลขหมายโทรศัพท์เพื่อติดต่อกลับ"
                />
                <div className="invalid-feedback">กรุณากรอกเลขหมายโทรศัพท์เพื่อติดต่อกลับ</div>
              </div>
              <div className="form-group">
                <label htmlFor="fieldPhone" className="public-label">
                  หน่วยงาน
                </label>
                <input type="text" className="form-control" id="fieldAgency" onChange={handleAgency} value={agency} placeholder="หน่วยงาน" maxLength={45} />
                <div className="invalid-feedback">กรุณากรอกหน่วยงาน</div>
              </div>
            </div>
            <br />
            <button type="submit" className="btn btn-primary btn-block btn-access-public" onClick={handleAccessPublicService}>
              เข้าใช้งาน
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
