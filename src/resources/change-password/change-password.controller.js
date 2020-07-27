import db from '../../models';
const User = db.User;
const bcrypt = require('bcrypt');
export const changePassword = async (req, res) => {
  try {
    const currentPass = req.body.currentPass;
    const newPass = req.body.newPass;
    const confirmPass = req.body.confirmPass;
    const currentUserId = req.user.id;
    const userPass = await User.findOne({
      attributes: ['password'],
      where: { id: currentUserId },
    });
    const isMatch = await bcrypt.compare(currentPass, userPass.password);
    if (!isMatch) {
      return res.status(202).json({ data: 'Password is incorrect' });
    }
    if (newPass.length < 6) {
      return res
        .status(202)
        .json({ data: 'Password must have at least 6 character' });
    }
    if (newPass !== confirmPass) {
      return res.status(202).json({ data: "Password doesn't match" });
    }
    const SALT_FACTOR = 8;
    const newPassHash = await bcrypt.hash(newPass, SALT_FACTOR);
    await User.update(
      {
        password: newPassHash,
      },
      {
        where: { id: currentUserId },
      }
    );
    return res.status(201).json({ data: 'Change Password Successful' });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};
