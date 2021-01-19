export const setWebStatus = (payload) => {
    return {
        type : "UPDATESTATUS",
        payload
    }
}
export const setRegisterData = (typedata,payload) => {
    return {
        type : "UPDATEREGISTERDATA",
        typedata : typedata,
        payload : payload
    }
}
export const setControlVideo = (typedata,payload) => {
    return {
        type : "UPDATECONTROLVIDEO",
        typedata : typedata,
        payload : payload
    }
}
export const setMessagedata = (sender, origin, date, body) => {
    return {
        type : "UPDATEMESSAGEDATA",
        sender : sender,
        origin : origin,
        date : date,
        body : body
    }
}
export const setCamera = (payload) => {
    return {
        type : "UPDATESELECTCAMERA",
        payload
    }
}