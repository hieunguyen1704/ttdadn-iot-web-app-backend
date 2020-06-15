import {publish} from '../../service/client/publish';
import db from '../../models';
export const PublishData = async (req, res) => {
    try {
        const user = await db.User.findOne({ where: { id: req.user.id } });
        const {isAdmin,isAuto} = user;
        if(isAdmin && !isAuto){
            publish(); 
            return res.status(200).json({ data: "publish successful"});
        }
        else{
            return res.status(200).json({ data: "publish denied"});
        }
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  };