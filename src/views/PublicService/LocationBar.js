import React, { useEffect, useState } from "react";
import { getGeolocation } from "../../actions/fetchAPI";

export default function LocationBar() {
  const [locationName, setLocationName] = useState("");
  useEffect(() => {
    const getCurrentLocation = () => {
      if (localStorage.getItem("locationName") === null) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { district, subdistrict, province } = await getGeolocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setLocationName(`${district} ${subdistrict} ${province}`);
            localStorage.setItem("locationName", `${district} ${subdistrict} ${province}`);
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
    getCurrentLocation();
  }, []);

  return (
    <div className="vrs_map" style={{ backgroundColor: "#168ACE", textAlign: "center" }}>
      <div className="txt-vrs" style={{ color: "white", paddingTop: "2px", marginLeft: "5px" }}>
        {locationName}
      </div>
    </div>
  );
}
