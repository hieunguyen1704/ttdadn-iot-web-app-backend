import db from '../../models';

const User = db.User;

export const createUser = async (req, res) => {
  const body = req.body;
  try {
    await User.create({ ...body });
    return res.status(201).json({ data: 'success' });
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
