import db from '../../models';
const User = db.User;
export const toggleNotification = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const isNotification = await User.findOne({
      attributes: ['isNotification'],
      where: { id: currentUserId },
    });
    let result = isNotification.isNotification;
    if (isNotification.isNotification == true) {
      //turn off
      result = false;
      await User.update(
        {
          isNotification: result,
        },
        {
          where: { id: currentUserId },
        }
      );
    } else {
      //turn on
      result = true;
      await User.update(
        {
          isNotification: result,
        },
        {
          where: { id: currentUserId },
        }
      );
    }
    return res.status(200).json({data: result})
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};
