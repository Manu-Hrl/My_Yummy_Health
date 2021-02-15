import { token, serveur } from "../../Components/Connexion"
import { tokenDeconnexion } from "../../Components/Profil"

const initialState = { mesFavoris: [] }

const AJOUT_FAVORIS='AJOUT_FAVORIS'
const VIDER_FAVORIS='VIDER_FAVORIS'
const CONNEXION_FAVORIS='CONNEXION_FAVORIS'

export default function modificationFavoris(state = initialState, action) {
    let nextState
    switch (action.type) {
        case AJOUT_FAVORIS: //Ajoute un produit à mes favoris

        const favorisAjoutIndex = state.mesFavoris.findIndex((item) => item.code_barre === action.value.code_barre) //Retrouve le produit grâce au code barre
        if (favorisAjoutIndex !== -1) //Permet de supprimer le produit des favoris s'il si trouve déjà
        {
            action.value.couleur_favoris = 'black' //transforme le coeur en noir

            nextState = {
                ...state,
                mesFavoris: state.mesFavoris.filter((item, index) => index !== favorisAjoutIndex), //Retourne mes favoris sans le produit que l'on voulait supprimer
            }

            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les favoris
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({mesFavoris: nextState.mesFavoris})
                })
            }
            return nextState
        }

        action.value.couleur_favoris = 'red' //transforme la coeur en rouge

        nextState={
            ...state,
            mesFavoris: [action.value,...state.mesFavoris]
        }

        if ((token !== 0) && !tokenDeconnexion) {
            fetch(serveur+'/utilisateur/update', { //Met à jour les favoris
                method: 'PUT',
                headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                body: JSON.stringify({mesFavoris: nextState.mesFavoris})
            })
        }

        return nextState
        case VIDER_FAVORIS: //Supprime tout les favoris
            nextState = {
                ...state,
                mesFavoris: []
            }

            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les favoris
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({mesFavoris: nextState.mesFavoris})
                })
            }

            return nextState
        case CONNEXION_FAVORIS:
            nextState = {
                ...state,
                mesFavoris: [].concat(action.value)
            }

            return nextState
        default:
            return state
    }
}