import db from '../../models';
import { Op } from 'sequelize';
const User = db.User;
export const GetUserInfoById = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const userInfo = await User.findAll({
      attributes: ['username', 'email','name','avatar','isNotification'],
      where: { id: currentUserId },
    });
    return res.status(200).json({ data: userInfo });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};
export const UpdateUserInfo = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const username = req.body.username;
    const email = req.body.email;
    const name = req.body.name;
    const avatar = req.body.avatar;
    const sameUserName = await User.findAll({
        where: 
        {id: { [Op.ne]: currentUserId } ,username: username }
        
    });
    if (sameUserName.length > 0) {
      return res.status(202).json({ data: 'Username is already taken' });
    }
    const sameEmail = await User.findAll({
      where: {id: { [Op.ne]: currentUserId }, email: email }
    });
    if (sameEmail.length > 0) {
      return res.status(202).json({ data: 'Email is already taken' });
    }
    await User.update(
      {
        username: username,
        email: email,
        name: name,
        avatar: avatar
      },
      {
        where: { id: currentUserId },
      }
    );
    return res.status(201).json({ data: 'Update successful' });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};
