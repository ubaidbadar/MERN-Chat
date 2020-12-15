const option = (data = {}, method = 'POST') => ({
    method,
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
})

export default option;