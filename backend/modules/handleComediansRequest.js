import { sendData, sendError } from "./send.js";

export const handleComediansRequest = async () => {
    if (segments.length === 2) {
        const comedian = comedians.find(el => el.id == segments[1]);
        if (!comedian) {
            sendError(res, 404, `Comedian not found. ID: ${segments[1]}` );
            return;
        }
        sendData(res, comedian);
        return;
    }
    sendData(res, comedians);
}