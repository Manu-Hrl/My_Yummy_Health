import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    totalCalories: state.totalCalories.totalCalories,
    maConsommation: state.modificationConsommation.maConsommation
  }
}


class ProduitITemConsommation extends React.Component {

  _supprimeProduit() {
    const action = {
      type: 'SUPPRIME_CONSOMMATION',
      value: this.props.produit
    }
    this.props.dispatch(action)

    const action2 = {
      type: 'SUPPRIME_CALORIES',
      value: this.props.produit.caloriesSelect
    }
    this.props.dispatch(action2)
  }

  render() {
    const produit = this.props.produit

    return (
      <View style={styles.detail_container}>
        <View style={styles.header_content}>

          <Text style={styles.title_text}>{produit.nom_produit}</Text>
          <Text style={styles.calorie_text}>kcal/{produit.quantite}: {produit.caloriesSelect}</Text>

          <Icon raised name='minus' type='evilicon' color='red' size={26} onPress={() => { this._supprimeProduit() }} />
        </View>


      </View>


    )
  }

}

export default connect(mapStateToProps)(ProduitITemConsommation)

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
  title_text: {
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  calorie_text: {
    fontWeight: 'bold',
    fontSize: 13,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    justifyContent: "center",
    alignItems: "center"
  },



})
