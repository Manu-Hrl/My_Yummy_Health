import React from 'react'
import { StyleSheet, Text, TextInput, View, SafeAreaView, ScrollView, Picker } from 'react-native'


export class PerdreDuPoids extends React.Component {

    /*Constructor nécessaire pour le picker qui est mis en place*/
    constructor(props) {
        super(props);
        this.state = {
            state: 'activite',
            poids: 0,
            duree: 0,
        }
    }

    render() {

        /*Les différentes variables déclarées permettant le calcul*/
        let x = this.state.poids;
        let y = this.state.duree;
        let z = this.state.activite; /*z représente le value de chaque activité physique présente dans le picker*/
        let MET;

        /*On associe donc chaque sport à un MET qui est une constante propre à chaque sport représentant l'intensité 
        physique du sport en question: nécessaire au calcul de calorie*/
        /*Formule de calcul du nombre de calories:
        [(MET x 3.5 x poids)/200] x durée */
        if (z == 1) {
            MET = 7
        } else if (z == 2) {
            MET = 7
        } else if (z == 3) {
            MET = 8.5
        } else if (z == 4) {
            MET = 8
        } else if (z == 5) {
            MET = 10.5
        } else if (z == 6) {
            MET = 13
        } else if (z == 7) {
            MET = 3
        } else if (z == 8) {
            MET = 4.5
        } else if (z == 9) {
            MET = 10
        } else if (z == 10) {
            MET = 8
        } else if (z == 11) {
            MET = 8
        } else if (z == 12) {
            MET = 8
        }

        if (isNaN(MET)) {
            MET = 0
        }

        return (


            /*Vue décomposée en deux parties distinctes: un scrollview avec les conseils dans un petit rectangle et 
            un autre scrollview qui contient tout le nécessaire pour calculer le nombre de calories d'un sport*/
            <View style={styles.container}>

                {/*Ici c'est le scrollview des conseils*/}
                <SafeAreaView>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.limiteUn}>


                            <Text style={styles.white}>Si vous êtes ici, cela signifie une seule chose: vous vous êtes décidés
                            à perdre du poids! Et on ne peut que vous féliciter et vous encourager pendant
                            ce chemin périlleux en quête d'une bonne santé.
                            Comme pour toute grande aventure, de nombreux obstacles vous attendent. Cependant
                            nous sommes là pour vous donner les conseils nécessaires à votre succès.
                            Lisez donc attentivement ce qui suit car ce sont les points clefs pour la perte de poids.
                            </Text>

                            <Text style={styles.white}>{"\n"}Le corps humain, pour fonctionner correctement, nécessite un
                                apport d'énergie (sous forme de calories ingérées) qui varie en fonction des individus et de
                                leurs caractéristiques telles leur sexe et leur poids.{"\n"}Pour que votre poids ne varie pas
                                vous avez donc besoin d'un apport en calorie qui soit égal à votre dépense énergétique. S'il y
                                a déséquilibre entre votre apport et votre dépense d'énergie vous pouvez soit prendre du poids,
                                soit en perdre.{"\n"}Ici nous allons vous aider à perdre du poids: vous devez donc dépenser
                                plus de calories que vous en consommer (une sorte de déficit).{"\n"}Pour cela, deux solutions:
                                {"\n"}  -Diminuer les apports en mangeant moins
                                {"\n"}  -Augmenter les dépenses en bougeant plus.
                            </Text>
                            <Text style={styles.white}>{"\n"}La façon la plus saine qui soit pour perdre ces kilos
                            en trop (et donc celle que nous vous conseillons) et de faire plus de sport.{"\n"}Ainsi nous
                            vous proposons plusieurs activités qui vous aideront à mener une vie plus active et en fonction
                            de la durée d'effort que vous décider de fournir vous verrez afficher le nombre de Kcal que vous
                            dépenserez.{"\n"}</Text>

                        </View>

                        {/*Ici c'est le scrollview qui contient toutes les choses nécessaires au calcul*/}
                        <View style={styles.limiteDeux}>

                            <SafeAreaView>
                                <ScrollView>

                                    {/*Tout d'abord deux textinput numériques pour rentrer le poids et la durée du sport*/}
                                    <Text>{"\n"}{"\n"}</Text>
                                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Entrez votre poids et la durée d'activité physique que vous comptez effectuer:</Text>
                                    <View style={styles.ligne}>
                                        <TextInput placeholder="Poids (en Kg)" keyboardType="numeric" textAlign="center" onChangeText={(poids) => { this.setState({ poids }) }} />
                                        <TextInput placeholder="Durée (en min)" keyboardType="numeric" textAlign="center" onChangeText={(duree) => { this.setState({ duree }) }} />
                                    </View>

                                    {/*Ensuite un picker pour choisir quelle activité faire*/}
                                    <Text style={{ fontWeight: "bold", marginLeft: 5 }}>{"\n"}{"\n"}Choisissez une activité:</Text>
                                    <Picker
                                        mode="dropdown"
                                        style={{ marginRight: 70 }}
                                        selectedValue={this.state.activite}
                                        onValueChange={(sport) => this.setState({ activite: sport })}>
                                        <Picker.Item label="Choisir une activité" value="0" />
                                        <Picker.Item label="Aviron" value="1" />
                                        <Picker.Item label="Bicyclette-vélo" value="2" />
                                        <Picker.Item label="Corde à sauter" value="3" />
                                        <Picker.Item label="Course à pied (8km/h)" value="4" />
                                        <Picker.Item label="Course à pied (9,5km/h)" value="5" />
                                        <Picker.Item label="Course à pied (13km/h)" value="6" />
                                        <Picker.Item label="Marche" value="7" />
                                        <Picker.Item label="Marche rapide" value="8" />
                                        <Picker.Item label="Natation (brasse)" value="9" />
                                        <Picker.Item label="Natation (crawl)" value="10" />
                                        <Picker.Item label="Natation (dos crawlé)" value="11" />
                                        <Picker.Item label="Zumba" value="12" />
                                    </Picker>

                                    {/*Et enfin le résultat en calories*/}
                                    <Text style={{ fontWeight: "bold", marginLeft: 5, fontSize: 20 }}>Vous allez dépenser: <Text style={{ color: "blue" }}>{(((MET * 3.5 * x) / 200) * y).toFixed(0)}</Text> Kcal</Text>
                                    <Text>{"\n"}{"\n"}{"\n"}{"\n"}</Text>
                                </ScrollView>
                            </SafeAreaView>

                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}

/*Les différents styles pour que ça soit joli*/
const styles = StyleSheet.create({
    container: {
        flex: 4,
        backgroundColor: 'white'
    },
    scrollView: {
        marginHorizontal: 15,
        borderWidth: 2,
        borderColor: 'white',
    },
    white: {
        color: 'grey'
    },
    limiteUn: {
        flex: 1,
    },
    limiteDeux: {
        flex: 3,
    },
    ligne: {
        marginTop: 10,
    }
});
