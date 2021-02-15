import { token, serveur } from "../../Components/Connexion"
import { tokenDeconnexion } from "../../Components/Profil"

const initialState = { maConsommation: [] }

const AJOUT_CONSOMMATION='AJOUT_CONSOMMATION'
const SUPPRIME_CONSOMMATION='SUPPRIME_CONSOMMATION'
const VIDER_CONSOMMATION='VIDER_CONSOMMATION'
const CONNEXION_CONSOMMATION = 'CONNEXION_CONSOMMATION'

export default function modificationConsommation(state = initialState, action) {
    let nextState
    switch (action.type) {
        case AJOUT_CONSOMMATION: //Ajoute un produit à ma consommation
            nextState = {
                ...state,
                maConsommation:[action.value, ...state.maConsommation],
            }

            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour la consommation dans la base de données
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({maConsommation: nextState.maConsommation})
                })
            }

            return nextState
        case SUPPRIME_CONSOMMATION: //Supprime un produit de ma consommation
            const maConsommationIndex = state.maConsommation.findIndex(item => item.code_barre === action.value.code_barre) //Retrouve le produit grâce au code barre
            nextState = {
                ...state,
                maConsommation: state.maConsommation.filter((item, index) => index !== maConsommationIndex), //Retourne ma consommation sans le produit que l'on voulait supprimer
            }

            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour la consommation dans la base de données
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({maConsommation: nextState.maConsommation})
                })
            }

            return nextState
        case VIDER_CONSOMMATION: //Vide toute ma consommation
            nextState = {
                ...state,
                maConsommation: []
            }

            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour la consommation dans la base de données
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({maConsommation: nextState.maConsommation})
                })
            }

            return nextState
        case CONNEXION_CONSOMMATION:
            nextState = {
                ...state,
                maConsommation: [].concat(action.value)
            }
            return nextState
    default:
      return state
    }
  }