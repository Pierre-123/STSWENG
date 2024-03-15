const { Router } = require('express'); 
const router = Router();
const User = require('../database/schemas/User');
const Message = require('../database/schemas/Messages');

router.get('/', async (req, res) => {
    try {
        // Assuming you have stored the current user's ID in the session
        const currentUserId = req.session.userId;

        // Find the user from the database based on the current user's ID
        const currentUser = await User.findById(currentUserId);

        if (!currentUser) {
            return res.status(404).send('User not found');
        }

        // Retrieve messages where the current user is either the sender or receiver
        const messages = await Message.find({
            $or: [
                { sender: currentUserId },
                { receiver: currentUserId }
            ]
        }).populate('sender receiver').exec();

        res.render('messages', { messages: messages, title: "Messages" });
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;