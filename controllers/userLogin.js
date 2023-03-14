const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ error: "Invalid email address !" });
        }

        const verifyPass = await bcryptjs.compare(password, user.password);

        if (!verifyPass) {
            return res.status(400).json({ error: "Invalid password !" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ message: "User Login success !", id: user._id, token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = Login;