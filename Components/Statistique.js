import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { ECharts } from 'react-native-echarts-wrapper'

const mapStateToProps = (state) => {
  return {
    totalCalories: state.totalCalories.totalCalories,
    Lun: state.totalCalories.Lun,
    Mar: state.totalCalories.Mar,
    Mer: state.totalCalories.Mer,
    Jeu: state.totalCalories.Jeu,
    Ven: state.totalCalories.Ven,
    Sam: state.totalCalories.Sam,
    Dim: state.totalCalories.Dim,
    kcalProfil: state.totalCalories.kcalProfil,
    verifSemaine: state.totalCalories.verifSemaine,
    premiereConnexion: state.totalCalories.premiereConnexion
  }
}

let day = new Date().getMonth();


export class TabCalJour extends React.Component {

  constructor(props) {
    super(props)
  }

  _boutonJour() {
    if (this.props.premiereConnexion === 0) {
      const action = {
        type: 'INIT_MOIS',
        value: day,
      }
      this.props.dispatch(action)
    }
    this.props.navigation.navigate('TabCalJour')
  }
  _boutonSem() {
    if (this.props.premiereConnexion === 0) {
      const action = {
        type: 'INIT_MOIS',
        value: day,
      }
      this.props.dispatch(action)

    }
    this.props.navigation.navigate('TabCalSemaine')
  }
  _boutonMois() {
    if (this.props.premiereConnexion === 0) {
      const action = {
        type: 'INIT_MOIS',
        value: day,
      }
      this.props.dispatch(action)

    }
    this.props.navigation.navigate('TabCalMois')
  }


  render() {

    const ConsJour = this.props.totalCalories
    return (
      <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'space-around', paddingTop: 30 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity style={style.button} onPress={() => { this._boutonJour() }}>
          <Text style={style.texte}>Jour</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.button} onPress={() => { this._boutonSem() }}>
          <Text style={style.texte}>Semaine</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.button} onPress={() => { this._boutonMois() }}>
            <Text style={style.texte}>Mois</Text>
          </TouchableOpacity>

        </View>
        <View style={{ flex: 8, paddingLeft: 6 }}>
          <ECharts option={{
            color: '#40e0d0',
            xAxis: {
              type: 'category',
              data: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                rotate: 0,
                textStyle: {
                  color: "#333",
                  fontSize: 11,
                  fontWeight: "bold"
                },
              },
            },
            series: [
              {
                data: [this.props.kcalProfil + 500],
                type: "line",
                color: 'transparent',
                showSymbol: false,
              },
              {
                data: [
                  {
                    value: 1500,
                    itemStyle: { color: 'orange' }
                  },
                  {
                    value: 2300,
                    itemStyle: { color: 'grey' }
                  },
                  {
                    value: 2700,
                    itemStyle: { color: '#1E90FF' }
                  },
                  {
                    value: 2100,
                    itemStyle: { color: 'grey' }
                  },
                  {
                    value: 3000,
                    itemStyle: { color: 'red' }
                  },
                  {
                    value: 2400,
                    itemStyle: { color: 'grey' }
                  },
                  {
                    value: 2150,
                    itemStyle: { color: '#9ACD32' }
                  }
                ],
                type: 'bar'
              }],
          }} />

        </View>
        <View style={{ flex: 1.5, paddingLeft: 4, justifyContent: 'space-between', marginBottom: 6 }}>
        <View style={{flexDirection: 'row', flex: 0.3}}>  
          <Text>cliquez sur les boutons :</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 0.3}}>  
          <Text>Jour => pour vos statistiques journalières</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 0.3}}>
          <Text>Semaine => pour vos statistiques hebdomadaires</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 0.3 }}> 
          <Text>Mois => pour vos statistiques mensuelles</Text>
        </View>
        </View>

      </View>
    );

  }
}

export default connect(mapStateToProps)(TabCalJour)

const style = StyleSheet.create({
  button: {
    width: 70,
    height: 40,
    borderRadius: 0,
    backgroundColor: '#2dcc70', //Nuance de vert
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 3
  },
  texte: {

    fontSize: 16,
    color: 'white'
  }
})