import React from "react";
import { StyleSheet,Text, View,Button } from "react-native";
import { connect } from 'react-redux'
import { ECharts, } from 'react-native-echarts-wrapper'

let day = new Date().getDay();
let jouractu,CouleurLun,CouleurMar,CouleurMer,CouleurJeu,CouleurVen,CouleurSam,CouleurDim,nbrpas


const mapStateToProps = (state) => {
  return {
   Lun_: state.nombrePas.Lun_,
   Mar_: state.nombrePas.Mar_,
   Mer_: state.nombrePas.Mer_,
   Jeu_: state.nombrePas.Jeu_,
   Ven_: state.nombrePas.Ven_,
   Sam_: state.nombrePas.Sam_,
   Dim_: state.nombrePas.Dim_,
   DebSem: state.nombrePas.DebSem,
   PasVoulu: state.nombrePas.PasVoulu
  }
}



export class Podometre extends React.Component {
  render() {
    if(this.props.DebSem===1&&day===1){
      const action = {
        type: 'REINIT_SEM',
        value: null
    }
    this.props.dispatch(action)
    }
    switch(day){
      case 0:
        jouractu=this.props.Dim_
    
    break;
    case 1:
        jouractu=this.props.Lun_
    
    break;
    case 2:
        jouractu=this.props.Mar_
    
    break;
    case 3:
        jouractu=this.props.Mer_
    
    break;
    case 4:
        jouractu=this.props.Jeu_
    
    break;
    case 5:
        jouractu=this.props.Ven_
    
    break;
    case 6:
        jouractu=this.props.Sam_
    
    break;
    }
    if(this.props.PasVoulu>this.props.Lun_){
      CouleurLun='grey'
    }else{
      CouleurLun='green'
    }
    if(this.props.PasVoulu>this.props.Mar_){
      CouleurMar='grey'
    }else{
      CouleurMar='green'
    }
    if(this.props.PasVoulu>this.props.Mer_){
      CouleurMer='grey'
    }else{
      CouleurMer='green'
    }
    if(this.props.PasVoulu>this.props.Jeu_){
      CouleurJeu='grey'
    }else{
      CouleurJeu='green'
    }
    if(this.props.PasVoulu>this.props.Ven_){
      CouleurVen='grey'
    }else{
      CouleurVen='green'
    }
    if(this.props.PasVoulu>this.props.Sam_){
      CouleurSam='grey'
    }else{
      CouleurSam='green'
    }
    if(this.props.PasVoulu>this.props.Dim_){
      CouleurDim='grey'
    }else{
      CouleurDim='green'
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.texte}>   
    <Text style={{fontSize:25,color:'black'}}>Aujourd'hui : {jouractu}/{this.props.PasVoulu} pas</Text> 
      </View>
         <ECharts option={{
        color:'black',
        backgroundColor:'white',
        xAxis: {
          type: 'category',
          axisLabel: {
            rotate: 45,
            textStyle: {
              baseline: "top",
              color: "black",
              fontSize: 12,
              fontWeight: "bold"
            },
          },
          data: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim',]
        },
        yAxis: {
          type: 'value',
          
          axisLabel: {
            rotate: 0,
            textStyle: {
              color: "black",
              fontSize: 9,
              fontWeight: "bold",
            },
          },
        },
        series: [
          {
            data: [0], 
              //Recupere chaque valeur dans le store
            type: 'bar',
            smooth: true,
            showSymbol: false,
            color:'black',
          },
          {
            data: [{value: this.props.Lun_,
              itemStyle:{color:CouleurLun}},
              {value: this.props.Mar_,
              itemStyle:{color:CouleurMar}},
              {value: this.props.Mer_,
              itemStyle:{color:CouleurMer}},
              {value: this.props.Jeu_,
              itemStyle:{color:CouleurJeu}},
              {value: this.props.Ven_,
              itemStyle:{color:CouleurVen}},
              {value: this.props.Sam_,
              itemStyle:{color:CouleurSam}},
              {value: this.props.Dim_,
              itemStyle:{color:CouleurDim}},
            ], 
            //Recupere chaque valeur dans le store
          type: 'bar',
          smooth: true,
          showSymbol: false,
        },
        {
          data: [0], 
            //Recupere chaque valeur dans le store
          type: 'bar',
          smooth: true,
          showSymbol: false,
          color:'white',
        },
        {
          data: [this.props.PasVoulu,this.props.PasVoulu,this.props.PasVoulu,this.props.PasVoulu,this.props.PasVoulu,this.props.PasVoulu,this.props.PasVoulu], 
            //Recupere chaque valeur dans le store
          type: 'line',
          smooth: true,
          showSymbol: false,
        },
        {
          data: [this.props.PasVoulu+500],
          type: "line",
          color:'transparent',
          showSymbol: false,
        },
        
      ],
  
    
        
      }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  texte:{
    alignSelf:'center',
    marginTop:40
  }
});

export default connect(mapStateToProps)(Podometre)