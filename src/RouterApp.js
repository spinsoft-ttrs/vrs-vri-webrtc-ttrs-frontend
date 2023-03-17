import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { VideoCall, ReceivingCall, Register, Dialpad, Login, Help, HelpDesk, Emergency, PublicService, PublicServiceEmergency, TestView } from "./views";
import { setWebStatus, setRegisterData } from "./actions";
import { verifyAuth, verifyUUID, reToken, refreshExtension } from "./actions/fetchAPI";

const RouterApp = (props) => {
    const webStatus = useSelector((state) => state.webStatus);
    // const [localStream, setLocalStream] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("webStatus", webStatus);
    }, [webStatus]);

    useEffect(() => {
        switch (props.uuid) {
            case "login":
                verifyToken();
                break;
            case "test":
                dispatch(setWebStatus("test"));
                break;
            case "public":
                dispatch(setWebStatus("public"));
                break;
            case "publicEmergency":
                dispatch(setWebStatus("publicEmergency"));
                break;
            case "publicemergency":
                dispatch(setWebStatus("publicEmergency"));
                break;
            default:
                verifyUUID(props.uuid, (result) => {
                    localStorage.setItem("uuid", props.uuid);
                    if (result === "expired") {
                        window.location.href = "https://ttrs.or.th";
                    } else if (JSON.stringify(result) !== "{}") {
                        setRefreshTimeout(result.extension);
                        dispatch(setRegisterData("secret", result.secret));
                        dispatch(setRegisterData("extension", result.extension));
                        dispatch(setRegisterData("domain", result.domain));
                        dispatch(setRegisterData("websocket", result.websocket));
                        switch (result.type) {
                            case "helpdesk":
                                // helpdesk ทั้งแบบไม่ login และปกติ
                                dispatch(setRegisterData("callNumber", 14127));
                                localStorage.setItem("callType", "callHelpdesk");
                                if (!result.extension.startsWith("0000")) {
                                    dispatch(setWebStatus("register"));
                                } else {
                                    dispatch(setWebStatus("helpDesk"));
                                }
                                break;
                            case "emergency":
                                // emergency ทั้งแบบไม่ login และปกติ
                                dispatch(setRegisterData("callNumber", 14121)); // production
                                // dispatch(setRegisterData("callNumber", 14151)); // devdelop

                                localStorage.setItem("callType", "callEmergency");
                                // if(!result.extension.startsWith("0000")){
                                //     dispatch(setWebStatus("register"));
                                // }else{
                                dispatch(setWebStatus("emergency"));
                                // }
                                break;
                            default:
                                dispatch(setWebStatus("dialpad"));
                                break;
                        }
                    } else {
                        // dispatch(setWebStatus("login"));
                    }
                });
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.uuid, localStorage.getItem("token")]);

    const verifyToken = () => {
        if (localStorage.getItem("token") !== null) {
            verifyAuth(localStorage.getItem("token"), (result) => {
                if (result && result !== "invalid" && result !== "expire") {
                    dispatch(setRegisterData("domain", result.domain));
                    dispatch(setRegisterData("websocket", result.websocket));
                    dispatch(setRegisterData("extension", result.ext));
                    dispatch(setRegisterData("secret", result.secret));
                    dispatch(setWebStatus("dialpad"));
                } else {
                    dispatch(setWebStatus("login"));
                }
                setInterval(function () {
                    if (localStorage.getItem("token") !== null) {
                        reToken(localStorage.getItem("token"), (result) => {
                            if (result.status === "OK") {
                                localStorage.setItem("token", result.data.token);
                            } else {
                                localStorage.clear();
                                window.location = "/";
                            }
                        });
                    }
                }, 600000);
            });
        } else {
            dispatch(setWebStatus("login"));
        }
    };

    const setRefreshTimeout = (extension) => {
        setInterval(function () {
            refreshExtension({ extension: extension }, (result) => {
                dispatch(setRegisterData("secret", result.data.secret));
                dispatch(setRegisterData("extension", result.data.extension));
                dispatch(setRegisterData("domain", result.data.domain));
                dispatch(setRegisterData("websocket", result.data.websocket));
            });
        }, 15 * 60000); // 60 * 1000 milsec
    };
    switch (webStatus) {
        case "test":
            return <TestView />;
        case "public":
            return <PublicService />;
        case "publicEmergency":
            return <PublicServiceEmergency />;
        case "publicemergency":
            return <PublicServiceEmergency />;
        case "callVRS":
            return <VideoCall />;
        case "callVRI":
            return <VideoCall />;
        case "callPublic":
            return <VideoCall />;
        case "helpDesk":
            return <HelpDesk />;
        case "callEmergency":
            return <VideoCall />;
        case "callHelpdesk":
            return <VideoCall />;
        case "emergency":
            return <Emergency />;
        case "receivingCall":
            return <ReceivingCall />;
        case "vrsReceivingCall":
            return <VideoCall />;
        case "register":
            return <Register />;
        case "dialpad":
            return <Dialpad />;
        case "login":
            return <Login />;
        case "help":
            return <Help />;
        default:
            return <div></div>;
        // return (<UserDetail/>)
    }
};
export default RouterApp;
