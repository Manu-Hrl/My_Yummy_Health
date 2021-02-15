import React from 'react'
import { View, TextInput, FlatList, Dimensions, StyleSheet, Text } from 'react-native'
import ProduitItem from './ProduitItem'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'

const mapStateToProps = (state) => {
  return {
    historiqueProduits: state.modificationHistorique.historiqueProduits
  }
}
const { width: WIDTH } = Dimensions.get('window')
export class MonPanier extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = ''
    this.state = {
      dataHistorique: this.props.historiqueProduits,
    }
  }

  _getText(text) //Méthode privée pour modifier la valeur du TextInput
  {
    this.textInput = text
    if (text === '') {
      this._rechercheHistorique(text)
      this.input.clear() //Supprime le texte dans le TextInput
    }
  }

  _videHistorique() { //Vide l'historique
    const action = {
      type: 'VIDER_HISTORIQUE',
      value: null
    }
    this.props.dispatch(action)
  }

  _rechercheHistorique(text) { //Permet de chercher un produit dans l'historique
    const action = {
      type: 'RECHERCHE_HISTORIQUE',
      value: text
    }
    this.props.dispatch(action)
  }


  render() {

    return (
      <View style={styles.view}>

        <View style={styles.header}>
          <TextInput ref={input => { this.input = input }} style={styles.textinput} placeholder='Rechercher un produit' onChangeText={(text) => this._getText(text)} />
          <View style={{ paddingRight: 10 }}>
            <Icon name='close-o' type='evilicon' color='grey' onPress={() => this._getText('')} />
          </View>
          <Icon name='search' type='evilicon' color='grey' size={40} onPress={() => { this._rechercheHistorique(this.textInput) }} />
          <Icon name='trash' type='evilicon' color='red' size={40} onPress={() => { this._videHistorique() }} />
        </View>

        <View style={styles.historique}>
          <Text style={styles.texte_historique}>Historique</Text>

          <FlatList
            data={this.props.historiqueProduits}
            keyExtractor={item => item.code_barre.toString()}
            renderItem={({ item }) => <ProduitItem produit={item} navigation={this.props.navigation} />}
          />


          <View style={{ alignItems: 'center' }}>
            <Icon raised name='restaurant' type='ionicons' size={28} color='#2dcc70' onPress={() => { this.props.navigation.navigate('MaConsommation') }} />
          </View>

        </View>

      </View>
    )
  }

}

export default connect(mapStateToProps)(MonPanier)

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textinput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#EFEFEF',
    marginRight: -28,
    marginLeft: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EFEFEF'
  },
  historique: {
    flex: 12,
    paddingLeft: 9
  },
  texte_historique: {
    marginBottom: 10,
    fontSize: 25,
    fontWeight: 'bold'
  }
})