//Component Masque du scan
import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('screen') //Constante qui prend pour dimension celle de l'écran

export default class MaskQRcode extends React.Component {

  render() {

    const leftTop = {
      borderLeftWidth: 3,
      borderTopWidth: 3,
      borderColor: 'white'
    }
    const leftBottom = {
      borderLeftWidth: 3,
      borderBottomWidth: 3,
      borderColor: 'white'
    }
    const rightTop = {
      borderRightWidth: 3,
      borderTopWidth: 3,
      borderColor: 'white'
    }
    const rightBottom = {
      borderRightWidth: 3,
      borderBottomWidth: 3,
      borderColor: 'white'
    }

    return (
      <View style={{ ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: width, height: width, padding: 20 }}>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, ...leftTop }} />
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1, ...rightTop }} />
          </View>

          <View style={{ flex: 1 }} />

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, ...leftBottom }} />
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1, ...rightBottom }} />
          </View>

        </View>
      </View>
    );
  }
}