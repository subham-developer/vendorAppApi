import express from "express";
const app = express();
import bodyParser from "body-parser";
import upload from './config/uploadImg.js';
import 'dotenv/config';
import ExcelJs from "exceljs";
import PDFDocument from "pdfkit";
import fs from "fs";
import routes from './Routes/index.js';
import { connectDB } from "./config/db.js";

connectDB();


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req, res)=>{
    console.log("Hello");
    res.send('Hello URL')
});

app.post('/uploadImage', upload.single('profileImage'), function (req, res, next) {
    // req.file is the `avatar` file
    console.log(req.file);
    console.log(req.file.mimetype);
    console.log(req.file.mimetype.split('/'));
    console.log(req.file.filename);
    // req.body will hold the text fields, if there were any
    res.send('File Uploaded Successfully......!!!!!');
  })


app.use('/api', routes);
// app.use('/users', (req, res)=>{
//     console.log(req.body);
// });


app.listen(process.env.PORT,()=>{
    console.log(`Listinning on port ${process.env.PORT}.....!`);
})