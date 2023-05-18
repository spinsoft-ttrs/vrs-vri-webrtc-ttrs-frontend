import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRegisterData, setWebStatus } from "../../actions";
import { getPublicExtension, updateExtensionDetail } from "../../actions/fetchAPI";
import "./css/style.css";
import { isIpadOS } from "../../utils/checkDevice";

import PublicLayout from "./PublicLayout";
const { detect } = require("detect-browser");
const browser = detect();

export default function PublicService({ emergency }) {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(localStorage.getItem("fullname") === null ? "" : localStorage.getItem("fullname"));
  const [phone, setPhone] = useState(localStorage.getItem("phone") === null ? "" : localStorage.getItem("phone"));
  const [agency, setAgency] = useState(localStorage.getItem("agency") === null ? "" : localStorage.getItem("agency"));
  // const callDestination = emergency !== 1 ? 14131 : 9999
  // Production
  // 14120 เบอร์โทร Public Service เข้าล่าม
  // 14131 เบอร์โทร Public Service เข้าเครื่อง MA
  const callDestination = emergency !== 1 ? 514120 : 514124;
  // const callDestination = 9999;

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
    if (browser.os === "firefox") return;

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
      console.log(extensionData);
      dispatch(setRegisterData("secret", extensionData.secret));
      dispatch(setRegisterData("extension", extensionData.extension));
      dispatch(setRegisterData("domain", extensionData.domain));
      dispatch(setRegisterData("websocket", extensionData.websocket));
      dispatch(setRegisterData("callNumber", callDestination));
      dispatch(setWebStatus("register"));
      updateExtensionDetail(
        {
          name: fullName,
          mobile: phone,
          threadid: extensionData.threadid,
        },
        () => {}
      );
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
      if (browser.name === "firefox") {
        alert("เว็บบราวเซอร์ไม่รอบรับกรุณาใช้ Google Chrome");
        return;
      }
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
    <PublicLayout emergency={emergency}>
      <div className="col col-md-8">
        <div className="form-group">
          <label htmlFor="fieldFullName" className="public-label">
            ชื่อ - นามสกุล
          </label>
          <input type="text" className="form-control" id="fieldFullName" onChange={handleName} value={fullName} maxLength={35} placeholder="กรอกชื่อ-นามสกุล" />
          <div className="invalid-feedback">กรุณากรอกชื่อ - นามสกุล</div>
        </div>
        <div className="form-group">
          <label htmlFor="fieldPhone" className="public-label">
            เลขหมายโทรศัพท์เพื่อติดต่อกลับ
          </label>
          <input type="text" className="form-control" id="fieldPhone" onChange={handlePhone} value={phone} placeholder="กรอกเลขหมายโทรศัพท์เพื่อติดต่อกลับ" />
          <div className="invalid-feedback">กรุณากรอกเลขหมายโทรศัพท์เพื่อติดต่อกลับ</div>
        </div>
        <div className="form-group">
          <label htmlFor="fieldPhone" className="public-label">
            หน่วยงาน
          </label>
          <input type="text" className="form-control" id="fieldAgency" onChange={handleAgency} value={agency} placeholder="หน่วยงาน" maxLength={45} />
          <div className="invalid-feedback">กรุณากรอกหน่วยงาน</div>
        </div>
        <br />
        <button
          type="submit"
          className={`btn btn-primary btn-block btn-access-public ${emergency !== 1 ? "" : "emergency-button"} `}
          onClick={handleAccessPublicService}
        >
          เข้าใช้งาน
        </button>
      </div>
    </PublicLayout>
  );
}
