import React from 'react'
import { View, StyleSheet, Animated, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class BarreProteines extends React.Component {
    constructor(props) {
        super(props)
        this.proteines = this.props.proteines,
        this.state = {
            deplacement: new Animated.Value(0),
            valeur: 0,
            color: 'green'
        }
    }

    componentDidMount() {

        if (this.proteines > 16) {
            this.state.valeur = 297 //Impossible d'effectuer un setState ici, Pourquoi ?
            
        }
        else if (this.proteines <= 8) {
            this.state.valeur = this.proteines*18.75
            this.setState({ color: '#32CD32'})

        }
        else if ((this.proteines > 8) && (this.proteines <= 16)) {
            this.state.valeur = this.proteines*18.75
        }
        
        Animated.timing(
            this.state.deplacement,
            {
                toValue: this.state.valeur,
                duration: 3000
            }
        ).start()
    }

    render () {
        
        return (
            <View style={{}}>
                <Animated.View style={{ height: 20, width: 20, left: this.state.deplacement, alignItems: 'flex-start'}}>

                    <TouchableOpacity style={{paddingTop:5}}>
                    <Icon style={styles.iconeFooter} name='chevron-down' type='octicon' color={this.state.color} size={15}></Icon>
                    </TouchableOpacity>
                    
                </Animated.View>

                <View style={styles.barre}>
                    <View style={styles.vert_clair}>
                    </View>

                    <View style={styles.vert}>
                    </View>

                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: 150}}>
                    <Text style={{paddingLeft: 5}}>0</Text>
                    </View>

                    <View style={{width: 150}}>
                    <Text>8</Text>
                    </View>

                    <View>
                        <Text>16+</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    barre: {
        flex: 1,
        padding: 5,
        flexDirection: 'row',
       
        //backgroundColor:'pink'
    },

    vert: {
        height: 10,
        width: 150,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: 'green'
    },
    vert_clair: {
        height: 10,
        width: 150,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: '#32CD32'
    }
})