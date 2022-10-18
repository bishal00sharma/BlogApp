const nodemailer = require("nodemailer")

const username = "angelica.greenholt28@ethereal.email"
const password = "3XehbJ3MGzGRXp4fqd"
const name = "Angelica Greenholt"

// Transport
const transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: username,
        pass: password
    },

})

transport.sendMail({
    to:"bishalsharmaece@gmail.com",
    from: "hello@facebook.com",
    subject: "Your account created successfully",
    text: "Thank you for signing up"
})
.then(() => {
    console.log("Email sent successfully")
})