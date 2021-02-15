import React from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'

export class GagnerDuPoids extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <ScrollView style={styles.scrollView}>

                        <Text style={styles.white}>{"\n"}Si vous êtes ici, cela signifie une seule chose: vous vous êtes décidés
                                    à gagner du poids! Et on ne peut que vous féliciter et vous encourager pendant
                                    ce chemin périlleux en quête d'une bonne santé.
                                    Comme pour toute grande aventure, de nombreux obstacles vous attendent. Cependant
                                    nous sommes là pour vous donner les conseils nécessaires à votre succès.
                                    Lisez donc attentivement ce qui suit car ce sont les points clefs pour le gain de poids.
                            </Text>
                        <Text style={styles.white}>{"\n"}Le corps humain, pour fonctionner correctement, nécessite un
                                apport d'énergie (sous forme de calories ingérées) qui varie en fonction des individus et de
                                leurs caractéristiques telles leur sexe et leur poids.{"\n"}Pour que votre poids ne varie pas
                                vous avez donc besoin d'un apport en calorie qui soit égal à votre dépense énergétique. S'il y
                                a déséquilibre entre votre apport et votre dépense d'énergie vous pouvez soit prendre du poids,
                                soit en perdre.{"\n"}Ici nous allons vous aider à prendre du poids: vous devez donc consommer
                                plus de calories que vous en dépensez.{"\n"}
                        </Text>
                        <Text style={styles.white}>Ceci dit, il ne s'agit pas de manger le plus possible pour prendre
                        de "mauvais" kilos. En effet, rien ne sert de remplir nos tissus adipeux (plus connus sous le nom
                        de gras): il est préférable de gagner en muscle. Pour cela, une bonne alimentation saine et remplie
                        en protéines est le premier pas important. Mais l'alimentation à elle seule ne permet pas de prendre du
                            poids, ainsi deux solutions s'offrent à vous:{"\n"}
                                -la musculation{"\n"}
                                -la tonification musculaire.{"\n"}{"\n"}{"\n"}{"\n"}</Text>
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollView: {
        marginHorizontal: 15,
        borderWidth: 2,
        borderColor: 'white',
    },
    white: {
        color: 'grey',
        marginLeft: 10,
    }
});
export default GagnerDuPoids