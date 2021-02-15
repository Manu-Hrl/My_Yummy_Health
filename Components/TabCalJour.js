import React from 'react'
import { Button, View, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native'
import { ECharts } from 'react-native-echarts-wrapper'
import { connect } from 'react-redux'

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
    verifSemaine: state.totalCalories.verifSemaine
  }
}


let CouleurLun, CouleurMar, CouleurMer, CouleurJeu, CouleurVen, CouleurSam, CouleurDim
let day = new Date().getDay();

export class TabCalJour extends React.Component {

  constructor(props) {
    super(props)
  }




  render() {

    if (this.props.verifSemaine === 1 && day === 1) {
      const action = {
        type: 'REINIT_SEM',
        value: null,
      }
      this.props.dispatch(action)
    }

    /*Les 7 if qui suivent permettent de verifier pour chaque jour si la valeur de la consommation ne vaut pas plus que la valeur présente
    dans la vue profil qui est la limite de consommation journalière.*/

    if (this.props.Lun > this.props.kcalProfil) {
      CouleurLun = 'red'
    } else { CouleurLun = '#2dcc70' }

    if (this.props.Mar > this.props.kcalProfil) {
      CouleurMar = 'red'
    } else { CouleurMar = '#2dcc70' }

    if (this.props.Mer > this.props.kcalProfil) {
      CouleurMer = 'red'
    } else { CouleurMer = '#2dcc70' }

    if (this.props.Jeu > this.props.kcalProfil) {
      CouleurJeu = 'red'
    } else { CouleurJeu = '#2dcc70' }

    if (this.props.Ven > this.props.kcalProfil) {
      CouleurVen = 'red'
    } else { CouleurVen = '#2dcc70' }

    if (this.props.Sam > this.props.kcalProfil) {
      CouleurSam = 'red'
    } else { CouleurSam = '#2dcc70' }

    if (this.props.Dim > this.props.kcalProfil) {
      CouleurDim = 'red'
    } else { CouleurDim = '#2dcc70' }

    const ConsJour = this.props.totalCalories
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1.2 }}>
          <TouchableOpacity style={style.button}>
            <Button

              title='Jour'
              color='seagreen'
            />
          </TouchableOpacity>
          <TouchableOpacity style={style.button}>
            <Button

              title='Semaine'
              color='#2dcc70'
              onPress={() => { this.props.navigation.navigate('TabCalSemaine') }}
            //Dirige vers la vue Semaine
            />
          </TouchableOpacity>
          <TouchableOpacity style={style.button}>
            <Button

              title='Mois'
              color='#2dcc70'
              onPress={() => { this.props.navigation.navigate('TabCalMois') }}
            //Dirige vers la vue Mois  

            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 7.5, paddingLeft: 6 }}>
          <ECharts option={{
            color: '#40e0d0',
            xAxis: {
              type: 'category',
              axisLabel: {
                rotate: 45,
                textStyle: {
                  baseline: "top",
                  fontSize: 12,
                  fontWeight: "bold"
                },
              },

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
            series: [{
              data: [{
                value: this.props.Lun,
                itemStyle: { color: CouleurLun }
              },
              {
                value: this.props.Mar,
                itemStyle: { color: CouleurMar }
              },
              {
                value: this.props.Mer,
                itemStyle: { color: CouleurMer }
              },
              {
                value: this.props.Jeu,
                itemStyle: { color: CouleurJeu }
              },
              {
                value: this.props.Ven,
                itemStyle: { color: CouleurVen }
              },
              {
                value: this.props.Sam,
                itemStyle: { color: CouleurSam }
              },
              {
                value: this.props.Dim,
                itemStyle: { color: CouleurDim }
              },
              ],
              //Recupere chaque valeur dans le store
              type: 'bar'
            },
            {
              data: [this.props.kcalProfil, this.props.kcalProfil, this.props.kcalProfil, this.props.kcalProfil, this.props.kcalProfil, this.props.kcalProfil, this.props.kcalProfil],
              type: "line",
              color: '#2dcc70',
              showSymbol: false,
            },  //limite de consommation journalière 
            {
              data: [this.props.kcalProfil + 500],
              type: "line",
              color: 'transparent',
              showSymbol: false,
            } //permet d'avoir le graphique plus grand et que la limite ne soit pas tout en haut. Est donc invisible
            ],


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
        <View style={{ flexDirection: 'row', flex: 0.8, paddingLeft: 6 }}>
          <Text style={style.texte}>___</Text>
          <Text style={{ alignItems: 'center', flex: 1 }} onPress={() => { this.props.navigation.navigate('Profil') }}> Limite de votre consommation journalière. {"\n"} Vous pouvez la modifier ici</Text>
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
  texte: {
    color: '#2dcc70'
  }
})


export default connect(mapStateToProps)(TabCalJour)