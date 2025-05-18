require('dotenv').config();
const { consumeQueue } = require('./services/queueService');

consumeQueue();
