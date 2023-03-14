const User = require('../models/userModel');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Registration = async (req, res) => {
    const { name, email, password, vCode } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All field required !" });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Email is not valid !" });
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: "Password is not strong !" });
    }
    try {
        const oldUser = await User.findOne({email});
        if (oldUser) {
            return res.status(400).json({ error: "Email in use !" });
        }
        const salt = await bcryptjs.genSalt(Number(process.env.SALT));
        const passwordHash = await bcryptjs.hash(password, salt);

        const user = await User.create({
            name, email, password: passwordHash, vCode
        })
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ message: "User registration success !", id: user._id, token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = Registration;