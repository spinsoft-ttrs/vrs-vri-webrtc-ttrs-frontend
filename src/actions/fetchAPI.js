export let URL_API = process.env.REACT_APP_URL_MAIN_API;
export let URL_SIP_API = process.env.REACT_APP_URL_SIP_API;
const needle = require("needle");

if (process.env.NODE_ENV === "development") {
  console.log(process.env.NODE_ENV);
  URL_API = "http://localhost:3000";
}
console.log(URL_API);

export const getPublicExtension = async ({ type, agency, phone, fullName, emergency, emergencyOptionsData }) => {
  const response = await fetch(`${URL_API}/extension/static`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type,
      agency,
      phone,
      fullName,
      emergency,
      emergency_options_data: emergencyOptionsData,
      user_agent: navigator.userAgent.toString(),
    }),
  });
  if (response.ok) {
    return await response.json();
  }
  return {};
};

export const getGeolocation = async ({ latitude, longitude }) => {
  const response = await fetch(`https://api.longdo.com/map/services/address?lon=${longitude}&lat=${latitude}&locale=th&key=16b1beda30815bcf31c05d8ad184ca32`);
  if (response.ok) {
    return await response.json();
  }
  return {};
};

export const getExtensionFromToken = (token, callback) => {
  fetch(`${URL_API}/getextension`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data);
    });
};

export const getextensionEmregency = (callback) => {
  fetch(`${URL_API}/getextensionemregency`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data);
    });
};
export const sendLog = (data) => {
  // fetch(`${urlapi}/log`, {
  //     method : 'POST',
  //     headers : {
  //         'Accept' : 'application/json',
  //         'Content-Type' : 'application/json'
  //     },
  //     body : JSON.stringify({
  //         data : data
  //     })
  // })
  // .then((response) => {return response.json();})
  // .then((data) => {
  // });
};

export const callLog = (data, callback) => {
  fetch(`${URL_API}/access/calllog`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: data.token,
      accuracy: data.accuracy,
      latitude: data.latitude,
      longitude: data.longitude,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data);
    });
};
export const savelocation = (data, callback) => {
  fetch(`${URL_API}/location/savelocation`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      extension: data.extension,
      accuracy: data.accuracy,
      latitude: data.latitude,
      longitude: data.longitude,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback({});
    });
};

export const getSetting = (token, callback) => {
  fetch(`${URL_API}/setting`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data);
    });
};

export const verifyToken = (token, callback) => {
  fetch(`${URL_API}/verify`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data);
    });
};

export const verifyUUID = (uuid, callback) => {
  fetch(`${URL_API}/extension/detail`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uuid: uuid,
      userAgent: navigator.userAgent,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data);
    });
};
export const closeRoom = (extension) => {
  fetch(`${URL_API}/extension/close`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      extension: extension,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {});
};

export const reToken = (data, callback) => {
  needle.post(
    `${URL_SIP_API}/refresh`,
    {
      token: data,
    },
    (error, result) => {
      callback(result.body);
    }
  );
};

export const verifyAuth = (token, callback) => {
  fetch(`${URL_API}/auth/verifyauth`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data);
    });
};

export const refreshExtension = (data, callback) => {
  needle.post(
    `${URL_API}/extension/refreshExtension`,
    {
      extension: data.extension,
    },
    (error, result) => {
      callback(result.body);
    }
  );
};
