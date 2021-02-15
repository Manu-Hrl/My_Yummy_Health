const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const utilisateurSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    historiqueProduit: { type: Array, default: [] },
    maConsommation: { type: Array, default: []},
    mesFavoris: { type: Array, default: []},
    totalCalories: { type: Number, default:  0},
    kcalProfil: { type: Number, default: 2500 },
    Lun: { type: Number, default: 0 },
    Mar: { type: Number, default: 0 },
    Mer: { type: Number, default: 0 },
    Jeu: { type: Number, default: 0 },
    Ven: { type: Number, default: 0 },
    Sam: { type: Number, default: 0 },
    Dim: { type: Number, default: 0 },
    Sem: { type: Number, default: 0 },
    Sem2: { type: Number, default: 0 },
    Sem3: { type: Number, default: 0 },
    Sem4: { type: Number, default: 0 },
    Mois: { type: Number, default: 0 },
    Mois2: { type: Number, default: 0 },
    Mois3: { type: Number, default: 0 },
    Mois4: { type: Number, default: 0 },
    verifSemaine: { type: Number, default: 0 },
    verifMois: { type: Number, default: 0 },
    premiereConnexion: { type: Number, default: 0 },
    Noix: { type: Boolean, default: false },
    Lait: { type: Boolean, default: false },
    Gluten: { type: Boolean, default: false},
    Vegetarien: { type: Boolean, default: false},
    Age: { type: Number, default: 0 },
    Taille: { type: Number, default: 0 },
    Poids: { type: Number, default: 0 },
    Sexe: { type: Number, default: 2 },
    Lun_: { type: Number, default: 0 },
    Mar_: { type: Number, default: 0 },
    Mer_: { type: Number, default: 0 },
    Jeu_: { type: Number, default: 0 },
    Ven_: { type: Number, default: 0 },
    Sam_: { type: Number, default: 0 },
    Dim_: { type: Number, default: 0 },
    DebSem: { type: Number, default: 0 },
    NbrPas: { type: Number, default: 0 },
    PasAv: { type: Number, default: 0 },
    PasVoulu: { type: Number, default: 8000 }
});

utilisateurSchema.plugin(uniqueValidator); //Permet d'être sûr qu'un seul email est possible dans la BDD

module.exports = mongoose.model('UtilisateurSchema', utilisateurSchema);