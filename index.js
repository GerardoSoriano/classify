"use strict";

const fs = require('fs');
const http = require('http'); 

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, Kody.js!\n');
});

// Specify the file path
const filePath = './data.json'; 

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    
    //  read from the file asynchronously
    const filePath = './data.json'; 

    fs.readFile(filePath, 'utf8', (err, fileContent) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // Process the file content or perform any necessary setup
        console.log('File content:');
        console.log(fileContent);
    });


});