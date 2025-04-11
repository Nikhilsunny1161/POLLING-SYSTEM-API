const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://nikhil:11610571@cluster0.cbmfz.mongodb.net/polling_system_api?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ DB connection error:', err));

// Routes
app.use('/questions', require('./routes/questionRoutes'));
app.use('/options', require('./routes/optionRoutes'));

// Root route
app.get('/', (req, res) => {
    res.send('🎉 Polling System API is running!');
});

// Server
app.listen(9000, () => console.log('🚀 Server running at http://localhost:9000'));