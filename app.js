const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

app.use('/api', userRoutes);
app.use('/api', notificationRoutes);

// Swagger Documentation
try {
  const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  console.log('✅ Swagger UI is available at /api-docs');
} catch (error) {
  console.error('❌ Failed to load Swagger documentation:', error.message);
}

// Test Route
app.get('/', (req, res) => {
  res.send('🚀 Notification Service is running!');
});

module.exports = app;
