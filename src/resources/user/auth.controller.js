import db from '../../models';
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
// const config = require('../../config/config').get(process.env.NODE_ENV)
const User = db.User;

export const getUser = async (req, res) => {
    try {
        // const user = await User.find(req.user.id).select('-password')
        const user = await User.findOne({ where: { id: req.user.id } })
        res.json(user)
    } catch (err) {
        console.log((err.message));
        res.status(500).send('Server error');
    }
}
export const requestLogin = async (req, res) => {
    const body = req.body
    try {
        const { username, password } = body
        let user = await User.findOne({ where: { username: username } })

        if (!user) {
            return res.status(400).json({
                msg: 'Account does not exist'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                msg: 'Password incorrect. Please try again'
            })
        }
        const payload = {
            user: {
                id: user.id,
                username: user.username
            }
        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) {
                    throw err;
                }
                return res.status(200).json({ token })
            }
        )
        // return res.status(200).json({ id: user.id })
    }
    catch (error) {
        console.error(error.message);
        return res.status(400).json({ error: error.message });
    }
};
