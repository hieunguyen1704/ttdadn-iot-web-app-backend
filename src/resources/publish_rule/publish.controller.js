import {publish} from '../../service/client/publish';
export const PublishData = (req, res) => {
    try {
    //   const isAuto = req.user.isAuto;
        const isAdmin = req.user.isAdmin;
        if(isAdmin){
            const message = publish("Hello World"); 
            return res.status(200).json({ data: message});
          }else{
            return res.status(200).json({ data: "publish denied"});
          }

    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  };