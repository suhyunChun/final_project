const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
}
export const getFormAPIMethod = () => {
    return fetch(`https://cse316-final-project.herokuapp.com/api/form`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);

}

export const getFormByIdAPIMethod = (id) => {
    return fetch(`https://cse316-final-project.herokuapp.com/api/form/${id}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const updateFormAPIMethod = (form) => {
    return fetch(`https://cse316-final-project.herokuapp.com/api/form/${form._id}`, {
        ...defaultHeaders,
        method: 'PUT', // The method defaults to GET
        body: JSON.stringify(form),
    }).then(checkStatus);
}

export const deleteFormByIdAPIMethod = (id) => {
    return fetch(`https://cse316-final-project.herokuapp.com/api/form/${id}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}

export const createFormAPIMethod = (form) => {
    return fetch(`https://cse316-final-project.herokuapp.com/api/form/add`, {
        ...defaultHeaders,
        method: 'POST',
        body: JSON.stringify(form),
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