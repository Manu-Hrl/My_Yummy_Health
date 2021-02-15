import { token, serveur } from "../../Components/Connexion"
import { tokenDeconnexion } from "../../Components/Profil"


const initialState = { historiqueProduits: [], historiqueRecherche: [] }

const CONNEXION_HISTORIQUE = 'CONNEXION_HISTORIQUE'
const AJOUT_HISTORIQUE='AJOUT_HISTORIQUE'
const SUPPRIME_HISTORIQUE='SUPPRIME_HISTORIQUE'
const VIDER_HISTORIQUE='VIDER_HISTORIQUE'
const RECHERCHE_HISTORIQUE='RECHERCHE_HISTORIQUE'

export default function modificationHistorique(state = initialState, action) {
    let nextState
    switch (action.type) {
        case AJOUT_HISTORIQUE: //Ajoute un produit à l'historique
            const historiqueProduitAjoutIndex = state.historiqueProduits.findIndex((item) => item.code_barre === action.value.code_barre) //Retrouve le produit grâce au code barre
            if (historiqueProduitAjoutIndex !== -1) //Permet de ne pas avoir de doublon dans l'historique
            {
                return state
            }

            nextState = {
                ...state,
                historiqueProduits: [action.value, ...state.historiqueProduits],
                historiqueRecherche: [action.value, ...state.historiqueRecherche]
            }

            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Permet de mettre à jour l'historique dans la base de données
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({historiqueProduit: nextState.historiqueProduits})
                })
            }

            return nextState
        case SUPPRIME_HISTORIQUE: //Supprimer un produit de l'historique
            const historiqueProduitSuppIndex = state.historiqueProduits.findIndex(item => item.code_barre === action.value.code_barre) //Retrouve le produit grâce au code barre
            nextState = {
                ...state,
                historiqueProduits: state.historiqueProduits.filter((item, index) => index !== historiqueProduitSuppIndex), //Retourne l'historique sans le produit que l'on voulait supprimer
                historiqueRecherche: state.historiqueRecherche.filter((item, index) => index !== historiqueProduitSuppIndex)
            }

            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Permet de mettre à jour l'historique dans la base de données
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({historiqueProduit: nextState.historiqueProduits})
                })
            }

            return nextState
        case VIDER_HISTORIQUE: //Vide tout l'historique
            nextState = {
                ...state,
                historiqueProduits: [],
                historiqueRecherche: []
            }

            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Permet de mettre à jour l'historique dans la base de données
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({historiqueProduit: nextState.historiqueProduits})
                })
            }

            return nextState
        case RECHERCHE_HISTORIQUE:
            if (action.value === '') {
                nextState = {
                    ...state,
                    historiqueProduits: [...state.historiqueRecherche]
                }
            } else {

                if (state.historiqueProduits.length === 0) { //Permet de remettre les produits dans l'historique lorsqu'on a déjà fait une recherche qui retournait un tableau historique vide
                    state.historiqueProduits = state.historiqueRecherche
                }

                nextState = {
                    ...state,
                    historiqueProduits: state.historiqueProduits.filter(produit => action.value.toUpperCase() === produit.nom_produit.toUpperCase() )
                }
            }
            
            return nextState
        case CONNEXION_HISTORIQUE: 
            nextState = {
                ...state,
                historiqueProduits: [].concat(action.value)
            }
            return nextState    
    default:
      return state
    }
  }