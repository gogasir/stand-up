import http from 'node:http';
import fs from 'node:fs/promises';
import { sendError } from './modules/send.js';
import { checkFiles } from './modules/checkFile.js';
import { handleComediansRequest } from './modules/handleComediansRequest.js';
import { handleAddClient } from './modules/handleAddClient.js';
import { handleGetClient } from './modules/handleGetClient.js';
import { handleUpdateClient } from './modules/handleUpdateClient.js';

const COMEDIANS = './comedians.json';
export const CLIENTS = './clients.json';

const startServer = async () => {
    if (!(await checkFiles(COMEDIANS, false))) {
        console.log("Exit!")
        return;
    }

    await checkFiles(CLIENTS, true);
    const comediansData = await fs.readFile(COMEDIANS, 'utf8');
    const comedians = JSON.parse(comediansData);


    http.createServer(async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const segments = req.url.split('/').filter(Boolean);
         
        if (req.method === 'GET' && segments[0] === 'comedians') {
            handleComediansRequest(req, res, comedians, segments)
            return;
        } 
        
        if (req.method === 'POST' && segments[0] === 'clients' ) {
            handleAddClient(req, res)
            return;
        }

        if (req.method === 'GET' &&
            segments[0] === 'clients' &&
            segments.length === 2
        ) {
            const ticketNumber = segments[1];
            handleGetClient(req, res, ticketNumber);
            return;
        }

        if (req.method === 'PATCH' &&
            segments[0] === 'clients' &&
            segments.length === 2
        ) {
            const ticketNumber = segments[1];
            handleUpdateClient(req, res, segments[1]);
            return;
        }

        sendError(res, 404, "Not found")

    }).listen(3175)
    console.log("Server start 🚀. http://localhost:3175 👽")
}
startServer();
