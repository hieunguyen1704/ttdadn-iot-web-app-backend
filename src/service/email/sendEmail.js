const nodemailer = require('nodemailer');
module.exports = (email_arr, message, threshold,current) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ttdadn.hcmut.k2017.5h@gmail.com',
          pass: 'ttdadn123@'
        }
      });
      let email_list = email_arr.join(",");
      var mailOptions = {
          from: 'ttdadn.hcmut.k2017.5h@gmail.com',
          to: email_list,
          subject: 'Sào phơi đồ đã thay đổi trạng thái',
          html: `
          <h2>${message}</h2>
          <p>Ngưỡng đã thiết lập:</p>
          <ul>
            <li>Nhiệt độ: ${threshold.temp}°C</li>
            <li>Độ ẩm: ${threshold.humid}%</li>
            <li>Ánh sáng: ${threshold.light}</li>
          </ul>
          <p>Thông số hiện tại</p>
          <ul>
            <li>Nhiệt độ: ${current.temp}°C</li>
            <li>Độ ẩm: ${current.humid}%</li>
            <li>Ánh sáng: ${current.light}</li>
          </ul>
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
