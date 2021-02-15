import { token, serveur } from "../../Components/Connexion"
import { tokenDeconnexion } from "../../Components/Profil"

const initialState = { 

    totalCalories: 0, kcalProfil:2500, 
    Lun:0, Mar:0,Mer:0,Jeu:0,Ven:0,Sam:0,Dim:0,
    Sem:0, Sem2:0,Sem3:0,Sem4:0,
    Mois:0, Mois2:0,Mois3:0,Mois4:0,
    verifSemaine:0,verifMois:0,premiereConnexion:0,
    
}

const AJOUT_CALORIES = 'AJOUT_CALORIES'
const SUPPRIME_CALORIES = 'SUPPRIME_CALORIES'
const INIT_CALORIES = 'INIT_CALORIES'
const REINIT_KCALPROFIL = 'REINIT_KCALPROFIL'
const REINIT_SEM ='REINIT_SEM'
const REINIT_MOIS='REINIT_MOIS'
const MODIFICATION_KCALPROFIL='MODIFICATION_KCALPROFIL'
const CONNEXION_CALORIES = 'CONNEXION_CALORIES'
const INIT_MOIS = 'INIT_MOIS'
const REINIT_TOTALCALORIES = 'REINIT_TOTALCALORIES'



export default function totalCalories(state = initialState, action) {
    let nextState
    let day = new Date().getDay();

    switch (action.type) {
        case AJOUT_CALORIES:
              switch(day){
                  case 0:
                     nextState = {
                            ...state,
                            totalCalories: state.totalCalories + action.value,
                            Dim: state.Dim+ action.value,
                            Sem: state.Lun + state.Mar + state.Mer + state.Jeu + state.Ven + state.Sam + state.Dim + action.value,
                            Mois: state.Sem + action.value,
                            verifSemaine:1,
                            
                        }
                        if ((token !== 0) && !tokenDeconnexion) {
                            fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                                method: 'PUT',
                                headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                                body: JSON.stringify({totalCalories: nextState.totalCalories, Dim: nextState.Dim,
                                Sem: nextState.Sem, Mois: nextState.Mois, verifSemaine: nextState.verifSemaine})
                            })
                        }
                     break;
                     case 1:
                     nextState = {
                            ...state,
                            totalCalories: state.totalCalories + action.value,
                            Lun: state.Lun + action.value,
                            Sem: state.Lun + state.Mar + state.Mer + state.Jeu + state.Ven + state.Sam + state.Dim + action.value,
                            Mois: state.Sem + action.value,
                            
                        }
                        if ((token !== 0) && !tokenDeconnexion) {
                            fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                                method: 'PUT',
                                headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                                body: JSON.stringify({totalCalories: nextState.totalCalories, Lun: nextState.Lun,
                                Sem: nextState.Sem, Mois: nextState.Mois})
                            })
                        }
                     break;
                     case 2:
                     nextState = {
                            ...state,
                            totalCalories: state.totalCalories + action.value,
                            Mar: state.Mar + action.value,
                            Sem: state.Lun + state.Mar +  action.value,
                            Mois: state.Sem  + action.value,
                        }
                        if ((token !== 0) && !tokenDeconnexion) {
                            fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                                method: 'PUT',
                                headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                                body: JSON.stringify({totalCalories: nextState.totalCalories, Mar: nextState.Mar,
                                Sem: nextState.Sem, Mois: nextState.Mois})
                            })
                        }
                     break;
                     case 3:
                     nextState = {
                            ...state,
                            totalCalories: state.totalCalories + action.value,
                            Mer: state.Mer  + action.value,
                            Sem: state.Lun + state.Mar + state.Mer + action.value,
                            Mois: state.Sem + action.value,
                        }
                        if ((token !== 0) && !tokenDeconnexion) {
                            fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                                method: 'PUT',
                                headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                                body: JSON.stringify({totalCalories: nextState.totalCalories, Mer: nextState.Mer,
                                Sem: nextState.Sem, Mois: nextState.Mois})
                            })
                        }
                     break;
                     case 4:
                     nextState = {
                            ...state,
                            totalCalories: state.totalCalories + action.value,
                            Jeu: state.Jeu + action.value,
                            Sem: state.Lun + state.Mar + state.Mer + state.Jeu + action.value,
                            Mois: state.Sem + action.value,
                        }
                        if ((token !== 0) && !tokenDeconnexion) {
                            fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                                method: 'PUT',
                                headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                                body: JSON.stringify({totalCalories: nextState.totalCalories, Jeu: nextState.Jeu,
                                Sem: nextState.Sem, Mois: nextState.Mois})
                            })
                        }
                     break;
                     case 5:
                     nextState = {
                            ...state,
                            totalCalories: state.totalCalories + action.value,
                            Ven: state.Ven  + action.value,
                            Sem: state.Lun + state.Mar + state.Mer + state.Jeu + state.Ven +  action.value, 
                            Mois: state.Sem + action.value,
                        }
                        if ((token !== 0) && !tokenDeconnexion) {
                            fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                                method: 'PUT',
                                headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                                body: JSON.stringify({totalCalories: nextState.totalCalories, Ven: nextState.Ven,
                                Sem: nextState.Sem, Mois: nextState.Mois})
                            })
                        }
                     break;
                     case 6:
                     nextState = {
                            ...state,
                            totalCalories: state.totalCalories + action.value,
                            Sam: state.Sam + action.value,
                            Sem: state.Lun + state.Mar + state.Mer + state.Jeu + state.Ven + state.Sam +  action.value,
                            Mois: state.Sem + action.value,
                        }
                        if ((token !== 0) && !tokenDeconnexion) {
                            fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                                method: 'PUT',
                                headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                                body: JSON.stringify({totalCalories: nextState.totalCalories, Sam: nextState.Sam,
                                Sem: nextState.Sem, Mois: nextState.Mois})
                            })
                        }
                     break;
                     
              }
    
            return nextState

        case SUPPRIME_CALORIES:
            if ((state.totalCalories - action.value) < 0) {
              nextState = {
                     ...state,
                     totalCalories: 0
              }
              if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({totalCalories: nextState.totalCalories})
                })
            }
                return nextState
            }
            nextState = {
                ...state,
                totalCalories: state.totalCalories - action.value
            }
            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({totalCalories: nextState.totalCalories})
                })
            }
            return nextState
        case INIT_CALORIES:
            nextState = {
                ...state,
                totalCalories: 0,
            }
            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({totalCalories: nextState.totalCalories})
                })
            }
            return nextState
            case REINIT_SEM:
            nextState = {
                ...state,
                Sem4: state.Sem3,
                Sem3: state.Sem2,
                Sem2: state.Sem,
                Sem :0,
                Lun:0,
                Mar:0,
                Mer:0,
                Jeu:0,
                Ven:0,
                Sam:0,
                Dim:0,
                verifSemaine:0
            }
            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({Sem: nextState.Sem, Sem4: nextState.Sem4, Sem3: nextState.Sem3, Sem2: nextState.Sem2, 
                                        Lun: nextState.Lun, Mar: nextState.Mar, Mer: nextState.Mer , Jeu: nextState.Jeu, Ven: nextState.Ven,
                                        Sam: nextState.Sam, Dim: nextState.Dim, verifSemaine: nextState.verifSemaine})
                })
            }
            //Switch toutes les valeurs à la semaine qui suit et la nouvelle semaine démarre à 0
            return nextState
            case REINIT_MOIS:
            nextState = {
                ...state,
                Mois4: state.Mois3,
                Mois3: state.Mois2,
                Mois2: state.Mois,
                Mois:0,
                verifMois: action.value
            }
            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({Mois: nextState.Mois, Mois4: nextState.Mois4, Mois3: nextState.Mois3, Mois2: nextState.Mois2, verifMois: nextState.verifMois})
                })
            }
            //Remet à 0 la variable Mois
            return nextState
        case MODIFICATION_KCALPROFIL:
            nextState = {
                ...state,
                kcalProfil: action.value
            }
            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({kcalProfil: nextState.kcalProfil})
                })
            }
            return nextState
        case INIT_MOIS:
            nextState={
                ...state,
                verifMois:action.value,
                premiereConnexion:1,
            }
            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({verifMois: nextState.verifMois, premiereConnexion: nextState.premiereConnexion})
                })
            }
            return nextState
        case REINIT_KCALPROFIL: 
            nextState = {
                ...state,
                kcalProfil:0
            }
            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({kcalProfil: nextState.kcalProfil})
                })
            }
            return nextState
        case CONNEXION_CALORIES:
            nextState = {
                ...state,
                totalCalories: action.value.totalCalories,
                kcalProfil: action.value.kcalProfil,
                Lun: action.value.Lun,
                Mar: action.value.Mar,
                Mer: action.value.Mer,
                Jeu: action.value.Jeu,
                Ven: action.value.Ven,
                Sam: action.value.Sam,
                Dim: action.value.Dim,
                Sem: action.value.Sem,
                Sem2: action.value.Sem2,
                Sem3: action.value.Sem3,
                Sem4: action.value.Sem4,
                Mois: action.value.Mois,
                Mois2: action.value.Mois2,
                Mois3: action.value.Mois3,
                Mois4: action.value.Mois4,
                verifSemaine: action.value.verifSemaine,
                verifMois: action.value.verifMois,
                premiereConnexion: action.value.premiereConnexion,
            }
            return nextState
        case REINIT_TOTALCALORIES:
            nextState = {
                ...state,
                totalCalories: 0,
                kcalProfil:2500, 
                Lun:0,
                Mar:0,
                Mer:0,
                Jeu:0,
                Ven:0,
                Sam:0,
                Dim:0,
                Sem:0,
                Sem2:0,
                Sem3:0,
                Sem4:0,
                Mois:0,
                Mois2:0,
                Mois3:0,
                Mois4:0,
                verifSemaine:0,
                verifMois:0,
                premiereConnexion:0
            }
            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour les données calorique
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({totalCalories: 0,
                        kcalProfil:2500, 
                        Lun:0,
                        Mar:0,
                        Mer:0,
                        Jeu:0,
                        Ven:0,
                        Sam:0,
                        Dim:0,
                        Sem:0,
                        Sem2:0,
                        Sem3:0,
                        Sem4:0,
                        Mois:0,
                        Mois2:0,
                        Mois3:0,
                        Mois4:0,
                        verifSemaine:0,
                        verifMois:0,
                        premiereConnexion:0})
                })
            }
            return nextState
        default:
            return state
    }
}