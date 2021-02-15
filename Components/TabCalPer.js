import React from 'react'
import { Button, View, TouchableOpacity,StyleSheet,ImageBackground,Text,Dimensions} from 'react-native'
import TabCalJour from './TabCalJour'
import backgroundImage from './PommeStat2.jpg'


class TabCalPer extends React.Component {



  render(){
    return(
      <ImageBackground source={backgroundImage} style= {styles.backgroundContainer}>
        <View>
        <TouchableOpacity style={styles.bouton}
                 onPress={()=>{this.props.navigation.navigate('TabCalJour')}}>
                   <Text style={styles.texte}>Jour</Text>
       </TouchableOpacity>

       <TouchableOpacity style={styles.bouton}
                 onPress={()=>{this.props.navigation.navigate('TabCalSemaine')}}>
                   <Text style={styles.texte}>Semaine</Text>
      </TouchableOpacity>

     <TouchableOpacity style={styles.bouton}
                 onPress={()=>{this.props.navigation.navigate('TabCalMois')}}>
                   <Text style={styles.texte}>Mois</Text>
      </TouchableOpacity>
        </View>
        </ImageBackground>
    )
}

}

const style=StyleSheet.create({
 
})
export default TabCalPer

const {width: WIDTH} = Dimensions.get('window')

const styles = StyleSheet.create({
  backgroundContainer:{
      flex: 1,
      width:null,
      height:null,
      justifyContent:'flex-start',
      alignItems:'center' 
  },
  bouton:{
    backgroundColor:'#40e0d0',
    width:WIDTH-155,
    height:45,
    borderRadius: 25, 
    marginTop:100
  },
  texte:{
    textAlign:'center',
    fontSize:30,
    color:'white'
  }
})