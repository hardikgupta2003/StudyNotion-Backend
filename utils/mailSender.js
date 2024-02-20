const nodemailer = require("nodemailer")

const mailSender = async (email,title,body)=>{
    try{
        let transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER, // generated ethereal user
                pass: process.env.MAIL_PASS // generated ethereal password
            }
        });
        
        let info = await transporter.sendMail({
            from: `"StudyNotion" <${process.env.MAIL_USER}>`, // sender address
            to:`${email}`,                       // list of receivers
            subject: `${title}`,                   // Subject line
            html: `${body}`,                     // plain text body
            
        })

        return `Message sent: ${info.messageId}`;
    }catch(error){
        console.log(`Error sending message: ${error}`)
    }
}
module.exports=mailSender;