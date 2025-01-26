const http = require("node:http");

const PORT = 1111;

const server = http.createServer((req, res) => {
    if(req.url === '/about') {
        return res.end(`Hello from about page`);
    }
    return res.end(`Hello http server`);
});


server.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});