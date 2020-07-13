const nodemailer = require('nodemailer');
module.exports = (email, username, newPassword, currentTime,loginLink) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ttdadn.hcmut.k2017.5h@gmail.com',
          pass: 'ttdadn123@'
        }
      });
      var mailOptions = {
          from: 'ttdadn.hcmut.k2017.5h@gmail.com',
          to: email,
          subject: 'Cập nhật mật khẩu mới',
          html: `
          <h3>Xin chào, <strong>${username}</strong></h3>
          <p>Mật khẩu mới của bạn là: <strong>${newPassword}</strong></p>
          <p>Mật khẩu của bạn đã được cập nhật vào lúc: <strong>${currentTime}</strong></p>
          <span>Tiến hành đăng nhập lại tại đây</span>: <a href="${loginLink}">Đăng nhập</a>
          `
        }
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
