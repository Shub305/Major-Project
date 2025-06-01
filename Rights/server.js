const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = 'mongodb+srv://RightsQuest:uOCDMNVau49A8Dx7@rightsquest.blhpbna.mongodb.net/';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const user = new User({ firstName, lastName, email, password });
        await user.save();
        res.status(200).json({ message: 'User registered successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: 'Incorrect password.' });
        }

        res.status(200).json({ message: 'Login successful.' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
