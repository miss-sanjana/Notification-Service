// const express = require('express');
// const mongoose = require('mongoose');
// const notificationRoutes = require('./routes/notificationRoutes');
// const app = express();

// app.use(express.json());
// app.use('/api', notificationRoutes);

// mongoose.connect('mongodb://localhost:27017/notificationsDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('MongoDB connected');
// }).catch(err => {
//   console.error('MongoDB connection error:', err);
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



// server.js
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notificationsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
