import http from 'node:http';
import fs from 'node:fs/promises';


http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/comedians') {
        try {
            const data = await fs.readFile("comedians.json", 'utf8')
            res.writeHead( 200, {
                "Content-Type": "text/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            })
            res.end(data)
        } catch (error) {
            res.writeHead(500, {
                "Content-Type": "text/text; charset=UTF-8",
            });
            res.end(`Server error: ${ error }`)
        }
    } else {
        res.writeHead(404);
        res.end("Not found")
    }

    
}).listen(3175)
console.log("Server start. http://localhost:3175")