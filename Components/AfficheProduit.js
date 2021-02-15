// Components AfficheProduit 
import React from 'react'
import { StyleSheet, View, Text, Image, Alert, ActivityIndicator, ScrollView, Dimensions,TouchableOpacity } from 'react-native'
import { getProduitFromApi } from './FonctionOpenFF'
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
    historiqueProduits: state.modificationHistorique.historiqueProduits,
    Lait: state.infoConso.Lait,
    Noix: state.infoConso.Noix,
    Gluten: state.infoConso.Gluten,
    Vegetarien: state.infoConso.Vegetarien,
  }
}

let couleurVegetarien='transparent',texteVegetarien,nameIcon


export class AfficheProduit extends React.Component {

  state = {
    enChargement: true,
    produit: {
      id: 0,
      statut: 0,
      code_barre: '',
      ingredient: '',
      nutriscore: '',
      nom_produit: '',
      calories: 0,
      image: '',
      matieres_grasses: 0,
      graisses_saturees: 0,
      glucides: 0,
      sucre: 0,
      fibres: 0,
      proteines: 0,
      sel: 0,
      quantite: '',
      quantite_nombre: 0,
      caloriesSelect: 0,
      couleur_nutriscore: 'green',
      couleur_favoris: 'black'
    }
  }

  _ajoutHistorique() {
    const action = {
      type: 'AJOUT_HISTORIQUE',
      value: this.state.produit
    }
    this.props.dispatch(action)
    
    this.props.navigation.goBack()
  }

  componentDidMount() { //Seulement lorsque le component est monté (renvoie quelque chose) on exécute ces fonctions
    getProduitFromApi(this.props.navigation.state.params.code_barre).then((donnee) => { //Fonction qui passe en paramètre le code barre et recupère les infos du produit dans l'API
      this.setState({
        enChargement: false,
        produit: {
          id: 0,
          statut: donnee.status,
          code_barre: donnee.code,
          ingredient: donnee.product.ingredients_text,
          nutriscore: donnee.product.nutriscore_grade,
          nom_produit: donnee.product.product_name,
          calories: donnee.product.nutriments.energy_value,
          image: donnee.product.image_url,
          matieres_grasses: donnee.product.nutriments.fat_100g,
          graisses_saturees: donnee.product.nutriments['saturated-fat_100g'],
          glucides: donnee.product.nutriments.carbohydrates_100g,
          sucre: donnee.product.nutriments.sugars_100g,
          fibres: donnee.product.nutriments.fiber_100g,
          proteines: donnee.product.nutriments.proteins_100g,
          sel: donnee.product.nutriments.salt_100g,
          quantite: donnee.product.quantity,
          quantite_nombre: parseInt(donnee.product.product_quantity),
          caloriesSelect: 0,
          couleur_nutriscore: 'green',
          allergene: donnee.product.allergens,
          vegetarien: donnee.product.ingredients_analysis_tags+'',
          couleur_favoris: 'black'
        }
      })
    }).then(() => {
      if (this.state.produit.statut === 0) { //Indique que le produit est introuvable + retour vue recherche (mais ne fonctionne pas tjr, raison inconnu)
        Alert.alert('Pas de produit correspondant')
        this.props.navigation.goBack()
      }
    })
    
  }

  render() {

    if (this.state.enChargement) { //Retourne une vue de chargement, le temps de trouver l'information du produit
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      )
    }
    else {
      if (typeof(this.state.produit.nutriscore) !== 'string') { //Vérifie si le nutriscore est un string car sinon la fonction toUpperCase bloque tout
        this.state.produit.nutriscore = 'inconnu'
      }

      switch (this.state.produit.nutriscore) {
        case 'a' || 'A' :
          this.state.produit.couleur_nutriscore = 'green'
          break;
        case 'b' || 'B' :
          this.state.produit.couleur_nutriscore = '#32CD32' //verte clair
          break;
        case 'c' || 'C' :
          this.state.produit.couleur_nutriscore = '#FFD700' //gold
          break;
        case 'd' || 'D' :
          this.state.produit.couleur_nutriscore = 'orange'
          break;
        case 'e' || 'E' :
          this.state.produit.couleur_nutriscore = 'red'
          break;
        default:
          break;
        
      }

    let allerg=this.state.produit.allergene.split(",")
    for(let i=0;i<20;i++){
      if(this.props.Lait==='true'){
        if(this.props.Noix==='false'&&this.props.Gluten==='false'){
          if(allerg[i]==='en:milk'){
            Alert.alert("INFO ALLERGIE","Ce produit contient du lactose !",[
              {text:'Modifier mes allergies',onPress:()=>this.props.navigation.navigate('Profil')},{text:'ok'}])
          }
        }
        else if(this.props.Noix==='true'&&this.props.Gluten==='false'){
          if(allerg[i]==='en:milk'){
            for(let j=0;j<20;j++){
              if(allerg[j]==='en:nuts'){
                Alert.alert("INFO ALLERGIE", "Ce produit contient du lactose et des noix !",[
              {text:'Modifier mes allergies',onPress:()=>this.props.navigation.navigate('Profil')},{text:'ok'}])
              }
           }
          }
        }
        else if(this.props.Noix==='false'&&this.props.Gluten==='true'){
          if(allerg[i]==='en:milk'){
            for(let j=0;j<20;j++){
              if(allerg[j]==='en:gluten'){
                Alert.alert("INFO ALLERGIE","Ce produit contient du lactose et du gluten !",[
              {text:'Modifier mes allergies',onPress:()=>this.props.navigation.navigate('Profil')},{text:'ok'}])
              }
           }
          }
        }
        else if(this.props.Noix==='true'&&this.props.Gluten==='true'){
          if(allerg[i]==='en:milk'){
            for(let j=0;j<20;j++){
              if(allerg[j]==='en:nuts'){
                for(let k=0;k<20;k++){
                  if(allerg[k]==='en:gluten'){
                    Alert.alert("INFO ALLERGIE","Ce produit contient du lactose, des noix et du gluten !",[
              {text:'Modifier mes allergies',onPress:()=>this.props.navigation.navigate('Profil')},{text:'ok'}])
                  }
                }
              }
          }
        }
      }
    }
    else if(this.props.Noix==='true'){
      if(this.props.Gluten==='false'){
        if(allerg[i]==='en:nuts'){
          Alert.alert("INFO ALLERGIE","Ce produit contient des noix !",[
            {text:'Modifier mes allergies',onPress:()=>this.props.navigation.navigate('Profil')},{text:'ok'}])
        }
      }
      else if(this.props.Gluten==='true'){
        if(allerg[i]==='en:nuts'){
          for(let j=0;j<20;j++){
            if(allerg[j]==="en:gluten"){
              Alert.alert("INFO ALLERGIE","Ce produit contient des noix et du gluten ! ",[
                {text:'Modifier mes allergies',onPress:()=>this.props.navigation.navigate('Profil')},{text:'ok'}])
            }
          }
        }
      }
    }
    else if (this.props.Gluten==="true"){
      if(allerg[i]==='en:gluten'){
        Alert.alert("INFO ALLERGIE", "Ce produit contient du gluten !",[
          {text:'Modifier mes allergies',onPress:()=>this.props.navigation.navigate('Profil')},{text:'ok'}])
      }
    }
  }


  
  let vege=this.state.produit.vegetarien.split(":")
  if(this.props.Vegetarien==='false'){
    couleurVegetarien='transparent'
    texteVegetarien=null
    nameIcon=null
  }
  else if(vege[3]==='vegetarian'&&this.props.Vegetarien==='true'){
    couleurVegetarien='green'
    texteVegetarien='Ce produit est végétarien'
    nameIcon='ios-leaf'
  }
  else if(vege[3]==='non-vegetarian'&&this.props.Vegetarien==='true'){
    couleurVegetarien='red'
    texteVegetarien="Ce produit n'est pas végétarien"
    nameIcon='ios-leaf'
  }
  else if(this.props.Vegetarien==='true'){
    couleurVegetarien='grey'
    texteVegetarien='Impossible de savoir si ce produit est végétarien'
    nameIcon='ios-leaf'
  }
      return (
        
        <ScrollView style={{backgroundColor: 'white'}}>

          <View style={styles.header_container}>
            <Image
              style={styles.image}
              source={{ uri: this.state.produit.image }}
            />

            <View style={styles.header_description}>
              <Text style={styles.nom_produit}>{this.state.produit.nom_produit}</Text>
              <Text style={styles.nutriscore}>Nutriscore : <Text style={{ color: this.state.produit.couleur_nutriscore}}>{this.state.produit.nutriscore.toUpperCase()}</Text></Text>
              <Text style={styles.calories}>Calories/100g : {this.state.produit.calories}</Text>
              <Text>Quantité : {this.state.produit.quantite}</Text>
            </View>
          </View>

          <View style={styles.description_container}>
            <View style={styles.description_ingredients}>
              <Text style={styles.titre}>Ingrédients</Text>
              <Text>
                <Text style={styles.ingredients}>{this.state.produit.ingredient}</Text>
              </Text>
            </View>
            <View style={styles.description_nutritionnelles}>
              <Text style={styles.titre}>Valeurs nutritionnelles</Text>

              <Text>Matières grasses : {this.state.produit.matieres_grasses} g</Text>
              <BarreMatieresGrasses matieres_grasses={this.state.produit.matieres_grasses} />
              <Text style={styles.dont}>Dont saturées : {this.state.produit.graisses_saturees} g</Text>
              <BarreGraissesSaturees graisses_saturees={this.state.produit.graisses_saturees} />

              <Text></Text>

              <Text>Glucides : {this.state.produit.glucides} g</Text>
              <BarreGlucides glucides={this.state.produit.glucides} />
              <Text style={styles.dont}>Dont sucre : {this.state.produit.sucre} g</Text>
              <BarreSucre sucre={this.state.produit.sucre} />

              <Text></Text>

              <Text>Fibres : {this.state.produit.fibres} g</Text>
              <BarreFibres fibres={this.state.produit.fibres} />

              <Text></Text>

              <Text>Protéines : {this.state.produit.proteines} g</Text>
              <BarreProteines proteines={this.state.produit.proteines} />

              <Text></Text>

              <Text>Sel : {this.state.produit.sel} g</Text>
              <BarreSel sel={this.state.produit.sel} />
              

            </View>
            
            <TouchableOpacity style={styles.vegeBtn}>
              <Icon reverse name={nameIcon} type="ionicon" color={couleurVegetarien} />
              </TouchableOpacity>
              <Text style={styles.txtVegeBtn}>{texteVegetarien}</Text>
          </View>

          <View style={styles.footer_container}>
            <Icon raised style={styles.iconeFooter} name='check' type='evilicon' color='green' size={30} onPress={() => this._ajoutHistorique()} />

            <Icon raised style={styles.iconeFooter} name='close-o' type='evilicon' color='red' size={30} onPress={() => { this.props.navigation.goBack() }} />
          </View>

        </ScrollView>
      )
    }
    
  }
}

export default connect(mapStateToProps)(AfficheProduit)

const styles = StyleSheet.create({
  main_container: {
    flex: 1, //Prend la vue entière de la page
    alignItems: 'flex-start',
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
    flex: 1.5, //Prend 1.5/2.5 de la vue header_container 
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

  vegeBtn:{
    alignSelf:'center'
  }, 
  txtVegeBtn:{
    textAlign:'center'
  }, 

  footer_container: {
    flex: 0.7, //Prend 0.7/3.7 de la vue main_container
    flexDirection: 'row',
    width: Dimensions.get('screen').width, //On force la vue à prendre la largeur de l'écran
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  iconeFooter: {

  }
})
