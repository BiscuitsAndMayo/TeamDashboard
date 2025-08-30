const express = require("express");
const fs = require("fs");
const https = require("https");
const path = require("path");
const send = require("send");

const app = express();

// SSL options (optional)
const sslOptions = {
  key: process.env.SSL_KEY_FILE ? fs.readFileSync(process.env.SSL_KEY_FILE) : undefined,
  cert: process.env.SSL_CRT_FILE ? fs.readFileSync(process.env.SSL_CRT_FILE) : undefined,
};

// Serve static files from /static
app.use("/static", express.static(path.join(__dirname, "static"))); // <-- static under src/

// Serve dashboard HTML for root
app.get("/", (req, res) => {
  send(req, path.join(__dirname, "views", "dashboard.html")).pipe(res);
});

// Serve dashboard for Teams tab
app.get("/tab", (req, res) => {
  send(req, path.join(__dirname, "views", "dashboard.html")).pipe(res);
});

// Port
const port = process.env.PORT || 3333;

// Start server
if (sslOptions.key && sslOptions.cert) {
  https.createServer(sslOptions, app).listen(port, () => {
    console.log(`Express server listening on HTTPS port ${port}`);
  });
} else {
  app.listen(port, () => {
    console.log(`Express server listening on HTTP port ${port}`);
  });
}
