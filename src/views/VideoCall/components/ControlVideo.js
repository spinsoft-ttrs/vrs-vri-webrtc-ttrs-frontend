import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setControlVideo } from "../../../actions";

const ControlVideo = () => {
  const dispatch = useDispatch();
  // const webStatus    = useSelector(state => state.webStatus);
  const controlVideo = useSelector((state) => state.controlVideo);
  const messagedata = useSelector((state) => state.messagedata);
  const [newMessage, setNewMessage] = useState(false);

  const handleOpenMessage = () => {
    setNewMessage(false);
    if (controlVideo.openMessage === false) {
      dispatch(setControlVideo("openMessage", true));
    } else if (controlVideo.openMessage === true) {
      dispatch(setControlVideo("openMessage", false));
    }
  };
  const handleOpenVideo = () => {
    if (controlVideo.openVideo === false) {
      dispatch(setControlVideo("openVideo", true));
    } else if (controlVideo.openVideo === true) {
      dispatch(setControlVideo("openVideo", false));
    }
  };
  const handleOpenAudio = () => {
    if (controlVideo.openAudio === false) {
      dispatch(setControlVideo("openAudio", true));
    } else if (controlVideo.openAudio === true) {
      dispatch(setControlVideo("openAudio", false));
    }
  };
  const handleOpenMic = () => {
    if (controlVideo.openMic === false) {
      dispatch(setControlVideo("openMic", true));
    } else if (controlVideo.openMic === true) {
      dispatch(setControlVideo("openMic", false));
    }
  };
  useEffect(() => {
    if (messagedata.length === 0) {
      setNewMessage(false);
    } else if (controlVideo.openMessage === true) {
      setNewMessage(false);
    } else {
      setNewMessage(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagedata]);

  const handleTerminate = () => {
    dispatch(setControlVideo("openTerminate", true));
  };

  return (
    <ul className="function-calls" style={{ width: "75%" }}>
      <li
        onClick={(event) => handleOpenVideo()}
        // className={webStatus === "callVRS"? "hide": ""}
      >
        <button className={`btn icon-novideo ${!controlVideo.openVideo ? "control-icon-active" : ""}`}>ปิดกล้อง</button>
      </li>
      <li
        onClick={(event) => handleOpenMic()}
        // className={webStatus === "callVRS"? "hide": ""}
      >
        <button className={`btn icon-mute ${!controlVideo.openMic ? "control-icon-active" : ""}`}>ปิดไมค์</button>
      </li>
      <li
        onClick={(event) => handleOpenAudio()}
        // className={webStatus === "callVRS"? "hide": ""}
      >
        <button className={`btn icon-voiceoff ${!controlVideo.openAudio ? "control-icon-active" : ""}`}>ปิดเสียง</button>
      </li>
      <li className="d-none d-lg-block" onClick={(event) => handleOpenMessage()}>
        {newMessage ? (
          <span className={`badge badge-danger`} style={{ position: "absolute" }}>
            มีข้อความใหม่
          </span>
        ) : (
          <div></div>
        )}
        <button className={`btn icon-message ${controlVideo.openMessage ? "control-icon-active" : ""}`} id="open-open">
          ข้อความ
        </button>
      </li>
      <li className="d-block d-lg-none" onClick={(event) => handleOpenMessage()}>
        <button className={`btn icon-message ${controlVideo.openMessage ? "control-icon-active" : ""}`} id="open-message">
          ข้อความ
        </button>
      </li>
      <li onClick={(event) => handleTerminate()}>
        <button className={`btn icon-hangup ${controlVideo.openTerminate ? "control-icon-active" : ""}`}>วางสาย</button>
      </li>
    </ul>
  );
};

export default ControlVideo;
