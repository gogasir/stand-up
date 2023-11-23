import { sendData, sendError } from "./send.js";
import fs from 'node:fs/promises';

const CLIENTS = './clients.json';

export const handleAddClient = (req, res) => {
    let body = '';
    try {
        req.on('data', chunk => {
            body += chunk;
        });
    } catch (error) {
        sendError(req, 500, 'Error reed request')
    }


    req.on('end', async () => {
        try {
            const newClient = JSON.parse(body);
            if (!newClient.fullName ||
                !newClient.phone ||
                !newClient.ticketNumber 
            ) {
                sendError(res, 400, 'Client not correct')
            }

            if (newClient.booking &&
                (!newClient.booking.length ||
                !Array.isArray(newClient.booking) ||
                !newClient.booking.every((item) => item.comedian && item.time))
                ) {
                sendError(res, 400, 'Client booking not correct');
                return;
            }
            const clientData = await fs.readFile(CLIENTS, 'utf-8');
            const clients = JSON.parse(clientData);
            clients.push(newClient);
            await fs.writeFile(CLIENTS, JSON.stringify(clients));

            sendData(res, newClient);
        } catch (error) {
            console.error('Error: ', error);
        }
    })
}