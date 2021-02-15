//Component du scanner de code barres
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions' //Bibliothèque pour obtenir l'autorisation d'utiliser la caméra
import { BarCodeScanner } from 'expo-barcode-scanner' //Bibliothèque pour reconnaitre un code barre
import MaskQRcode from './MaskQRcode'

export default class Camera extends React.Component {
  state = {
    hasCameraPermission: null
  }

  async componentDidMount() { //Seulement lorsque le component est monté (renvoie quelque chose) on exécute ces fonctions
    this.getPermissionsAsync() //Demande la permission d'utiliser la caméra
  }

  getPermissionsAsync = async () => { //Demande la permission d'utiliser la caméra
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }  

  handleBarCodeScanned = ({ type, data }) => { //Récupères le type et numéro du code barre
    this.props.navigation.navigate('AfficheProduit', { code_barre: data })
  }

  render() {
    const { hasCameraPermission } = this.state

    if (hasCameraPermission === null) {
      return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Besoin de l'autorisation d'accès à la caméra</Text></View>
    }
    if (hasCameraPermission === false) {
      return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Pas d'accès à la caméra</Text></View>
    }
    
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}>

        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        <MaskQRcode />

      </View>
    )
  }
}