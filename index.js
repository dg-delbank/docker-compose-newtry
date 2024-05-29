const app = require('./src/server');
const os = require('os');
const mongoose = require('mongoose');

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

mongoose.connect('mongodb://mongo:27017/data', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://${ipAddress}:${PORT}`);
});