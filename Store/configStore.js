import { createStore, combineReducers } from 'redux'
import modificationHistorique from './Reducers/historiqueReducer'
import totalCalories from './Reducers/caloriesReducer'
import modificationConsommation from './Reducers/maConsommationReducer'
import nombrePas from './Reducers/caloriesDepenser'
import modificationFavoris from './Reducers/favorisReducer'
import infoConso from './Reducers/infoConso'

const reducer = combineReducers({ // Permet de combiner les Reducers dans le Store
    modificationHistorique,
    modificationConsommation,
    totalCalories,
    nombrePas,
    modificationFavoris,
    infoConso
}) 

export default createStore(reducer)


