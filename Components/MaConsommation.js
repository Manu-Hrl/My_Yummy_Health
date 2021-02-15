import React from 'react'
import { View, FlatList, StyleSheet, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Icon } from 'react-native-elements'

const mapStateToProps = (state) => {
  return {
    totalCalories: state.totalCalories.totalCalories,
    maConsommation: state.modificationConsommation.maConsommation
  }
}

export class MaConsommation extends React.Component {
  constructor(props) {
    super(props)
  }

  _supprimeProduitConsommation(item) {
    const action = {
      type: 'SUPPRIME_CONSOMMATION',
      value: item
    }
    this.props.dispatch(action)

    const action2 = {
      type: 'SUPPRIME_CALORIES',
      value: item.caloriesSelect
    }
    this.props.dispatch(action2)
  }

  _videMaConsommation() {
    const action = {
      type: 'VIDER_CONSOMMATION',
      value: null
    }
    this.props.dispatch(action)

    const action2 = {
      type: 'INIT_CALORIES',
      value: null
    }
    this.props.dispatch(action2)
  }

  render() {

    return (
      <View style={styles.main_container}>
        <View style={styles.container_total}>

          <Icon name='trash' type='evilicon' color='red' size={40} onPress={() => { this._videMaConsommation() }} />

          <FlatList
            data={this.props.maConsommation}
            keyExtractor={item => item.code_barre.toString()}
            renderItem={({ item }) =>
              <ListItem
                title={item.nom_produit}
                titleStyle={{ marginBottom: 10, fontWeight: 'bold' }}
                subtitle={'Calories sélectionnées : ' + item.caloriesSelect}
                subtitleStyle={{ fontStyle: 'italic' }}
                rightIcon={<Icon raised name='minus' type='evilicon' color='red' size={26} onPress={() => { this._supprimeProduitConsommation(item) }} />}
                leftElement={<Image source={{ uri: item.image }} style={{ height: 100, width: 50 }} resizeMode='contain' />}
                bottomDivider={true}
              />
            }
          />
        </View>
        
        <View style={styles.container}>
          <Text style={styles.total_text}>Total calories sélectionnées : {this.props.totalCalories}</Text>
        </View>

      </View>
    )
  }

}
/*<ProduitITemConsommation produit={item} />*/
export default connect(mapStateToProps)(MaConsommation)

const styles = StyleSheet.create({
  container: {
    flex: 0.5 / 10,
    flexDirection: "row",
    backgroundColor: '#ffdab9',
    borderRadius: 15,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 10,
    position: 'absolute',
    bottom: 0,
  },
  container_total: {
    flex: 10 / 10
  },
  main_container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#fff'
  },
  total_text: {
    fontWeight: 'bold',
    fontSize: 13,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
})