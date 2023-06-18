const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

const router = express.Router();
const app = express();
app.use(express.json());
// Import the MongoClient class and generate a client from an SRV connection string

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://manav:manav@cluster0.j71ahjt.mongodb.net/jobInternships?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB cluster
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB Connected!')) 
.catch(err => {
console.log(`DB Connection Error: ${err.message}`);
});

const internsips = new mongoose
.Schema({
    title: String,
    company: String,
    description: String,
    stipend : String,
    location: String,
    duration: String,
    applyLink: String,
    applyBy: String,

});

const Internship = mongoose.model('Internship', internsips);

//post new internship
router.post('/internship', (req, res) => {
    const newInternship = new Internship(req.body);
    newInternship.save()
      .then(internship => res.status(201).json(internship))
      .catch(error => res.status(500).json({ error: error.message }));
    });
   

  











//server is working on 
app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
