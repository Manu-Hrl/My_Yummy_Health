import React from 'react'
import { View, FlatList, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Icon } from 'react-native-elements'

const mapStateToProps = (state) => {
  return {
    mesFavoris: state.modificationFavoris.mesFavoris,
    historiqueProduits: state.modificationHistorique.historiqueProduits
  }
}

export class Favoris extends React.Component {

  constructor(props) {
    super(props)
  }
  _supprimeProduitFavoris(item) {
    const action = {
      type: 'AJOUT_FAVORIS',
      value: item
    }
    this.props.dispatch(action)
  }

  _videMesFavoris() {

    this.props.historiqueProduits.forEach(produit => produit.couleur_favoris = 'black') //Remet la couleur du coeur de chaque produit de l'historique en noir

    const action = {
      type: 'VIDER_FAVORIS',
      value: null
    }
    this.props.dispatch(action)

  }

  render() {

    return (
      <View style={styles.main_container}>
        <View style={styles.container_total}>

          <Icon name='trash' type='evilicon' color='red' size={40} onPress={() => { this._videMesFavoris() }} />

          <FlatList

            data={this.props.mesFavoris}
            keyExtractor={item => item.code_barre.toString()}
            renderItem={({ item }) =>
              <ListItem
                title={item.nom_produit}
                titleStyle={{ marginBottom: 10, fontWeight: 'bold' }}
                subtitle={'Nutriscore: ' + item.nutriscore.toUpperCase()}
                subtitleStyle={{ fontStyle: 'italic', color: item.couleur_nutriscore }}
                rightIcon={<Icon raised name='minus' type='evilicon' color='red' size={26} onPress={() => { this._supprimeProduitFavoris(item) }} />}
                leftElement={<Image source={{ uri: item.image }} style={{ height: 100, width: 50 }} resizeMode='contain' />}
                bottomDivider={true}
              />
            }
          />

        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps)(Favoris)

const styles = StyleSheet.create({

  container_total: {
    flex: 10 / 10
  },
  main_container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#fff'
  },
})