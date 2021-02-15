import React from 'react'
import { Button, View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { ECharts } from 'react-native-echarts-wrapper';
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    totalCalories: state.totalCalories.totalCalories,
    Sem: state.totalCalories.Sem,
    Sem2: state.totalCalories.Sem2,
    Sem3: state.totalCalories.Sem3,
    Sem4: state.totalCalories.Sem4,
    kcalProfil: state.totalCalories.kcalProfil
  }
}

let CouleurS1, CouleurS2, CouleurS3, CouleurS4


class TabCalSemaine extends React.Component {


  constructor(props) {
    super(props)
  }



  render() {


    if (this.props.Sem > this.props.kcalProfil * 7) {
      CouleurS1 = 'red'
    } else { CouleurS1 = '#2dcc70' }
    if (this.props.Sem2 > this.props.kcalProfil * 7) {
      CouleurS2 = 'red'
    } else { CouleurS2 = '#2dcc70' }
    if (this.props.Sem3 > this.props.kcalProfil * 7) {
      CouleurS3 = 'red'
    } else { CouleurS3 = '#2dcc70' }
    if (this.props.Sem4 > this.props.kcalProfil * 7) {
      CouleurS4 = 'red'
    } else { CouleurS4 = '#2dcc70' }


    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1.2 }}>
          <TouchableOpacity style={style.button}>
            <Button
              title='Jour'
              color='#2dcc70'
              onPress={() => { this.props.navigation.navigate('TabCalJour') }}
            //Dirige ver la vue Jour
            />
          </TouchableOpacity>
          <TouchableOpacity style={style.button}>
            <Button
              title='Semaine'
              color='seagreen'
            />
          </TouchableOpacity>
          <TouchableOpacity style={style.button}>
            <Button
              title='Mois'
              color='#2dcc70'
              onPress={() => { this.props.navigation.navigate('TabCalMois') }}
            //Dirige ver la vue Mois
            />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 8 }}>
          <ECharts option={{
            color: '#40e0d0',
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
              data: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4']
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
                  value: this.props.Sem,
                  itemStyle: { color: CouleurS1 }
                },
                {
                  value: this.props.Sem2,
                  itemStyle: { color: CouleurS2 }
                },
                {
                  value: this.props.Sem3,
                  itemStyle: { color: CouleurS3 }
                },
                {
                  value: this.props.Sem4,
                  itemStyle: { color: CouleurS4 }
                },
                ],
              type: 'bar'
            }]
          }} />
        </View>
        <View style={{ flexDirection: 'row', flex: 0.3, paddingLeft: 6 }}>
          {Platform.OS === 'ios' ? <View style={{ backgroundColor: '#2dcc70', paddingLeft: 15, marginBottom: 3 }}></View> :
            <Button title=' ' color='#2dcc70' />}
          <Text> Votre consommation ne dépasse pas la limite.</Text>
        </View>
        <View style={{ flexDirection: 'row', flex: 0.3, paddingLeft: 6 }}>
          {Platform.OS === 'ios' ? <View style={{ backgroundColor: 'red', paddingLeft: 15, marginTop: 3 }}></View> :
            <Button title=' ' color='red' />}
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




export default connect(mapStateToProps)(TabCalSemaine)
