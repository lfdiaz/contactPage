const mongoose = require('mongoose');
const express = require('express');
const app = express();
const env = require('env').config();
const PORT = process.env.port || 8080;
const Student = require('./models/Student');
const nodemailer = require('nodemailer');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const MONGO_CONNECTION_STRING = 'mongodb://localhost:27017/';

mongoose.connect(MONGO_CONNECTION_STRING);

const connection = mongoose.connection;

connection.once("open", ()=> {
    console.log("we are connected to mongo ^_^");
    app.listen(PORT, ()=>{
        console.log('we are listening on', 8080);
    })
})

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'luisdiazc2@gmail.com',
        pass: process.end.PSWD
    }
})

app.post('/contact', (req, res) => {
    let name = req.body.name;
    let major = req.body.major;
    let city = req.body.city;
    let email = req.body.email;
    let phone = req.body.phone;
    let subject = name + " esta interesado en estudiar " + major;
    let text = "Nombre: " + name + "\nCarrera: " + major + "\nCiudad: " + city +"\nNumero telefonico: " + phone + "\nCorreo electronico: " + email + "\n"
    Student({
        name: name,
        major: major,
        city: city,
        email: email,
        phone: phone
    }).save().then( savedStudent => {
        let mailOptions = {
            from: 'luisdiazc2@gmail.com',
            to: 'acuita_10@hotmail.com',
            subject: subject,
            text: text
        }

        transporter.sendMail(mailOptions, (err, info) =>{
            if(err){
                res.send(err);
            }else{
                console.log('Email sent: ' + info.response);
            }
        })

        res.sendStatus(200);
    }).catch(err => {
        if(err){
            res.sendStatus(500).send(err);
        }
    })

})

app.get('*', (req, res) => {
    res.sendFile('index.html',{root: __dirname + './../build'});
});
