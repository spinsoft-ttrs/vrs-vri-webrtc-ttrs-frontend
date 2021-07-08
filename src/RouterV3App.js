import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VideoCall, ReceivingCall, Register, Dialpad, Login, Help, HelpDesk, Emergency, PublicService, PublicServiceEmergency } from './views';
import { setWebStatus, setRegisterData } from './actions';
import { getExtensionFromToken, getextensionEmregency } from './actions/fetchAPI';
import { AuthProvider } from 'oidc-react';

const RouterV3App = (props) => {
    console.log(props.uuid)
    const oidcConfig = {
        onSignIn: () => {
            console.log(`oidc.user:${process.env.REACT_APP_ISSUER}:${process.env.REACT_APP_CLIENT_ID}`)
            console.log(JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_ISSUER}:${process.env.REACT_APP_CLIENT_ID}`)))
            
            setToken(JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_ISSUER}:${process.env.REACT_APP_CLIENT_ID}`)).access_token)
            window.location.hash = '';
        },
        authority: process.env.REACT_APP_ISSUER,
        clientId: process.env.REACT_APP_CLIENT_ID,
        redirectUri: `${process.env.REACT_APP_DOMAIN}/v3/normal`
    };    
    
    const [token, setToken] = useState(null)
    const webStatus = useSelector(state => state.webStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            setToken(JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_ISSUER}:${process.env.REACT_APP_CLIENT_ID}`)).access_token)
        } catch (error) {
            
        }
    },[sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_ISSUER}:${process.env.REACT_APP_CLIENT_ID}`)])

    useEffect(() => {
        try {
            setToken(JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_ISSUER}:${process.env.REACT_APP_CLIENT_ID}`)).access_token)
        } catch (error) {
        }
    },[token])

    useEffect(() => {
        if(token !== "" && props.uuid === "normal"){
            dispatch(setWebStatus("dialpad"));
            getExtensionFromToken(token, (result) => {
                if(result === "expired"){
                    window.location.href = "https://ttrs.or.th";
                }else
                if(JSON.stringify(result) !== "{}"){
                    dispatch(setRegisterData("secret", result.secret));
                    dispatch(setRegisterData("extension", result.extension));
                    dispatch(setRegisterData("domain", result.domain));
                    dispatch(setRegisterData("websocket", result.websocket));
                    switch (result.type) {
                        case "helpdesk":
                            dispatch(setRegisterData("callNumber", 14127));
                            localStorage.setItem("callType" ,"callHelpdesk")
                            if(!result.extension.startsWith("0000")){
                                dispatch(setWebStatus("register"));
                            }else{
                                dispatch(setWebStatus("helpDesk"));
                            }
                            break;
                        case "emergency":
                            dispatch(setRegisterData("callNumber", 14121));
                            localStorage.setItem("callType", "callEmergency")
                            dispatch(setWebStatus("emergency"));
                            break;
                        default:
                            dispatch(setWebStatus("dialpad"));
                            break;
                    }
                }
            })
        }else if (props.uuid === "emergency"){
            getextensionEmregency((result) => {
                if(result === "expired"){
                    window.location.href = "https://ttrs.or.th";
                }else
                if(JSON.stringify(result) !== "{}"){
                    dispatch(setRegisterData("secret", result.secret));
                    dispatch(setRegisterData("extension", result.extension));
                    dispatch(setRegisterData("domain", result.domain));
                    dispatch(setRegisterData("websocket", result.websocket));
                    dispatch(setWebStatus("emergency"))
                }
            }) 
        }
    },[token, props.uuid])

    switch (webStatus) {
        case "public":
            return (<PublicService/>)
        case "publicEmergency":
            return (<PublicServiceEmergency/>)
        case "publicemergency":
            return (<PublicServiceEmergency/>)
        case "callVRS":
            return (<VideoCall/>)
        case "callVRI":
            return (<VideoCall/>)
        case "callPublic":
            return (<VideoCall/>)
        case "helpDesk":
            return (<HelpDesk/>)
        case "callEmergency":
            return (<VideoCall/>)
        case "callHelpdesk":
            return (<VideoCall/>)
        case "emergency":
            return (<Emergency/>)
        case "receivingCall" : 
            return (<ReceivingCall/>)
        case "vrsReceivingCall" :
            return (<VideoCall/>)
        case "register" : 
            return (<Register/>)
        case "dialpad" : 
            return (<AuthProvider {...oidcConfig}><Dialpad/></AuthProvider>)
        case "login" : 
            return (<Login/>)
        case "help" : 
            return (<Help/>)
        default:
            return (<div></div>)   
        // return (               
            //     <AuthProvider {...oidcConfig}>
            //         <Dialpad/>
            //     </AuthProvider> )
    }
}
export default RouterV3App;