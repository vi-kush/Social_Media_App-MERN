const nodeMailer = require('nodemailer');

const sendMail = (options) => {

    const transporter = nodeMailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        service: process.env.MAIL_SERVICE,
        secure: false,
        auth: {
           user: process.env.MAIL_EMAIL,
           pass:  process.env.MAIL_PASSWORD
        },
        debug: false,
        logger: true
    })

    const mailOptions = {
        from: process.env.MAIL_EMAIL,
        to: options.to,
        subject: options.subject,
        html: options.text
    }

    transporter.sendMail(mailOptions, function(err,info){
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    });

}

module.exports = sendMail;