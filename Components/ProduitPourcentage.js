import React from 'react'
import { StyleSheet, View, Text, Image, Dimensions, Slider, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import BarreMatieresGrasses from './BarreMatieresGrasses'
import BarreGraissesSaturees from './BarreGraissesSaturees'
import BarreGlucides from './BarreGlucides'
import BarreSucre from './BarreSucre'
import BarreSel from './BarreSel'
import BarreProteines from './BarreProteines'
import BarreFibres from './BarreFibres'

const mapStateToProps = (state) => {
  return {
    totalCalories: state.totalCalories.totalCalories,
    maConsommation: state.modificationConsommation.maConsommation
  }
}

export class ProduitPourcentage extends React.Component {
  constructor(props) {
    super(props)
    this.produit = this.props.navigation.state.params.produitItem
    this.state = {
      slideValeur: 0
    }
  }

  _kcalPourcentage() { //Indique le nombre de calories sélectionnées
    return Math.floor((this.produit.calories*this.produit.quantite_nombre/100) * this.state.slideValeur/100)
  }

  _grammeSelect() { //Indique le nombre de grammes sélectionnées
    return Math.floor(this.produit.quantite_nombre*this.state.slideValeur/100)
  }
 
  _ajoutMaConsommation() {
    
    if (this.props.maConsommation.findIndex(item => item.id === this.produit.id) === -1) { //Vérification des doublons dans Ma Consommation
      this.produit.caloriesSelect = this._kcalPourcentage() //On sauvegarde pour chaque produit les calories selectionnées
      this.produit.id = new Date().getTime()

      const action1 = {
        type: 'AJOUT_CONSOMMATION',
        value: this.produit
      }
      this.props.dispatch(action1)

      const action2 = {
        type: 'AJOUT_CALORIES',
        value: this._kcalPourcentage()
      }
      this.props.dispatch(action2)
    }

    this.props.navigation.navigate('MonPanier')
  }

  render() {

    return (

      <ScrollView style={styles.main_container}>

        <View style={styles.header_container}>
          <Image
            style={styles.image}
            source={{ uri: this.produit.image }}
          />

          <View style={styles.header_description}>
            <Text style={styles.nom_produit}>{this.produit.nom_produit}</Text>
            <Text style={styles.nutriscore}>Nutriscore : <Text style={{color: this.produit.couleur_nutriscore}}>{this.produit.nutriscore.toUpperCase()}</Text></Text>
            <Text style={styles.calories}>Calories / 100g : {this.produit.calories}</Text>
            <Text>Quantité : {this.produit.quantite}</Text>
          </View>
        </View>

        <View style={styles.description_container}>
          <View style={styles.description_ingredients}>
            <Text style={styles.titre}>Ingrédients</Text>
            <Text style={styles.ingredients}>{this.produit.ingredient}</Text>
          </View>
          <View style={styles.description_nutritionnelles}>
            <Text style={styles.titre}>Valeurs nutritionnelles</Text>

            <Text>Matières grasses : {this.produit.matieres_grasses}g</Text>
              <BarreMatieresGrasses matieres_grasses={this.produit.matieres_grasses}/>
            <Text style={styles.dont}>Dont saturées : {this.produit.graisses_saturees}g</Text>
              <BarreGraissesSaturees graisses_saturees={this.produit.graisses_saturees}/>

            <Text></Text>

            <Text>Glucides : {this.produit.glucides}g</Text>
              <BarreGlucides glucides={this.produit.glucides}/>
            <Text style={styles.dont}>Dont sucre : {this.produit.sucre}g</Text>
              <BarreSucre sucre={this.produit.sucre}/>

            <Text></Text>

            <Text>Fibres : {this.produit.fibres}g</Text>
              <BarreFibres fibres={this.produit.fibres}/>

            <Text></Text>

            <Text>Protéines : {this.produit.proteines}g</Text>
              <BarreProteines proteines={this.produit.proteines}/>

            <Text></Text>

            <Text>Sel : {this.produit.sel}g</Text>
              <BarreSel sel={this.produit.sel}/>

            <Slider value={this.state.slideValeur} thumbTintColor='#2dcc70' minimumTrackTintColor='#2dcc70' step={1} maximumValue={100} style={{width: '80%'}} onSlidingComplete={(slideValeur => {this.setState({ slideValeur })})}/>
            <Text>Valeur consommé : {this.state.slideValeur}% | {this._kcalPourcentage()}kcal | {this._grammeSelect()}g/ml</Text>
            
          </View>
        </View>

        <View style={styles.footer_container}>
          <Icon raised style={styles.iconeFooter} name='check' type='evilicon' color='green' size={30} onPress={() => { this._ajoutMaConsommation() }} />

          <Icon raised style={styles.iconeFooter} name='close-o' type='evilicon' color='red' size={30} onPress={() => { this.props.navigation.navigate('MonPanier') }} />
        </View>

      </ScrollView>
       
    )
  }
}

export default connect(mapStateToProps)(ProduitPourcentage)

const styles = StyleSheet.create({
  main_container: {
    flex: 1, //Prend la vue entière de la page
    //alignItems: 'flex-start',
    backgroundColor: '#fff'
  },

  header_container: {
    flex: 1, //Prend 1/3.7 de la vue main_container
    flexDirection: 'row'
  },
  image: {
    height: 200,
    width: 150,
    backgroundColor: 'gray'
  },
  header_description: {
    flex: 1, 
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  nom_produit: {
    flex: 1.5, //Prend 1.5/3.5 de la vue header_description
    fontWeight: 'bold',
    fontSize: 20,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  nutriscore: {
    flex: 1, //Prend 1/3.5 de la vue header_description
    fontWeight: 'bold',
    fontSize: 26
  },
  calories: {
    flex: 1, //Prend 1/3.5 de la vue header_description
    fontSize: 14,
    fontStyle: 'italic'
  },

  description_container: {
    flex: 2, //Prend 2/3.7 de la vue main_container
    margin: 10
  },
  description_ingredients: {
    flex: 1, //Prend 1/3 de la vue description_container

  },
  titre: {
    fontWeight: 'bold',
    fontSize: 20,
    flexWrap: 'wrap',
    marginBottom: 10,
    textDecorationLine: 'underline'
  },
  ingredients: {
    textAlign: 'justify'
  },
  description_nutritionnelles: {
    flex: 2, //Prend 2/3 de la vue description_container
  },
  dont:
  {
    paddingLeft: 20,
    fontStyle: 'italic'
  },

  footer_container: {
    flex: 0.7, //Prend 0.7/3.7 de la vue main_container
    flexDirection: 'row',
    width: Dimensions.get('screen').width, //On force la vue à prendre la largeur de l'écran
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  iconeFooter: {

  }
})
