const UtilisateurSchema = require('../models/Utilisateur');
const bcrypt = require('bcrypt') //Librairie qui permet de hasher les password
const jwt = require('jsonwebtoken') //Librairie qui permet de créer des token d'authentification

exports.inscription = (req, res, next) => { //Permet à un utilisateur de s'inscrire
  bcrypt.hash(req.body.password, 10) //Hash le password
  .then(hash => {
    const utilisateur = new UtilisateurSchema({
      email: req.body.email,
      password: hash
    });

    utilisateur.save()
      .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
      .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
}

exports.connexion = (req, res, next) => { //Permet à un utilisateur de se connecter
  UtilisateurSchema.findOne({ email: req.body.email })
    .then(user => { //"user" est l'utilisateur trouvé dans la BDD
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) //Compare le password de la requête avec le password hashé
        .then(valid => { //"valid" est un booléan, vrai si password identique, faux sinon
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign( //Création d'un token d'authentification
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}

exports.findUtilisateur = (req, res, next) => { //Retrouve un utilisateur en particulier dans la BDD
  UtilisateurSchema.findOne({ _id: req.params.id })
  .then(utilisateurSchema => res.status(200).json(utilisateurSchema))
  .catch(error => res.status(404).json({ error }));
}

exports.updateUtilisateur = (req, res, next) => { //Met à jour un utilisateur en particulier dans la BDD
  UtilisateurSchema.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteUtilisateur = (req, res, next) => { //Supprime un utilisateur en particulier dans la BDD
  ProduitSchema.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.showAllUtilisateur = (req, res, next) => { //Affiche tout les utilisateurs de la BDD
  UtilisateurSchema.find()
    .then(utilisateurSchema => res.status(200).json(utilisateurSchema))
    .catch(error => res.status(400).json({ error }));
}