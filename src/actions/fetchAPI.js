export const urlapi    = process.env.REACT_APP_URL_MAIN_API;
export const urlSipAPI = process.env.REACT_APP_URL_SIP_API;
const needle = require("needle");

export const sendLog = (data) => {
    fetch(`${urlapi}/log`, {
        method : 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            data : data
        })
    })
    .then((response) => {return response.json();})
    .then((data) => {
    });
}

export const callLog = (data, callback) => {
    fetch(`${urlapi}/access/calllog`, {
        method : 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            token : data.token,
            accuracy : data.accuracy,
            latitude : data.latitude,
            longitude : data.longitude
        })
    })
    .then((response) => {return response.json();})
    .then((data) => {
        callback(data) 
    });
}
export const savelocation = (data, callback) => {
    fetch(`${urlapi}/location/savelocation`, {
        method : 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            extension : data.extension,
            accuracy : data.accuracy,
            latitude : data.latitude,
            longitude : data.longitude
        })
    })
    .then((response) => {return response.json();})
    .then((data) => {
        callback({}) 
    });
}

export const getSetting = (token, callback) => {
    fetch(`${urlapi}/setting`, {
        method : 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({token:token})
    })
    .then((response) => {return response.json();})
    .then((data) => {
        callback(data)
    });
}

export const verifyToken = (token, callback) => {

    fetch(`${urlapi}/verify`, {
        method : 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            token : token
        })
    })
    .then((response) => {return response.json();})
    .then((data) => {
        callback(data)
    });
}

export const verifyUUID = (uuid, callback) => {
    
    fetch(`${urlapi}/extension/detail`, {
        method : 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            uuid : uuid
        })
    })
    .then((response) => {return response.json();})
    .then((data) => {
        callback(data)
    });
}
export const closeRoom = (uuid) => {
    
    fetch(`${urlapi}/extension/close`, {
        method : 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            threadid : uuid
        })
    })
    .then((response) => {return response.json();})
    .then((data) => {
    });
}

export const reToken = (data, callback) => {
    needle.post(`${urlSipAPI}/refresh`, {
        token : data,
    }, (error, result) => {
        callback(result.body)
    });

}

export const verifyAuth = (token, callback) => {
    fetch(`${urlapi}/auth/verifyauth`, {
        method : 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            token
        })
    })
    .then((response) => {return response.json();})
    .then((data) => {
        callback(data) 
    });
}

export const refreshExtension = (data, callback) => {
    needle.post(`${urlapi}/extension/refreshExtension`, {
        extension : data.extension,
    }, (error, result) => {
        callback(result.body)
    });
}
