import React from 'react'
import { View, StyleSheet, Animated, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class BarreSel extends React.Component {
    constructor(props) {
        super(props)
        this.sel = this.props.sel,
        this.state = {
            deplacement: new Animated.Value(0),
            valeur: 0,
            color: 'green'
        }
    }

    componentDidMount() {

        if (this.sel > 2.3) {
            this.state.valeur = 297 //Impossible d'effectuer un setState ici, Pourquoi ?
            this.setState({ color: 'red'})
        }
        else if (this.sel <= 0.92) {
            this.state.valeur = this.sel*108.69

        }
        else if ((this.sel > 0.92) && (this.sel <= 1.62)) {
            this.state.valeur = this.sel*123.45
            this.setState({ color: 'orange'})
        }
        else if ((this.sel > 1.62) && (this.sel <= 2.3))
        {
            this.state.valeur = this.sel*130.43
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
                    <Text>0.92</Text>
                    </View>

                    <View style={{width: 100}}>
                        <Text>1.62</Text>
                    </View>

                    <View>
                        <Text>2.3+</Text>
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