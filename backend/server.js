
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const notificationRoutes = require('./routes/notifications');
// const eventRoutes = require('./routes/eventRoutes');

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log('MongoDB connection error:', err));

// app.use('/api/events', eventRoutes);
// app.use('/api/notifications', notificationRoutes);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const notificationRoutes = require('../routes/notifications');
const eventRoutes = require('../routes/eventRoutes');

const app = express();
app.use(cors());
app.use(express.json());

let isConnected = false;
async function connectToDatabase() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = true;
  }
}

app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

app.use('/api/events', eventRoutes);
app.use('/api/notifications', notificationRoutes);

// Do NOT use app.listen() in Vercel
module.exports = app;
