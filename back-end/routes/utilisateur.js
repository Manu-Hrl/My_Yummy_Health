const express = require('express')
const utilisateurCtrl = require('../controllers/utilisateur')
const router = express.Router();
const auth = require('../middleware/authentification') //Permet de savoir si l'authentification a été faite


router.post('/inscription', utilisateurCtrl.inscription) //Inscrit un utilisateur

router.post('/connexion', utilisateurCtrl.connexion) //Connecte un utilisateur

router.get('/trouver', auth, utilisateurCtrl.findUtilisateur); //Affiche un utilisateur en particulier de la BDD

router.put('/update', auth, utilisateurCtrl.updateUtilisateur); //Met à jour un utilisateur de la BDD

router.delete('/delete', auth,  utilisateurCtrl.deleteUtilisateur); //Supprime un utilisateur de la BDD

router.get('/', utilisateurCtrl.showAllUtilisateur) //Affiche tout les utilisateurs de la BDD

module.exports = router