import { Router } from 'express';
import { requestLogin, getUser } from './auth.controller';
import auth from './middleware/auth'
const router = Router();
import db from '../../models';
import authAdmin from './middleware/admin';
const User = db.User;
router
    .route('/')
    .post(requestLogin);
router.get('/', auth, async (req, res) => {
    try {
        // const user = await User.findById(req.user.id).select('-password')
        // console.log(req.user)
        const user = await User.findOne({ where: { id: req.user.id } })
        const userAdmin = await User.findOne({ where: { isAdmin: true } })

        res.status(200).json({ username: user.username, id: user.id, isAuto: user.isAuto, isAdmin: user.isAdmin, autoOfAdmin: userAdmin.isAuto })
    } catch (err) {
        console.log((err.message));
        res.status(500).send('Server error');
    }
}
)

router.post('/configAuto', authAdmin, async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await User.findOne({ where: { id: userID } });
        const isAuto = user.isAuto;
        if (isAuto == true) {
            user.isAuto = false;
        }
        else {
            user.isAuto = true;
        }
        await user.save();
        res.status(200).json({ username: user.username, id: user.id, isAuto: user.isAuto, isAdmin: user.isAdmin })
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ msg: 'Server error' })
    }
}
)

export default router;
