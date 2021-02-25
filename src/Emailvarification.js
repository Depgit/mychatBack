var nodemailer = require('nodemailer');
const isOkEmail = async (targetEmail, name) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rayvivek080@gmail.com',
            pass: 'Vive@123'
        }
    });
    const randomInt = () => {
        let low = 100000, high = 999999;
        return Math.floor(Math.random() * (high - low + 1) + low);
    }
    let val = randomInt();
    var mailOptions = {
        from: 'rayvivek080@gmail.com',
        to: targetEmail,
        subject: 'facebook email varification by Node js',
        text: `Hi ${name}, i am owner of this beautiful website name:  vivek kumar ray
        or your email varification OTP is : ${val} welcome to my family`
    };
    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {console.log(err);}
        else { console.log('Email sent: ', + info.response); }
    });
    return val;
}

module.exports = isOkEmail;