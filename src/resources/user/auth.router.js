import { Router } from 'express';
import { requestLogin, getUser } from './auth.controller';
import auth from './middleware/auth'
const router = Router();
import db from '../../models';

const User = db.User;
router
    .route('/')
    .post(requestLogin);
router.get('/', auth, async (req, res) => {
    try {
        // const user = await User.findById(req.user.id).select('-password')
        // console.log(req.user)
        const user = await User.findOne({ where: { id: req.user.id } })
        res.json({ username: user.username, id: user.id })
    } catch (err) {
        console.log((err.message));
        res.status(500).send('Server error');
    }
}
)

export default router;
