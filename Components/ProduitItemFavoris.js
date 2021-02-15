import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    mesFavoris: state.modificationFavoris.mesFavoris
  }
}

class ProduitITemFavoris extends React.Component {

  _supprimeProduit() {
    const action = {
      type: 'SUPPRIME_FAVORIS',
      value: this.props.produit
    }
    this.props.dispatch(action)
  }

  render() {
    const produit = this.props.produit

    return (

      <View style={styles.detail_container}>
        <View style={styles.header_content}>



          <Icon raised name='minus' type='evilicon' color='red' size={26} onPress={() => { this._supprimeProduit() }} />
        </View>


      </View>


    )
  }

}

export default connect(mapStateToProps)(ProduitITemFavoris)

const styles = StyleSheet.create({
  detail_container: {
    flex: 1,
    margin: 2,
    backgroundColor: '#fff'
  },
  header_content: {
    flex: 6,
    justifyContent: "flex-start", alignItems: "flex-start",
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: "center",
    alignItems: "center"
  },


})
