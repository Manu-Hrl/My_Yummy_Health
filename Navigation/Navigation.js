import  { createAppContainer, createSwitchNavigator }  from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Recherche from '../Components/Recherche'
import Camera from '../Components/Camera'
import AfficheProduit from '../Components/AfficheProduit'
import TabCalJour from '../Components/TabCalJour'
import TabCalSemaine from '../Components/TabCalSemaine'
import TabCalMois from '../Components/TabCalMois'
import MonPanier from '../Components/MonPanier'
import ProduitPourcentage from '../Components/ProduitPourcentage'
import MaConsommation from '../Components/MaConsommation'
import ProduitITem from '../Components/ProduitItem'
import Profil from '../Components/Profil'
import Connexion  from '../Components/Connexion'
import { Icon } from 'react-native-elements'
import { Register } from '../Components/Register'
import React from 'react'
import Statistique from '../Components/Statistique'
import Podometre from '../Components/Podometre'
import { PerdreDuPoids } from '../Components/PerdreDuPoids'
import { GagnerDuPoids } from '../Components/GagnerDuPoids'
import Favoris from '../Components/Favoris'


const RechercheStackNavigator = createStackNavigator ({
    Recherche: {
        screen: Recherche,
        navigationOptions: {
            headerShown: false,
            title: 'Recherche'

        }
    },
    AfficheProduit: {
        screen: AfficheProduit,
        navigationOptions: {
            title: 'Détail produit'
        }
    },   
    Profil: {
        screen: Profil
    },
    Favoris:{
        screen: Favoris
    },
    Date: {
        screen : Date
    },
    
    Podometre: {
        screen : Podometre
    },
    /*les deux trucs pour naviguer entre la vue profil et les vues prendre ou perdre du poids*/
    GagnerDuPoids: {
        screen: GagnerDuPoids
    },
    PerdreDuPoids: {
        screen: PerdreDuPoids
    }
})

const CameraStackNavigator = createStackNavigator({
    Camera: {
        screen: Camera,
        navigationOptions: {
            headerShown: false
        }
    },
    AfficheProduit: {
        screen: AfficheProduit,
        navigationOptions: {
            title: 'Détail produit'
        }
    }
})

const MonPanierStackNavigator = createStackNavigator ({
    MonPanier: {
        screen: MonPanier,
        navigationOptions: {
            title: 'Mon panier',
            headerShown: false
        } 
    },
    MaConsommation: {
        screen: MaConsommation,
        navigationOptions: {
            title: 'Ma consommation'
        }
    },
    ProduitPourcentage: {
        screen: ProduitPourcentage,
        navigationOptions: {
            title: 'Choix pourcentage produit'
        }
    },
    ProduitItem: {
        screen: ProduitITem
    }
})

const StatistiqueStackNavigator = createStackNavigator({
    Statistique: {
        screen: Statistique,
        navigationOptions: {
            title: 'Statistique',
            headerShown: false
        }
    },
   
    TabCalJour : {
        screen: TabCalJour,
        navigationOptions: {
            title: 'Jour',
            headerShown: false
        }
        
    },
    TabCalSemaine : {
        screen: TabCalSemaine,
        navigationOptions: {
            title: 'Semaine',
            headerShown: false
        }
    },
    TabCalMois : {
        screen: TabCalMois,
        navigationOptions: {
            title: 'Mois',
            headerShown: false
        }
        
    }
})

const ConnexionStackNavigator = createStackNavigator({
    Connexion: {
        screen: Connexion,
        navigationOptions: {
            headerShown: false
        }
    },
    Register: {
        screen : Register,
        navigationOptions: {
            headerShown: false
        }
    }
})

const ProfilStackNavigator = createStackNavigator({
    Profil: {
        screen: Profil
    }
})

const ProduitTabNavigator = createBottomTabNavigator({
    Recherche: {
        screen: RechercheStackNavigator,
        navigationOptions: {
            title: 'Recherche',
            tabBarIcon: () => {
                return <Icon name='search' type='evilicon' color='grey' size={35}/>
            }
        }
    },
    Camera: {
        screen: CameraStackNavigator,
        navigationOptions: {
            title: 'Scan',
            tabBarIcon: () => {
                return <Icon name='camera' type='evilicon' color='grey' size={35}/>
            }
        }
    },
    Statistique: {
        screen: StatistiqueStackNavigator,
        navigationOptions: {
            title: 'Statistique',
            tabBarIcon: () => {
                return <Icon name='chart' type='evilicon' color='grey' size={35}/>
            }
        }
    },
    MonPanier: {
        screen: MonPanierStackNavigator,
        navigationOptions: {
            title: 'Mon panier',
            tabBarIcon: () => {
                return <Icon name='cart' type='evilicon' color='grey' size={35}/>
            }
        } 
    },
    Profil: {
        screen: ProfilStackNavigator,
        navigationOptions: {
            title: 'Profil',
            tabBarIcon: () => {
                return <Icon name='user' type='evilicon' color='grey' size={35}/>
            }
        } 
    }
}) 


export default createAppContainer(createSwitchNavigator({
    Connexion: ConnexionStackNavigator,
    Application: ProduitTabNavigator
},
{
    initialRouteName: 'Connexion'
}))