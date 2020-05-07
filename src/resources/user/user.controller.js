import db from '../../models';
const bcrypt = require('bcrypt');
// const jwt = require("jsonwebtoken")
const User = db.User;

export const createUser = async (req, res) => {
  let body = req.body;

  try {
    console.log()
    let checkusername = await User.findOne({ where: { username: body.username } })

    if (checkusername) {
      return res.status(201).json({
        error: 'User already exist'
      })
    }

    let checkemail = await User.findOne({ where: { email: body.email } })

    if (checkemail) {
      return res.status(201).json({
        error: 'Email has been registered'
      })
    }

    const { username, email, password } = body
    const passwordencrypt = await bcrypt.hashSync(body.password, 10)
    body.password = passwordencrypt
    let newUser1 = User.create(body)
    return res.status(200).json({ id: newUser1.id })
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const users = await User.findByPk(id);
    return res.status(200).json({ data: users });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ error: error.message });
  }
};
