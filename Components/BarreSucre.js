import React from 'react'
import { View, StyleSheet, Animated, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class BarreSucre extends React.Component {
    constructor(props) {
        super(props)
        this.sucre = this.props.sucre,
        this.state = {
            deplacement: new Animated.Value(0),
            valeur: 0,
            color: 'green'
        }
    }

    componentDidMount() {

        if (this.sucre > 45) {
            this.state.valeur = 297 //Impossible d'effectuer un setState ici, Pourquoi ?
            this.setState({ color: 'red'})
        }
        else if (this.sucre <= 18) {
            this.state.valeur = this.sucre*5.55

        }
        else if ((this.sucre > 18) && (this.sucre <= 31)) {
            this.state.valeur = this.sucre*6.45
            this.setState({ color: 'orange'})
        }
        else if ((this.sucre > 31) && (this.sucre <= 45))
        {
            this.state.valeur = this.sucre*6.66
            this.setState({ color: 'red'})
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
                    <View style={styles.vert}>

                    </View>

                    <View style={styles.orange}>

                    </View>

                    <View style={styles.rouge}>

                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: 100}}>
                    <Text style={{paddingLeft: 5}}>0</Text>
                    </View>

                    <View style={{width: 100}}>
                    <Text>18</Text>
                    </View>

                    <View style={{width: 100}}>
                        <Text>31</Text>
                    </View>

                    <View>
                        <Text>45+</Text>
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

    rouge: {
        height: 10,
        width: 100,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: 'red'
    },

    orange: {
        height: 10,
        width: 100,
        backgroundColor: 'orange'
    },

    vert: {
        height: 10,
        width: 100,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: 'green'
    }
})