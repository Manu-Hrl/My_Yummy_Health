import { token, serveur } from "../../Components/Connexion"
import { tokenDeconnexion } from "../../Components/Profil"

const initialState = {
Noix:"false",Lait:"false",Gluten:"false",Vegetarien:"false",
Age:0,Taille:0,Poids:0,Sexe:2
}

const ALLERGIE_NOIX = 'ALLERGIE_NOIX'
const ALLERGIE_LAIT = 'ALLERGIE_LAIT'
const ALLERGIE_GLUTEN = 'ALLERGIE_GLUTEN'
const CONNEXION_ALLERGIE = 'CONNEXION_ALLERGIE'
const MANGE_VEGETARIEN = 'MANGE_VEGETARIEN'
const CHOIX_SEXE = 'CHOIX_SEXE'
const CHOIX_AGE = 'CHOIX_AGE'
const CHOIX_TAILLE = 'CHOIX_TAILLE'
const CHOIX_POIDS = 'CHOIX_POIDS'
const REINIT_INFO = 'REINIT_INFO'

export default function infoConso(state = initialState, action) {

let nextState

switch (action.type) {
    case ALLERGIE_GLUTEN:
            nextState = {
                ...state,
                Gluten: action.value
            }
            if ((token !== 0) && !tokenDeconnexion){
                fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({Gluten: nextState.Gluten})
                })
            }
            return nextState  
    case ALLERGIE_NOIX:
            nextState = {
                ...state,
                Noix: action.value
            }
            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({Noix: nextState.Noix})
                })
            }
            return nextState
    case ALLERGIE_LAIT:
            nextState = {
                ...state,
                Lait: action.value
            }
            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({Lait: nextState.Lait})
                })
            }
            return nextState
    case MANGE_VEGETARIEN:
            nextState = {
                ...state,
                Vegetarien: action.value
            }
            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({Vegetarien: nextState.Vegetarien})
                })
            }
            return nextState
    case CHOIX_AGE:
            nextState = {
                ...state,
                Age: action.value
                }
                if ((token !== 0) && !tokenDeconnexion) {
                    fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                        method: 'PUT',
                        headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                        body: JSON.stringify({Age: nextState.Age})
                    })
                }
                return nextState
    case CHOIX_POIDS:
            nextState = {
                ...state,
                Poids: action.value
            }
            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({Poids: nextState.Poids})
                })
            }
            return nextState
    case CHOIX_SEXE:
            nextState = {
                ...state,
                Sexe: action.value
            }
            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({Sexe: nextState.Sexe})
                })
            }
            return nextState
    case CHOIX_TAILLE:
            nextState = {
                ...state,
                Taille: action.value
            }
            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({Taille: nextState.Taille})
                })
            }
            return nextState
    case CONNEXION_ALLERGIE:
            nextState = {
                ...state,
                Gluten: action.value.Gluten,
                Noix: action.value.Noix,
                Lait: action.value.Lait,
                Vegetarien: action.value.Vegetarien,
                Age: action.value.Age,
                Taille: action.value.Taille,
                Poids: action.value.Poids,
                Sexe: action.value.Sexe
            }
            return nextState
    case REINIT_INFO:
            nextState= {
                ...state,
                Noix:"false",
                Lait:"false",
                Gluten:"false",
                Vegetarien:"false",
                Age:0,
                Taille:0,
                Poids:0,
                Sexe:2
            }

            return nextState
    default:
            return state
}
}