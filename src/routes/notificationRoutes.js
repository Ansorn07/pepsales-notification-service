const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const User = require('../models/User');

const deliverNotification = async (notification, user, attempt = 1) => {
  try {
    if (Math.random() < 0.3 && attempt < 3) throw new Error('Random failure');
    console.log(`✅ Delivered ${notification.type} to ${user.email || user._id}: ${notification.message}`);
  } catch (err) {
    console.log(`❌ Attempt ${attempt} failed for ${notification.type} to ${user.email || user._id}`);
    setTimeout(() => deliverNotification(notification, user, attempt + 1), 1000);
  }
};

router.post('/', async (req, res) => {
  try {
    const { userId, type, message } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const notification = new Notification({ userId, type, message });
    await notification.save();
    deliverNotification(notification, user);

    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;