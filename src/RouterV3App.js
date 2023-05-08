import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { VideoCall, ReceivingCall, Register, Dialpad, Login, Help, HelpDesk, Emergency, PublicService } from "./views";
import { setWebStatus, setRegisterData } from "./actions";
import { getExtensionFromToken, getextensionEmregency } from "./actions/fetchAPI";
import { AuthProvider } from "oidc-react";

const RouterV3App = (props) => {
  const oidcConfig = {
    onSignIn: () => {
      console.log(`oidc.user:${process.env.REACT_APP_ISSUER}:${process.env.REACT_APP_CLIENT_ID}`);
      console.log(JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_ISSUER}:${process.env.REACT_APP_CLIENT_ID}`)));

      setToken(JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_ISSUER}:${process.env.REACT_APP_CLIENT_ID}`)).access_token);
      window.location.hash = "";
    },
    authority: process.env.REACT_APP_ISSUER,
    clientId: process.env.REACT_APP_CLIENT_ID,
    redirectUri: `${process.env.REACT_APP_DOMAIN}/v3/normal`,
  };

  const [token, setToken] = useState(null);
  const webStatus = useSelector((state) => state.webStatus);
  const dispatch = useDispatch();
  const oidcUser = sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_ISSUER}:${process.env.REACT_APP_CLIENT_ID}`);

  useEffect(() => {
    try {
      setToken(JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_ISSUER}:${process.env.REACT_APP_CLIENT_ID}`)).access_token);
    } catch (error) {
      // console.log("TEST")
      // window.location
    }
  }, [oidcUser]);

  useEffect(() => {
    try {
      setToken(JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_ISSUER}:${process.env.REACT_APP_CLIENT_ID}`)).access_token);
    } catch (error) {}
  }, [token]);

  useEffect(() => {
    if (token !== "" && props.uuid === "normal") {
      dispatch(setWebStatus("dialpad"));
      getExtensionFromToken(token, (result) => {
        if (result === "expired") {
          window.location.href = "https://ttrs.or.th";
        } else if (JSON.stringify(result) !== "{}") {
          dispatch(setRegisterData("secret", result.secret));
          dispatch(setRegisterData("extension", result.extension));
          dispatch(setRegisterData("domain", result.domain));
          dispatch(setRegisterData("websocket", result.websocket));
          switch (result.type) {
            case "helpdesk":
              dispatch(setRegisterData("callNumber", 14127));
              localStorage.setItem("callType", "callHelpdesk");
              if (!result.extension.startsWith("0000")) {
                dispatch(setWebStatus("register"));
              } else {
                dispatch(setWebStatus("helpDesk"));
              }
              break;
            case "emergency":
              dispatch(setRegisterData("callNumber", 14121));
              localStorage.setItem("callType", "callEmergency");
              dispatch(setWebStatus("emergency"));
              break;
            default:
              dispatch(setWebStatus("dialpad"));
              break;
          }
        }
      });
    } else if (props.uuid === "emergency") {
      getextensionEmregency((result) => {
        if (result === "expired") {
          window.location.href = "https://ttrs.or.th";
        }

        // if(JSON.stringify(result) !== "{}"){
        // console.log(localStorage.getItem("typeEmergency"))
        switch (localStorage.getItem("typeEmergency")) {
          case "1":
            dispatch(setRegisterData("callNumber", 1669));
            break;
          case "2":
            dispatch(setRegisterData("callNumber", 191));
            break;
          case "3":
            dispatch(setRegisterData("callNumber", 199));
            break;
          default:
            // dispatch(setRegisterData("callNumber", 14121));
            break;
        }

        // dispatch(setRegisterData("callNumber", 9999 ));
        dispatch(setRegisterData("secret", result.secret));
        dispatch(setRegisterData("extension", result.extension));
        dispatch(setRegisterData("domain", result.domain));
        dispatch(setRegisterData("websocket", result.websocket));
        dispatch(setWebStatus("emergency"));
        // dispatch(setWebStatus("register"));
        // }
      });
    }
  }, [token, props.uuid, dispatch]);

  switch (webStatus) {
    case "public":
      return <PublicService />;
    case "publicEmergency":
      return <PublicService emergency={1} />;
    case "publicemergency":
      return <PublicService emergency={1} />;
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
      return (
        <AuthProvider {...oidcConfig}>
          <Dialpad />
        </AuthProvider>
      );
    case "login":
      return <Login />;
    case "help":
      return <Help />;
    default:
      return <div></div>;
    // return (
    //     <AuthProvider {...oidcConfig}>
    //         <Dialpad/>
    //     </AuthProvider> )
  }
};
export default RouterV3App;
