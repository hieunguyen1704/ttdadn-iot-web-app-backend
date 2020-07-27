import db from '../../models';
const User = db.User;
const generator = require('generate-password');
const bcrypt = require('bcrypt');
const sendEmailResetPass = require('../../service/email/sendEmailResetPass');
const linkLogin = "http://localhost:1234/login";
export const resetPassword =  async(req, res) =>{
    try {
        const userEmail = req.body.email;
        const user = await User.findOne({where: {email: userEmail}});
        if(!user){
            return res.status(202).json({
                isSuccess : false,
                message: "Email Not Found"
            });
        }
        const newPassword = generator.generate({
            length: 10,
            numbers: true,
        });
        //update password
        const SALT_FACTOR = 8;
        const newPassHash = await bcrypt.hash(newPassword, SALT_FACTOR);
        await User.update(
          {
            password: newPassHash,
          },
          {
            where: { email: userEmail },
          }
        );
        //get current time
        const currentTime = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
        });
        sendEmailResetPass(userEmail,user.username,newPassword,currentTime,linkLogin);
        return res.status(200).json({
            isSuccess: true,
            message: "Please wait email and get new password"});
    } catch (error) {
        return res.status(400).json({ error: error.message});
    }
}