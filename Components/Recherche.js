// Components barre de recherche
import React from 'react'
import { View, Image, TextInput, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import * as Progress from 'react-native-progress'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import logo from './Yummy.png'
import { Pedometer } from "expo-sensors"

let day = new Date().getDay();
let jouractu

const mapStateToProps = (state) => {
  return {
    totalCalories: state.totalCalories.totalCalories,
    kcalProfil: state.totalCalories.kcalProfil,
    Lun_: state.nombrePas.Lun_,
    Mar_: state.nombrePas.Mar_,
    Mer_: state.nombrePas.Mer_,
    Jeu_: state.nombrePas.Jeu_,
    Ven_: state.nombrePas.Ven_,
    Sam_: state.nombrePas.Sam_,
    Dim_: state.nombrePas.Dim_,
  }
}

export class Recherche extends React.Component {

  constructor(props) {
    super(props)
    this.rechercheText = ''
    
  }

  _getText(text) //Méthode privée pour modifier la valeur du TextInput
  {
    this.rechercheText = text
  }

  _afficheProduit() //Méthode privée pour accéder à la vue AfficheProduit
  {
    if (this.rechercheText != '') {      
      this.props.navigation.navigate('AfficheProduit', { code_barre: this.rechercheText })
    }
    else {
      Alert.alert('Aucun code barre saisie !')
    }
  }

  state = {
    nombreDePas: 0
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      const action = {
        type: 'AJOUT_PAS',
        value: this.state.nombreDePas
    }
    this.props.dispatch(action)
      this.setState({
        nombreDePas: result.steps
      });
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };



  render() {

    switch(day){
      case 0:
        jouractu=this.props.Dim_
    
    break;
    case 1:
        jouractu=this.props.Lun_
    
    break;
    case 2:
        jouractu=this.props.Mar_
    
    break;
    case 3:
        jouractu=this.props.Mer_
    
    break;
    case 4:
        jouractu=this.props.Jeu_
    
    break;
    case 5:
        jouractu=this.props.Ven_
    
    break;
    case 6:
        jouractu=this.props.Sam_
    
    break;
    }

    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <View style={styles.view}>

        <View style={styles.logoContainer}>
            <Image source={logo} style={styles.image}/>
        </View>
        

          <View style={styles.header}>
            <Icon raised style={styles.iconeHeader} name='heart' type='evilicon' color='#2dcc70' size={40} onPress={()=>{this.props.navigation.navigate('Favoris')}} />
          </View>      

          <View style={styles.main}>

            <View style={styles.viewRecherche}>
              <TextInput style={styles.recherche} placeholder='Numéro code barre' keyboardType='number-pad'
                onChangeText={(text) => this._getText(text)} />

              <TouchableOpacity style={styles.boutonRecherche} onPress={() => { this._afficheProduit() }} >
                <Text style={styles.txtRecherche}>RECHERCHE</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.viewTotal}>
              <Text style={styles.total}>Total : {this.props.totalCalories} / {this.props.kcalProfil}</Text>

              <TouchableOpacity style={styles.progression}>
                <Progress.Bar progress={this.props.totalCalories/this.props.kcalProfil} indeterminateAnimationDuration={1000} animated width={null} color='#2dcc70' />
              </TouchableOpacity>
              <View style={styles.podometre}>
              <TouchableOpacity style={styles.TOpedometre} onPress={()=>{this.props.navigation.navigate('Podometre')}} >
          <Text style={styles.textpodo}>{jouractu}</Text>
          <Icon  name={'ios-walk'} type="ionicon" color={'black'} size={65} />
          </TouchableOpacity>
              
              </View>
            </View>
            

          </View>

          

        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default connect(mapStateToProps)(Recherche)

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff'
  },

  header: {
    alignItems:'center',
   },

  image: {
    width:300,
    height:150,
  },
  txtRecherche:{
    color:'#2dcc70',
    fontSize: 15,
    textAlign:'center'
  },
  logoContainer:{
    alignItems:'center',
    marginBottom:35,
    paddingTop: 15
},
  iconeHeader: {
    position:'absolute',
    top:8,
    left:37
  },

  iconeHeaderBis: {
    position:'absolute',
    top:8,
    left:37
  },

  main: {
    flex: 2,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  viewRecherche: 
  {
    flex: 1,
    justifyContent: 'center'
  },
  recherche: {
    borderWidth: 2,
    borderColor: '#EFEFEF',
    marginRight: 5,
    marginLeft: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#EFEFEF'
  },
  boutonRecherche: {
    paddingTop:10
  },
  viewTotal: {
    flex: 1,
    borderRadius:10
  },
  total: {
    textAlign: 'center',
    margin: 10,
    padding: 10,
    borderWidth: 2
  },
  progression: {
    margin: 10
  },
  podometre: {

    flex: 1,
    flexDirection: 'row', 
    alignSelf:'center',
  /* backgroundColor: "#add8e6",
    borderWidth: 5,
    justifyContent:'center',
    width: 175, 
    height: 50,
    
    borderRadius:25,
*/
  },
  textpodo:{
    textAlign: 'center',
    fontSize:50,
    fontWeight: "bold",
    color:'black',
    margin:8
  },
  TOpedometre:{
    flex: 1,
    height: 125,
    width:150,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    flexDirection: 'row'
  }

})