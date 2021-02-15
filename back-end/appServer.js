const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const utilisateurRoute = require('./routes/utilisateur')

mongoose.set('useNewUrlParser', true);    //Permet de ne pas avoir de Deprecation Warning pour mongoDB
mongoose.set('useFindAndModify', false);  //Permet de ne pas avoir de Deprecation Warning pour mongoDB
mongoose.set('useCreateIndex', true);     //Permet de ne pas avoir de Deprecation Warning pour mongoDB

mongoose.connect('mongodb+srv://Manu:parisdescartes@clustermyh-blmzy.mongodb.net/test?retryWrites=true&w=majority', // Connecte le serveur à mongoDB
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(cors()); //Permet de faire des requêtes peu importe l'origine des requêtes

app.use(bodyParser.json()); //Transforme le body de la requête en format json

app.use('/utilisateur', utilisateurRoute); //Utilise les routes pour gérer les requêtes utilisateur

module.exports = app; 
