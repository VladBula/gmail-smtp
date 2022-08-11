const express = require('express')
const nodemailer = require("nodemailer")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
//const port = process.env.PORT || 8080
const port = 3010

app.use(cors())


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const smtp_login = process.env.SMTP_LOGIN || "---"
const smtp_password = process.env.SMTP_PASSWORD || "---"

const transporter = nodemailer.createTransport({
    host: "gmail",
    port: 587,
    secure: false,
    auth: {
        // user: smtp_login,
        // pass: smtp_password,
        user: 'vladbulynk@gmail.com',
        pass: "khfjnslrjittlgbd"
    }, tls: {
        rejectUnauthorized: false
    }
});


app.post('/sendMessage', async (req, res) => {
    const {message, email, name} = req.body;

    await transporter.sendMail({
        from: '"Портфолио 👻" <foo@example.com>',
        to: `vladbulynk@gmail.com`,
        subject: "gmail",
        html: `<b>Сообщения с вашего портфолио</b>
                <h2> ${name}</h2>
                <h3> ${email}</h3>
                <p>${message}</p>`,
    });
    res.send("ok")
})

app.get('/', (req, res) => {
    res.send('Hello!')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})