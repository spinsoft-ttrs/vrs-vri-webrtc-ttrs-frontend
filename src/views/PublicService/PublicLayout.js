import React from "react";
import LocationBar from "./LocationBar";
import public_normal from "./img/Web-TTRS VDO-circle-01.png";
import public_emer from "./img/Emer-VDO-Web-circle-01.png";

export default function PublicLayout({ emergency, children }) {
  return (
    <>
      <LocationBar />
      <br />
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="logo">
            <img src={emergency !== 1 ? public_normal : public_emer} className="public-image" alt="Public Service" />
          </div>
          {emergency !== 1 ? (
            <h2 className="entry-title" style={{ marginTop: "15px" }}>
              สนทนาวิดีโอ
            </h2>
          ) : (
            <h2 className="entry-title emergency " style={{ marginTop: "15px" }}>
              สนทนาวิดีโอ ฉุกเฉิน
            </h2>
          )}
          <h2 className={`entry-title ${emergency !== 1 ? "" : "emergency"}`}>(ติดต่อขอใช้บริการล่ามภาษามือทางไกล)</h2>
        </div>
        <br />
        <div className="row justify-content-md-center">{children}</div>
      </div>
    </>
  );
}
