import React from 'react'
import { Button, View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { ECharts } from 'react-native-echarts-wrapper'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    totalCalories: state.totalCalories.totalCalories,
    Mois: state.totalCalories.Mois,
    Mois2: state.totalCalories.Mois2,
    Mois3: state.totalCalories.Mois3,
    Mois4: state.totalCalories.Mois4,
    kcalProfil: state.totalCalories.kcalProfil,
    verifMois: state.totalCalories.verifMois
  }
}

let month = new Date().getMonth();
let CouleurM1, CouleurM2, CouleurM3, CouleurM4

class TabCalMois extends React.Component {

  constructor(props) {
    super(props)
  }
  //gs
  //Remet à 0 la variable Mois dans le store car un nouveau mois à commencer et change les autres mois 

  render() {

    if (month != this.props.verifMois) {
      const action = {
        type: 'REINIT_MOIS',
        value: month,
      }
      this.props.dispatch(action)
    }

    if (this.props.Mois > this.props.kcalProfil * 31) {
      CouleurM1 = 'red'
    } else { CouleurM1 = '#2dcc70' }
    if (this.props.Mois2 > this.props.kcalProfil * 31) {
      CouleurM2 = 'red'
    } else { CouleurM2 = '#2dcc70' }
    if (this.props.Mois3 > this.props.kcalProfil * 31) {
      CouleurM3 = 'red'
    } else { CouleurM3 = '#2dcc70' }
    if (this.props.Mois4 > this.props.kcalProfil * 31) {
      CouleurS4 = 'red'
    } else { CouleurM4 = '#2dcc70' }

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1.2 }}>
          <TouchableOpacity style={style.button}>
            <Button
              type='solid'
              title='Jour'
              color='#2dcc70' //Turquoise 
              onPress={() => { this.props.navigation.navigate('TabCalJour') }}

            //Dirige ver la vue Jour
            />
          </TouchableOpacity>
          <TouchableOpacity style={style.button}>
            <Button
              type='solid'
              title='Semaine'
              color='#2dcc70'
              onPress={() => { this.props.navigation.navigate('TabCalSemaine') }}
            //Dirige ver la vue Semaine
            />
          </TouchableOpacity>
          <TouchableOpacity style={style.button}>
            <Button
              type='solid'
              title='Mois'
              color='seagreen'
            />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 8 }}>
          <ECharts option={{
            color: '#2dcc70',
            xAxis: {
              type: 'category',
              axisLabel: {
                rotate: 45,
                textStyle: {
                  baseline: "top",
                  color: "#333",
                  fontSize: 12,
                  fontWeight: "bold"
                },
              },
              data: ['Mois 1', 'Mois 2', 'Mois 3', 'Mois 4']
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
            series: [{
              data:
                [{
                  value: this.props.Mois,
                  itemStyle: { color: CouleurM1 }
                },
                {
                  value: this.props.Mois2,
                  itemStyle: { color: CouleurM2 }
                },
                {
                  value: this.props.Mois3,
                  itemStyle: { color: CouleurM3 }
                },
                {
                  value: this.props.Mois4,
                  itemStyle: { color: CouleurM4 }
                },
                ],
              type: 'bar'
            }],
          }} />
        </View>
        <View style={{ flexDirection: 'row', flex: 0.3, paddingLeft: 6 }}>
          {Platform.OS === 'ios' ? <View style={{backgroundColor: '#2dcc70',paddingLeft:15, marginBottom: 3}}></View> :
           <Button title=' ' color='#2dcc70'/>}
          <Text> Votre consommation ne dépasse pas la limite.</Text>
        </View>
        <View style={{ flexDirection: 'row', flex: 0.3, paddingLeft: 6 }}>
          {Platform.OS === 'ios' ? <View style={{backgroundColor: 'red',paddingLeft:15, marginTop: 3}}></View> : 
           <Button title=' ' color='red'/> }
          <Text> Votre consommation dépasse la limite.</Text>
        </View>
        <View style={{ flexDirection: 'row', flex: 0.2, paddingLeft: 6 }}>
        </View>
      </View>


    );

  }
}

const style = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginTop: 20
  },
})

export default connect(mapStateToProps)(TabCalMois)
