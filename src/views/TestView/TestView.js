import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRegisterData, setWebStatus } from "../../actions";
import "./css/style.css";

const PublicService = () => {
  const [calloutNumber, setCalloutNumber] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.backgroundColor = "white";
    const callnum = "14131";

    dispatch(setRegisterData("extension", "0000163050082"));
    dispatch(setRegisterData("secret", "R6LMTpLZ5K6N7u7yZZGd"));
    dispatch(setRegisterData("domain", "vrsclient.203.150.245.34.nip.io"));
    dispatch(setRegisterData("websocket", "wss://vrsclient.203.150.245.34.nip.io:8089/ws"));

    dispatch(setRegisterData("callNumber", callnum));
    setCalloutNumber(callnum);
    localStorage.setItem("directlogin", "test");
    localStorage.setItem("callType", "callPublic");
  }, [dispatch]);

  const handleAccessPublicService = () => {
    dispatch(setWebStatus("register"));
  };
  const handleCalloutNumber = (event) => {
    setCalloutNumber(event.target.value);
    dispatch(setRegisterData("callNumber", event.target.value));
  };

  return (
    <>
      <br />
      <div className="container">
        <div className="row justify-content-md-center">
          <h2 className="entry-title" style={{ marginTop: "15px" }}>
            ทดสอบระบบ{" "}
          </h2>
        </div>
        <br />
        <div className="row justify-content-md-center">
          <div className="col col-md-6">
            <div>
              <div className="form-group">
                <label htmlFor="fieldPhone" className="public-label">
                  Call Number
                </label>
                <input type="text" className="form-control" id="fieldAgency" onChange={handleCalloutNumber} value={calloutNumber} maxLength={50} />
                <div className="invalid-feedback">Call Number</div>
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
};

export default PublicService;
