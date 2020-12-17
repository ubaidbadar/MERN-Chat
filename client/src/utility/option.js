const option = (data = {}, method = 'POST', token) => {
    const toJSON = {
        method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    token && (toJSON.headers.Authorization = 'Bearer ' + token);
    return toJSON;
}

export default option;