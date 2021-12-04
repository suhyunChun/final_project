const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
}

export const getUserAPIMethod = () => {
    return fetch(`/api/user`, {
        ...defaultHeaders,
    }).then(checkStatus)
}

export const getUserByIdAPIMethod = (id) => {
    return fetch(`/users/${id}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const updateUserAPIMethod = (user) => {
    return fetch(`/api/users/${user._id}`, {
        ...defaultHeaders,
        method: 'PUT', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(checkStatus);
}

export const deleteUserByIdAPIMethod = (id) => {
    return fetch(`/api/users/${id}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}

export const createUserAPIMethod = (users) => {
    return fetch(`/api/register`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(users),
    }).then(checkStatus)
        .then(res => res.json())
}

export const printUserId = (user) => {
    return fetch(`/api/user/userid`, {
        ...defaultHeaders,
    })
}
export const getCurrentUser = () =>{
    return fetch(`/api/currentuser`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON)
        .catch((err)=>console.dir(err))
}

export const logInUsersAPIMethod = (user) => {
    return fetch(`/api/login`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(checkStatus)
        .catch((err)=> console.log("LOG IN ERROR"))
}

export const logOutUsersAPIMethod = (user) => {
    return fetch(`/api/logout`, {
        ...defaultHeaders,
        method: 'POST',
        body: JSON.stringify(user),
    }).then(checkStatus)
        .then(parseJSON);
}
/*
export const uploadFileForUsersAPIMethod = (id, formData) => {
    return fetch(`/api/user/${id}/file`, {
        method: 'POST',
        body: formData,
    }).then(checkStatus)
        .then(parseJSON);
}*/

export const uploadImageToCloudinaryAPIMethod = (formData) => {
    const cloudName = 'suhyun'
    return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: formData,
    }).then(checkStatus)
        .then(parseJSON);
}


function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}