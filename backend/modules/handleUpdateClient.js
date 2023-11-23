import { sendData, sendError } from "./send.js";
import fs from 'node:fs/promises';

const CLIENTS = './clients.json';

export const handleUpdateClient = async (req, res, ticketNumber) => {
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
            const updateDataClient = JSON.parse(body);
            if (!updateDataClient.fullName ||
                !updateDataClient.phone ||
                !updateDataClient.ticketNumber 
            ) {
                sendError(res, 400, 'Client not correct')
            }

            if (updateDataClient.booking &&
                (!updateDataClient.booking.length ||
                !Array.isArray(updateDataClient.booking) ||
                !updateDataClient.booking.every((item) => item.comedian && item.time))
                ) {
                sendError(res, 400, 'Client booking not correct');
                return;
            }
            const clientData = await fs.readFile(CLIENTS, 'utf-8');
            const clients = JSON.parse(clientData);
            
            const clientIndex = clients.findIndex((c) => c.ticketNumber === ticketNumber)
            if ( clientIndex === -1) {
                sendError(res, 404, 'Not found');
            }

            clients[clientIndex] = {
                ...clients[clientIndex],
                ...updateDataClient
            }
            
            await fs.writeFile(CLIENTS, JSON.stringify(clients));

            sendData(res, updateDataClient);
        } catch (error) {
            console.error('Error: ', error);
        }
    })
}