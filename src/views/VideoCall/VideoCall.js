import React, { useState, useEffect } from "react";
import ControlVideo from "./components/ControlVideo";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./components/Chat";
import ChatInVideo from "./components/ChatInVideo";
import ControlVideo2 from "./components/ControlVideo2";
import VideoStopwatch from "./components/VideoStopwatch";
import Statusbar from "../../components/Statusbar";
import { PreviewText, DetectSize } from "./fuctions";
import {
  setMessagedata,
  setRegisterData,
  setWebStatus,
  setControlVideo,
} from "../../actions";
import { closeRoom } from "../../actions/fetchAPI";
import adapter from "webrtc-adapter";
import "./style.css";

const { detect } = require("detect-browser");
const browser = detect();
const async = require("async");
const dayjs = require("dayjs");
const matchMedia = window.matchMedia("(max-width: 768px)");

let mediaStream = null;
let session = null;
let constraints;

// switch (browser.name) {
//     case "firefox":
//         constraints = {
//             audio: true,
//             video: {
//                 frameRate : { max : 15 },
//                 width: { min: 352, max: 1000 },
//                 height: { min: 240 },
//             },
//             optional: [ { facingMode: "user" }]
//         }
//         break;
//     case "safari" :
//         constraints = {
//             audio: true,
//             video: {
//                 width: 352,
//                 height: 240
//             },
//             optional: [ { facingMode: "user" }]
//         }
//         break;
//     default:
//         constraints = {
//             audio: true,
//             video: {
//                 frameRate : { min: 15, max : 15},
//                 width: { min: 352, max: 352 },
//                 height: { min: 240, max: 240},
//             }
//         }
//         break;
// }

constraints = {
  audio: {
    sampleRate: 16000,
    sampleSize: 16,
  },
  video: {
    frameRate: { min: 15, max: 15 },
    width: { min: 352, max: 352 },
    height: { min: 240, max: 240 },
  },
};

var localVideo, remoteVideo;

const VideoCall = () => {
  const [msgRealtime, setMsgRealtime] = useState("");
  const [screenOrientation, setScreenOrientation] = useState("oriented");
  const [msgRealtimeRaw, setMsgRealtimeRaw] = useState("");
  const [chooseCamera, setChooseCamera] = useState(false);
  const [peerconnection, setPeerconnection] = useState(null);
  const [connection, setConnection] = useState(false);
  const [iOSDevice, setiOSDevice] = useState("");
  const controlVideo = useSelector((state) => state.controlVideo);
  const registerData = useSelector((state) => state.registerData);
  const webStatus = useSelector((state) => state.webStatus);
  // const selectDeviceLabel = useSelector(state => state.chooseCamera);
  const dispatch = useDispatch();

  const size = DetectSize();

  useEffect(() => {
    if (size.width > size.height) {
      setScreenOrientation("landscape");
    } else {
      setScreenOrientation("oriented");
    }
  }, [size]);

  useEffect(() => {
    document.body.style.backgroundColor = "#0F3548";
    localVideo = document.getElementById("local-video");
    remoteVideo = document.getElementById("remote-video");
    dragElement(document.getElementById("img_vdocall"));
    // if(browser.os === "Android OS"){
    initAndroid();
    async function initAndroid() {
      console.log("initAndroid");
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        localVideo.srcObject = mediaStream;
        console.log(mediaStream);
        makeCall(mediaStream);
      } catch (e) {}
    }
    // }else{
    //     makeCall(true);
    // }
    if (localStorage.getItem("callType") === "callVRS") {
      dispatch(setControlVideo("openMic", false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (matchMedia.matches) {
      if (controlVideo.openMessage) {
        document.getElementById("slideMessage").style.display = "block";
        document.getElementById("img_vdocall").classList.add("vdo_call_show");
        document.getElementById("call-mobile").classList.add("call-mobile");
        document
          .getElementById("waiting_mobile")
          .classList.add("waiting_mobile");
      } else {
        document.getElementById("slideMessage").style.display = "none";
        document
          .getElementById("img_vdocall")
          .classList.remove("vdo_call_show");
        document.getElementById("call-mobile").classList.remove("call-mobile");
      }
    } else {
      if (controlVideo.openMessage) {
        document.getElementById("mySidenav").style.width = "30%";
        document.getElementById("xxx").style.display = "block";
        document.getElementById("main").style.marginRight = "30%";
      } else {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("xxx").style.display = "none";
        document.getElementById("main").style.marginRight = "0";
      }
    }
  }, [controlVideo.openMessage, connection]);

  useEffect(() => {
    if (controlVideo.show === false) {
      if (browser.os === "iOS") {
        setiOSDevice("iphone-control");
        // document.getElementById("img_vdocall").classList.add('vdo_call_show');
      } else {
        setiOSDevice("");
      }
    } else {
      setiOSDevice("");
    }
    // document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, [controlVideo.show]);

  useEffect(() => {
    dispatch(setControlVideo("openMessage", true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlVideo.show]);

  useEffect(() => {
    if (connection) {
      localVideo.srcObject.getTracks().forEach(function (track) {
        if (track.kind === "video") {
          track.enabled = controlVideo.openVideo;
          console.log("openVideo", controlVideo.openVideo);
        }
      });
    }
  }, [controlVideo.openVideo, connection]);

  useEffect(() => {
    if (connection) {
      localVideo.srcObject.getTracks().forEach(function (track) {
        if (track.kind === "audio") {
          track.enabled = controlVideo.openMic;
        }
      });
    }
  }, [controlVideo.openMic, connection]);

  useEffect(() => {
    if (connection) {
      remoteVideo.srcObject.getTracks().forEach(function (track) {
        // console.log(track)
        if (track.kind === "audio") {
          track.enabled = controlVideo.openAudio;
        }
      });
    }
  }, [controlVideo.openAudio, connection]);

  useEffect(() => {
    if (controlVideo.openTerminate) {
      if (connection) {
        localVideo.srcObject.getTracks().forEach(function (track) {
          track.stop();
        });
        localVideo.srcObject = null;
        remoteVideo.srcObject.getTracks().forEach(function (track) {
          track.stop();
        });
        remoteVideo.srcObject = null;
        peerconnection.terminate();
        registerData.userAgent.unregister();
        dispatch(setControlVideo("openTerminate", false));
        try {
          switch (localStorage.getItem("directlogin")) {
            case "true":
              // dispatch(setWebStatus("login"));
              break;
            case "test":
              // dispatch(setWebStatus("test"));
              break;
            default:
              window.location.href = "https://ttrs.or.th";
              break;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        window.close();
        registerData.userAgent.unregister();
        try {
          switch (localStorage.getItem("directlogin")) {
            case "true":
              // dispatch(setWebStatus("login"));
              break;
            case "test":
              // dispatch(setWebStatus("test"));
              break;
            default:
              window.location.href = "https://ttrs.or.th";
              break;
          }
        } catch (error) {
          console.log(error);
        }
        // dispatch(setWebStatus("dialpad"));
        dispatch(setControlVideo("openTerminate", false));
      }
      localStorage.setItem("directlogin", "");
      closeRoom(localStorage.getItem("uuid"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlVideo.openTerminate]);

  const makeCall = (mediaStream) => {
    console.log("makecall");
    var options = {};
    async.series([
      (callback) => {
        var eventHandlers = {
          progress: (e) => {
            console.log("call is in progress");
          },
          failed: (e) => {
            console.log(e);
            if (e.cause === "User Denied Media Access") {
              alert("ไม่สามารถเข้าถึงสิทธิ์การใช้งานกล้องวิดีโอ");
            }
          },
          ended: (e) => {
            console.log("ended", e);
            // registerData.userAgent.unregister();
          },
          confirmed: (e) => {},
          icecandidate: (e) => {},
          reinvite: (e) => {},
          sdp: (e) => {
            if (e.originator === "local") {
              // e.sdp = CodecsHandler.preferCodec(e.sdp, "vp9")
              // console.log("local")
              // console.log(e.sdp)
            }
          },
        };

        var pcConfig = {};
        pcConfig = {
          iceServers: [
            {
              urls: "turn:turn.ttrs.in.th?transport=udp",
              username: "turn01",
              credential: "Test1234",
            },
          ],
        };

        // pcConfig = {
        //     iceServers: [{urls: "stun:stun.l.google.com:19302"}]
        // }
        options = {
          eventHandlers: eventHandlers,
          mediaStream: mediaStream,
          pcConfig: pcConfig,
          sessionTimersExpires: 9999,
        };

        console.log(options);
        console.log(registerData);
        registerData.userAgent.on("newRTCSession", (data) => {
          console.log("newRTCSession");
          session = data.session;

          session.on("peerconnection", (e) => {
            console.log("peerconnection");
            console.log(e);
          });
          session.on("ended", (e) => {
            console.log(e);
            // dispatch(setWebStatus("public"))
            registerData.userAgent.unregister();
          });
          session.on("failed", (e) => {
            console.log(e);
            registerData.userAgent.unregister();
            // dispatch(setWebStatus("public"))
          });
          session.on("confirmed", (e) => {
            console.log("confirmed", e);
            // addtrack
            // console.log(session.connection.getLocalStreams()[0].sender);

            localVideo.srcObject = session.connection.getLocalStreams()[0];
            remoteVideo.srcObject = session.connection.getRemoteStreams()[0];
            setPeerconnection(session);
            // setConnection(true);
          });
        });
        registerData.userAgent.on("newMessage", function (e) {
          console.log("newMessage");
          try {
            if (e.message._request.body.startsWith("@MCU")) {
              setTimeout(() => {
                localVideo.srcObject.getTracks().forEach(function (track) {
                  if (track.kind === "video") {
                    track.enabled = false;
                  }
                });
              }, 4000);
              setTimeout(() => {
                localVideo.srcObject.getTracks().forEach(function (track) {
                  if (track.kind === "video") {
                    track.enabled = true;
                  }
                });
              }, 5000);
              e.message._request.body = "";
            }

            if (e.message._request.body.startsWith("@switch")) {
              setInterval(() => {
                const resp = session.renegotiate();
                console.log(resp);
              }, [3000]);

              dispatch(
                setRegisterData(
                  "callNumber",
                  e.message._request.body.split("|")[1]
                )
              );
              if (localStorage.getItem("callType") === "callEmergency") {
                setTimeout(() => {
                  if (localStorage.getItem("fullname") !== "") {
                    registerData.userAgent.sendMessage(
                      `sip:${e.message._request.body.split("|")[1]}@${
                        registerData.domain
                      }`,
                      `ชื่อ ${localStorage.getItem("fullname")}`
                    );
                  }
                  if (localStorage.getItem("phone") !== "") {
                    registerData.userAgent.sendMessage(
                      `sip:${e.message._request.body.split("|")[1]}@${
                        registerData.domain
                      }`,
                      `เบอร์โทรศัพท์ ${localStorage.getItem("phone")}`
                    );
                  }
                  switch (localStorage.getItem("callType")) {
                    case "callEmergency":
                      registerData.userAgent.sendMessage(
                        `sip:${e.message._request.body.split("|")[1]}@${
                          registerData.domain
                        }`,
                        `ประเภทฉุกเฉิน ${localStorage.getItem("typeEmergency")}`
                      );
                      break;
                    default:
                      break;
                  }
                }, 2000);
              }
            } else {
              if (e.message._request.body.startsWith("@open_chat")) {
                localVideo.srcObject.getTracks().forEach(function (track) {
                  if (track.kind === "video") {
                    track.enabled = false;
                  }
                });
                setTimeout(() => {
                  localVideo.srcObject.getTracks().forEach(function (track) {
                    console.log("turn on camera");
                    if (track.kind === "video") {
                      track.enabled = true;
                    }
                  });
                  setConnection(true);
                }, 4000);
              } else if (!e.message._request.body.startsWith("<rtt")) {
                dispatch(
                  setMessagedata(
                    e.originator,
                    e.originator,
                    dayjs().format("HH:mm:ss"),
                    e.message._request.body
                  )
                );
                setMsgRealtime("");
              } else {
                if (e.originator !== "local") {
                  setMsgRealtimeRaw(e.message._request.body);
                }
              }
            }
          } catch (error) {
            console.log(error);
          }
        });
        callback();
      },
      () => {
        console.log("userAgent Call", registerData.callNumber);
        registerData.userAgent.call(
          `sip:${registerData.callNumber}@${registerData.domain}`,
          options
        );
      },
    ]);
  };

  useEffect(() => {
    if (chooseCamera) {
      var promise1 = new Promise((resolve, reject) => {
        const tracks = localVideo.srcObject.getTracks();
        tracks.forEach(function (track) {
          track.stop();
        });
        localVideo.srcObject = null;
        resolve();
      });
      promise1.then(() => {
        if (constraints.video.facingMode === "user") {
          constraints.video.facingMode = "environment";
        } else {
          constraints.video.facingMode = "user";
        }
        constraints.video.facingMode = chooseCamera;
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            localVideo.srcObject = stream;
            peerconnection.connection
              .getSenders()[1]
              .replaceTrack(stream.getVideoTracks()[0]);
            peerconnection.connection
              .getSenders()[0]
              .replaceTrack(stream.getAudioTracks()[0]);
          })
          .catch((e) => console.error(e));
      });
    }
  }, [chooseCamera, peerconnection]);

  const handleChooseCamera = () => {
    if (chooseCamera === "environment") {
      setChooseCamera("user");
    } else {
      setChooseCamera("environment");
    }
  };

  useEffect(() => {
    if (msgRealtimeRaw !== "") {
      setMsgRealtime(PreviewText(msgRealtime, msgRealtimeRaw));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgRealtimeRaw]);

  const handleIOSClass = () => {
    if (browser.os === "Android OS") {
      return `vdo_call_show_android`;
    }
    if (browser.os === "iOS") {
      if (iOSDevice === "iphone-control") {
        if (controlVideo.show) {
          return "vdo_call_show_ios";
        } else {
          return `${iOSDevice} vdo_call_show_ios`;
        }
      } else {
        return "vdo_call_show_ios";
      }
    }
    return "vdo_call_show_pc";
  };
  const handleRemoteVideoClass = () => {
    if (browser.os === "iOS") {
      return "remote-video-mobile-with-keyboard-ios";
    } else if (browser.os === "Android OS") {
      if (controlVideo.show === false) {
        return "remote-video-mobile-with-keyboard-android";
      } else {
        return "remote-video-mobile";
      }
    } else {
      return `remote-video`;
    }
  };
  const dragElement = (elmnt) => {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  };
  const detectDeviceAndScreen = () => {
    if (browser.os === "Android OS" || browser.os === "iOS") {
      if (screenOrientation === "landscape") {
        return "incoming-calls-mobile";
      } else {
        return "";
      }
    } else {
      return "";
    }
  };
  return (
    <>
      <div className="vdocall-keypad">
        {!matchMedia.matches ? <Chat messageRealtime={msgRealtime} /> : <div />}
        <div className="vdo-calling" id="main">
          <Statusbar
            handleChooseCamera={handleChooseCamera}
            stopWatch={<VideoStopwatch start={connection} />}
          />
          <div className={`incoming-sec ${detectDeviceAndScreen()}`}>
            <div className="incoming-calls calls-waiting" id="call-mobile">
              <div
                className={`${handleIOSClass()} img-vdo d-block mb-3  `}
                id="img_vdocall"
              >
                <div id="img_videocallheader">
                  {matchMedia.matches ? (
                    <div>
                      {" "}
                      <ChatInVideo
                        messageRealtime={msgRealtime}
                        iOSDevice={iOSDevice}
                      />{" "}
                      <ControlVideo2 />{" "}
                    </div>
                  ) : (
                    <div />
                  )}
                  <video
                    id="local-video"
                    className="local-video"
                    alt="local-video"
                    muted
                    autoPlay
                    playsInline
                  />
                </div>
              </div>
              <div id="waiting_mobile">
                <div className={`${iOSDevice} img-vdo`}>
                  <video
                    id="remote-video"
                    poster={require("./img/waiting.png").default}
                    className={`${handleRemoteVideoClass()}`}
                    // className="remote-video-mobile-with-keyboard-ios"
                    autoPlay
                    playsInline
                  />
                </div>
              </div>

              {!matchMedia.matches ? <ControlVideo /> : <div />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCall;
