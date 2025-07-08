const express = require("express");
const path = require("path");
const app = express();
const bodyparser=require("body-parser")
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
    console.log("connected to mongodb")
}
const port = 8000;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});

const Contact = mongoose.model('Contact', contactSchema);


//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));//for serving static files
app.use(express.urlencoded({ extended: true }));

//PUG SPECIFIC STUFF
app.set('view engine', 'pug');//set template engine as pug
app.set('views', path.join(__dirname, 'views'));//set the views directory

//ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res) => {
    const myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("item has saved to database")
    }).catch(()=>{
        res.status(400).send("item was not saved to database")
    });
    // res.status(200).render('contact.pug');
});

//start the server
app.listen(port, () => {
    console.log(`✅ this application is running on port ${port}`);
});