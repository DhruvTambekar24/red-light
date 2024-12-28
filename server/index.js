// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');

// // Create Express app and HTTP server
// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// // Store the current light state
// let currentLight = "green";

// // WebSocket logic
// wss.on('connection', (ws) => {
//     // Send the current light state to the newly connected participant
//     ws.send(JSON.stringify({ light: currentLight }));

//     console.log("New participant connected!");
// });

// // API endpoint for admin to toggle light
// app.get('/toggle/:light', (req, res) => {
//     const { light } = req.params;

//     if (light === "red" || light === "green") {
//         currentLight = light;

//         // Broadcast the new light state to all participants
//         wss.clients.forEach((client) => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(JSON.stringify({ light }));
//             }
//         });

//         res.send(`Light changed to ${light}`);
//     } else {
//         res.status(400).send("Invalid light value. Use 'red' or 'green'.");
//     }
// });

// // Serve static files for the client and admin
// app.use('/client', express.static('client'));
// app.use('/admin', express.static('admin'));

// // Start the server
// server.listen(3000, () => {
//     console.log("Server is running at http://localhost:3000");
// });
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let currentLight = "green"; // Initial state

wss.on('connection', (ws) => {
    // Send the current light status to the newly connected client
    ws.send(JSON.stringify({ light: currentLight }));

    console.log("New participant connected!");
});

// Endpoint for toggling light
app.get('/toggle/:light', (req, res) => {
    const { light } = req.params;

    if (light === "red" || light === "green") {
        currentLight = light;

        // Broadcast the new state to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ light }));
            }
        });

        res.send(`Light changed to ${light}`);
    } else {
        res.status(400).send("Invalid light value. Use 'red' or 'green'.");
    }
});

// Serve static files
app.use('/client', express.static(__dirname + '/../client'));
app.use('/admin', express.static(__dirname + '/../admin'));

// Start server
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
