export const sendData = (res, data) => {
    res.writeHead(200, {
        "Content-Type": "text/json; charset=UTF-8", 
    })
    res.end(JSON.stringify(data));
}

export const sendError = (res, statusCode, errMessage) => {
    res.writeHead(statusCode, {
        "Content-Type": "text/json; charset=UTF-8",
    });
    res.end(errMessage);
}