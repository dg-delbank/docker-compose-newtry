const app = require('./src/server');
const os = require('os');

const PORT = process.env.PORT || 3000;

const networkInterfaces = os.networkInterfaces();
let ipAddress = '';

Object.keys(networkInterfaces).forEach((interfaceName) => {
    networkInterfaces[interfaceName].forEach((iface) => {
        if (iface.family === 'IPv4' && !iface.internal) {
            ipAddress = iface.address;
        }
    });
});

if (!ipAddress) {
    ipAddress = 'localhost';
}

app.listen(PORT, () => {
  console.log(`Server is running at http://${ipAddress}:${PORT}`);
});