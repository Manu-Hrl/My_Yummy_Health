import { token, serveur } from "../../Components/Connexion"
import { tokenDeconnexion } from "../../Components/Profil"

const initialState = {
    Lun_:0,Mar_:0,Mer_:0,Jeu_:0,Ven_:0,Sam_:0,Dim_:0,
    NbrPas:0,PasAv:0,DebSem:0,PasVoulu:8000 }

const AJOUT_PAS = 'AJOUT_PAS'
const CONNEXION_PAS = 'CONNEXION_PAS'
const REINIT_SEM = 'REINIT_SEM'
const MODIF_PAS = 'MODIF_PAS'
const REINIT_NOMBREPAS = 'REINIT_NOMBREPAS'

export default function nombrePas(state = initialState, action) {
    let nextState
    let day = new Date().getDay();
    
    switch(action.type){
        case AJOUT_PAS:
            switch(day){
                case 0:
                    if(action.value>0){
                        nextState = {
                            ...state,
                            Dim_: state.Dim_ + action.value - state.NbrPas,
                            NbrPas: action.value,
                            DebSem:1
                        }
                        if ((token !== 0) && !tokenDeconnexion) {
                            fetch(serveur+'/utilisateur/update', { //Met à jour le nombre de pas dans la base de données
                                method: 'PUT',
                                headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                                body: JSON.stringify({Dim_: nextState.Dim_, NbrPas: nextState.NbrPas, DebSem: nextState.DebSem})
                            })
                        }
                    }else{
                        nextState = {
                            ...state,
                            Dim_: state.Dim_ + action.value,
                            NbrPas: action.value,
                        }
                        if ((token !== 0) && !tokenDeconnexion) {
                            fetch(serveur+'/utilisateur/update', { //Met à jour le nombre de pas dans la base de données
                                method: 'PUT',
                                headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                                body: JSON.stringify({Dim_: nextState.Dim_, NbrPas: nextState.NbrPas})
                            })
                        }
                    }
                 break;
                 case 1:
                    if(action.value>0){
                        nextState = {
                            ...state,
                            Lun_: state.Lun_ + action.value - state.NbrPas,
                            NbrPas: action.value,
                        }
                    }else{
                        nextState = {
                            ...state,
                            Lun_: state.Lun_ + action.value,
                            NbrPas: action.value,
                        }
                    }
                    if ((token !== 0) && !tokenDeconnexion) {
                        fetch(serveur+'/utilisateur/update', { //Met à jour le nombre de pas dans la base de données
                            method: 'PUT',
                            headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                            body: JSON.stringify({Lun_: nextState.Lun_, NbrPas: nextState.NbrPas})
                        })
                    }
                 break;

                 case 2:
                    if(action.value>0){
                        nextState = {
                            ...state,
                            Mar_: state.Mar_ + action.value - state.NbrPas,
                            NbrPas: action.value,
                        }
                    }else{
                        nextState = {
                            ...state,
                            Mar_: state.Mar_ + action.value,
                            NbrPas: action.value,
                        }
                    }
                    if ((token !== 0) && !tokenDeconnexion) {
                        fetch(serveur+'/utilisateur/update', { //Met à jour le nombre de pas dans la base de données
                            method: 'PUT',
                            headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                            body: JSON.stringify({Mar_: nextState.Mar_, NbrPas: nextState.NbrPas})
                        })
                    }
                 break;

                 case 3:
                    if(action.value>0){
                        nextState = {
                            ...state,
                            Mer_: state.Mer_ + action.value - state.NbrPas,
                            NbrPas: action.value,
                        }
                    }else{
                        nextState = {
                            ...state,
                            Mer_: state.Mer_ + action.value,
                            NbrPas: action.value,
                        }
                    }
                    if ((token !== 0) && !tokenDeconnexion) {
                        fetch(serveur+'/utilisateur/update', { //Met à jour le nombre de pas dans la base de données
                            method: 'PUT',
                            headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                            body: JSON.stringify({Mer_: nextState.Mer_, NbrPas: nextState.NbrPas})
                        })
                    }
                 break;

                 case 4:
                     if(action.value>0){
                    nextState = {
                        ...state,
                        Jeu_: state.Jeu_ + action.value - state.NbrPas,
                        NbrPas: action.value,
                    }
                }else{
                    nextState = {
                        ...state,
                        Jeu_: state.Jeu_ + action.value,
                        NbrPas: action.value,
                    }
                }
                if ((token !== 0) && !tokenDeconnexion) {
                    fetch(serveur+'/utilisateur/update', { //Met à jour le nombre de pas dans la base de données
                        method: 'PUT',
                        headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                        body: JSON.stringify({Jeu_: nextState.Jeu_, NbrPas: nextState.NbrPas})
                    })
                }
                 break;

                 case 5:
                    if(action.value>0){
                        nextState = {
                            ...state,
                            Ven_: state.Ven_ + action.value - state.NbrPas,
                            NbrPas: action.value,
                        }
                    }else{
                        nextState = {
                            ...state,
                            Ven_: state.Ven_ + action.value,
                            NbrPas: action.value,
                        }
                    }
                    if ((token !== 0) && !tokenDeconnexion) {
                        fetch(serveur+'/utilisateur/update', { //Met à jour le nombre de pas dans la base de données
                            method: 'PUT',
                            headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                            body: JSON.stringify({Ven_: nextState.Ven_, NbrPas: nextState.NbrPas})
                        })
                    }
                 break;

                 case 6:
                    if(action.value>0){
                        nextState = {
                            ...state,
                            Sam_: state.Sam_ + action.value - state.NbrPas,
                            NbrPas: action.value,
                        }
                    }else{
                        nextState = {
                            ...state,
                            Sam_: state.Sam_ + action.value,
                            NbrPas: action.value,
                        }
                    }
                    if ((token !== 0) && !tokenDeconnexion) {
                        fetch(serveur+'/utilisateur/update', { //Met à jour le nombre de pas dans la base de données
                            method: 'PUT',
                            headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                            body: JSON.stringify({Sam_: nextState.Sam_, NbrPas: nextState.NbrPas})
                        })
                    }
                 break;
            }
            return nextState

        case CONNEXION_PAS:
            nextState = {
                ...state,
                Lun_: action.value.Lun_,
                Mar_: action.value.Mar_,
                Mer_: action.value.Mer_,
                Jeu_: action.value.Jeu_,
                Ven_: action.value.Ven_,
                Sam_: action.value.Sam_,
                Dim_: action.value.Dim_,
                NbrPas: action.value.NbrPas,
                PasAv: action.value.PasAv
            }
            return nextState
        case REINIT_SEM:
            nextState = {
                ...state,
                Lun_:0,
                Mar_:0,
                Mer_:0,
                Jeu_:0,
                Ven_:0,
                Sam_:0,
                Dim_:0,
               DebSem:0
            }
            if ((token !== 0) && !tokenDeconnexion) {
                fetch(serveur+'/utilisateur/update', { //Met à jour le nombre de pas dans la base de données
                    method: 'PUT',
                    headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                    body: JSON.stringify({Lun_: nextState.Lun_, Mar_: nextState.Mar_, Mer_: nextState.Mer_, Jeu_: nextState.Jeu_,
                                        Ven_: nextState.Ven_, Sam_: nextState.Sam_, Dim_: nextState.Dim_, DebSem: nextState.DebSem})
                })
            }
            return nextState
        case MODIF_PAS:
                     nextState = {
                     ...state,
                     PasVoulu:action.value
                 }
                 if ((token !== 0) && !tokenDeconnexion) {
                    fetch(serveur+'/utilisateur/update', { //Met à jour le nombre de pas dans la base de données
                        method: 'PUT',
                        headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token.token}),
                        body: JSON.stringify({PasVoulu: nextState.PasVoulu})
                    })
                }
            return nextState
        case REINIT_NOMBREPAS:
            nextState = {
                Lun_:0,
                Mar_:0,
                Mer_:0,
                Jeu_:0,
                Ven_:0,
                Sam_:0,
                Dim_:0,
                NbrPas:0,
                PasAv:0,
                DebSem:0,
                PasVoulu:8000
            }
            return nextState
        default:
            return state
    }
}