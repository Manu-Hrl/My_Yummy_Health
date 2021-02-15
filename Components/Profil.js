import React from 'react'
import { View, Text, Picker, Slider, StyleSheet, SafeAreaView, ScrollView, Dimensions, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'

export let tokenDeconnexion = false // token qui permet de ne pas supprimer les données dans la BDD lorsqu'on se déconnecte

const { width: WIDTH } = Dimensions.get('window')

const mapStateToProps = (state) => {
    return {
        kcalProfil: state.totalCalories.kcalProfil,
        Sexe: state.infoConso.Sexe,
        Poids: state.infoConso.Poids,
        Taille: state.infoConso.Taille,
        Age: state.infoConso.Age,
        PasVoulu: state.nombrePas.PasVoulu
    }
}

let lactose = 'false'
let noix = 'false'
let gluten = 'false'
let vegetarien = 'false'

export class Profil extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedLabel: '',
            slideValue: 0,
            age: 2000,
            taille: 2000,
            poids: 2000,
            calories: 1,
            sexe: 4,
            Pas: 1,
        }
    }
    Show = (value) => {
        alert(value);
        this.setState({ selectedLabel: value });
    }
    _calculIMC() {
        if (isNaN((this.state.poids / ((this.state.taille * 0.01) * (this.state.taille * 0.01))).toFixed(2))) {
            return 'inconnu'
        }
        return (this.state.poids / ((this.state.taille * 0.01) * (this.state.taille * 0.01))).toFixed(2)
    }
    _calculIMG() {
        if (isNaN((1.20 * (this.state.poids / ((this.state.taille * 0.01) * (this.state.taille * 0.01))) + 0.23 * (this.state.age) - 10.8 * this.state.sexe - 5.4).toFixed(2))) {
            return 'inconnu'
        }
        return (1.20 * (this.state.poids / ((this.state.taille * 0.01) * (this.state.taille * 0.01))) + 0.23 * (this.state.age) - 10.8 * this.state.sexe - 5.4).toFixed(2) + '%'
    }
    state = {
        lactoseun: false,
        lactosedeux: true
    }
    lactoseunPressed() {
        //alert('one');
        this.setState({ lactoseun: true, lactosedeux: false, OuiLait: true, NonLait: false });
    }
    lactosedeuxPressed() {
        //alert('two');
        this.setState({ lactoseun: false, lactosedeux: true, OuiLait: false, NonLait: true });
    }
    state = {
        glutenun: false,
        glutendeux: false
    }
    glutenunPressed() {
        //alert('one');
        this.setState({ glutenun: true, glutendeux: false });
    }
    glutendeuxPressed() {
        //alert('two');
        this.setState({ glutenun: false, glutendeux: true });
    }
    state = {
        noixun: false,
        noixdeux: false
    }
    noixunPressed() {
        //alert('one');
        this.setState({ noixun: true, noixdeux: false });
    }
    noixdeuxPressed() {
        //alert('two');
        this.setState({ noixun: false, noixdeux: true });
    }
    state = {
        vegeun: false,
        vegedeux: false
    }
    vegeunPressed() {
        //alert('one');
        this.setState({ vegeun: true, vegedeux: false });
    }
    vegedeuxPressed() {
        //alert('two');
        this.setState({ vegeun: false, vegedeux: true });
    }
    _enregistrerKcal() {
        if (this.state.calories != 0) {
            if (this.state.lactoseun === true) {
                lactose = 'true'
            } else {
                lactose = 'false'
            }
            if (this.state.noixun === true) {
                noix = 'true'
            }
            else {
                noix = 'false'
            }
            if (this.state.glutenun === true) {
                gluten = 'true'
            } else {
                gluten = 'false'
            }
            if (this.state.vegeun === true) {
                vegetarien = 'true'
            } else {
                vegetarien = 'false'
            }
            const action = {
                type: 'MODIFICATION_KCALPROFIL',
                value: this.state.calories
            }
            this.props.dispatch(action)
            const action2 = {
                type: 'ALLERGIE_LAIT',
                value: lactose
            }
            this.props.dispatch(action2)
            const action3 = {
                type: 'ALLERGIE_GLUTEN',
                value: gluten
            }
            this.props.dispatch(action3)
            const action4 = {
                type: 'ALLERGIE_NOIX',
                value: noix
            }
            this.props.dispatch(action4)
            const action5 = {
                type: 'MANGE_VEGETARIEN',
                value: vegetarien
            }
            this.props.dispatch(action5)
            const action6 = {
                type: 'CHOIX_SEXE',
                value: this.state.sexe
            }
            this.props.dispatch(action6)
            const action7 = {
                type: 'CHOIX_TAILLE',
                value: this.state.taille
            }
            this.props.dispatch(action7)
            const action8 = {
                type: 'CHOIX_POIDS',
                value: this.state.poids
            }
            this.props.dispatch(action8)
            const action9 = {
                type: 'CHOIX_AGE',
                value: this.state.age
            }
            this.props.dispatch(action9)
            const action10 = {
                type: 'MODIF_PAS',
                value: this.state.Pas
            }
            this.props.dispatch(action10)
            this.props.navigation.navigate('Recherche')
        } else {
            alert("Le nombre de Kcal souhaitée ne peut valoir 0 !")
        }
    }
    _deconnexion() {
        tokenDeconnexion = true
        
        // -------------------------- REINITIALISATION HistoriqueREDUCER --------------------------
        const actionHistorique = {
            type: 'VIDER_HISTORIQUE',
            value: null
        }
        this.props.dispatch(actionHistorique)
        // -------------------------- REINITIALISATION CaloriesREDUCER --------------------------
        const actionCalories = {
            type: 'REINIT_TOTALCALORIES',
            value: null
        }
        this.props.dispatch(actionCalories)
        // -------------------------- REINITATIALISATION CaloriesDepenserREDUCER --------------------------
        const actionPas = {
            type: 'REINIT_SEM',
            value: null
        }
        this.props.dispatch(actionPas)
        // -------------------------- REINITATIALISATION MaConsommationREDUCER --------------------------
        const actionConsommation = {
            type: 'VIDER_CONSOMMATION',
            value: null
        }
        this.props.dispatch(actionConsommation)
        // -------------------------- REINITATIALISATION InfoConso --------------------------
        const actionInfo = {
            type: 'REINIT_INFO',
            value: null
        }
        this.props.dispatch(actionInfo)
        // -------------------------- REINITATIALISATION MesFavoris --------------------------
        const actionFavoris = {
            type: 'VIDER_FAVORIS',
            value: null
        }
        this.props.dispatch(actionFavoris)
        

        tokenDeconnexion = false
        this.props.navigation.navigate('Connexion')
    }
    render() {
        if (this.state.Pas === 1) {
            this.state.Pas = this.props.PasVoulu
        }
        if (this.state.calories === 1) {
            this.state.calories = this.props.kcalProfil
        }
        if (this.state.taille === 2000) {
            this.state.taille = this.props.Taille
        }
        if (this.state.poids === 2000) {
            this.state.poids = this.props.Poids
        }
        if (this.state.age === 2000) {
            this.state.age = this.props.Age
        }
        if (this.state.sexe === 4) {
            this.state.sexe = this.props.Sexe
        }
        const femme =
            <Text style={{ color: 'grey', textAlign: 'center' }}>
                Selon l'Organisation Mondiale de la Santé (OMS) vous devriez consommer entre 2000 et 2200 Kcal par jour.
    </Text>
        const homme =
            <Text style={{ color: 'grey', textAlign: 'center' }}>
                Selon l'Organisation Mondiale de la Santé (OMS) vous devriez consommer entre 2500 et 2700 Kcal par jour.
    </Text>
        const autre = <Text></Text>;


        const insuffisancePonderaleSevere =
            <Text style={{ fontSize: 15, textAlign: 'center', color: 'red' }}>
                {"\n"}Insuffisance pondérale sévère{"\n"}{"\n"}
            </Text>;
        const insuffisancePonderaleModeree =
            <Text style={{ fontSize: 15, textAlign: 'center', color: 'orange' }}>
                {"\n"}Insuffisance pondérale modérée{"\n"}{"\n"}
            </Text>;
        const insuffisancePonderaleLegere =
            <Text style={{ fontSize: 15, textAlign: 'center', color: 'gold' }}>
                {"\n"}Insuffisance pondérale légère{"\n"}{"\n"}
            </Text>;
        const corpulenceNormale =
            <Text style={{ fontSize: 15, textAlign: 'center', color: 'blue' }}>
                {"\n"}Corpulance normale{"\n"}{"\n"}
            </Text>;
        const preObesite =
            <Text style={{ fontSize: 15, textAlign: 'center', color: 'gold' }}>
                {"\n"}Pré-obésité{"\n"}{"\n"}
            </Text>;
        const obesiteClasseUn =
            <Text style={{ fontSize: 15, textAlign: 'center', color: 'orange' }}>
                {"\n"}Obésité de classe I{"\n"}{"\n"}
            </Text>;
        const obesiteClasseDeux =
            <Text style={{ fontSize: 15, textAlign: 'center', color: 'red' }}>
                {"\n"}Obésité de classe II{"\n"}{"\n"}
            </Text>;
        const obesiteClasseTrois =
            <Text style={{ fontSize: 15, textAlign: 'center', color: 'red' }}>
                {"\n"}Obésité de classe III{"\n"}{"\n"}
            </Text>;
        const deficitGras =
            <Text style={{ fontSize: 15, textAlign: 'center', color: 'red' }}>
                {"\n"}Déficit de graisse{"\n"}{"\n"}
            </Text>
        const pourcentageNormal =
            <Text style={{ fontSize: 15, textAlign: 'center', color: 'blue' }}>
                {"\n"}Pourcentage normal de gras{"\n"}{"\n"}
            </Text>
        const surplusGras =
            <Text style={{ fontSize: 15, textAlign: 'center', color: 'red' }}>
                {"\n"}Surplus de graisse{"\n"}{"\n"}
            </Text>
        {/* constantes: deux boutons -> un pour aller sur la vue GagnerDuPoids l'autre sur la vue PerdreDuPoids*/ }
        const gagner =
            <TouchableOpacity style={styles.btnConseils}
                onPress={() => { this.props.navigation.navigate('GagnerDuPoids') }}>
                <Text style={styles.textbtnenregistrer}>Conseils pour Gagner</Text>
            </TouchableOpacity>
        const perdre =
            <TouchableOpacity style={styles.btnConseils}
                onPress={() => { this.props.navigation.navigate('PerdreDuPoids') }}>
                <Text style={styles.textbtnConseils}>Conseils Pour Perdre</Text>
            </TouchableOpacity>
        let y = this.state.sexe;
        let conseil;

        let x = (this.state.poids / ((this.state.taille * 0.01) * (this.state.taille * 0.01)));
        let message;
        let z = (1.20 * (this.state.poids / ((this.state.taille * 0.01) * (this.state.taille * 0.01))) + 0.23 * (this.state.age) - 10.8 * y - 5.4);
        let messageDeux;
        let messageTrois;
        if (y == 0) {
            conseil = femme
        } else if (y == 1) {
            conseil = homme
        } else if (y == 2) {
            conseil = autre
        }
        if (x < 16.00) {
            message = insuffisancePonderaleSevere
        } else if (x < 16.99) {
            message = insuffisancePonderaleModeree
        } else if (x < 18.45) {
            message = insuffisancePonderaleLegere
        } else if (x < 24.99) {
            message = corpulenceNormale
        } else if (x < 29.99) {
            message = preObesite
        } else if (x < 34.99) {
            message = obesiteClasseUn
        } else if (x < 39.99) {
            message = obesiteClasseDeux
        } else if (x > 40.00) {
            message = obesiteClasseTrois
        } else {
            message = autre
        }
        if (y == 0 && z < 25) {
            messageDeux = deficitGras
        } else if (y == 0 && z < 30) {
            messageDeux = pourcentageNormal
        } else if (y == 0 && z > 30) {
            messageDeux = surplusGras
        } else if (y == 1 && z < 15) {
            messageDeux = deficitGras
        } else if (y == 1 && z < 20) {
            messageDeux = pourcentageNormal
        } else if (y == 1 && z > 20) {
            messageDeux = surplusGras
        }
        {/* Condition: si ton IMG est inférieur au taux normal, c'est le bouton pour aller sur la vue GagnerDuPoids qui apparait
si au contraire ton IMG est supérieur c'est le bouton qui mène à la vue PerdreDuPoids qui apparait*/}
        {/*messageTrois est juste une variable que j'ai déclarer pour prendre la valeur bouton*/ }
        if ((y == 0 && z < 25) || (y == 1 && z < 15)) {
            messageTrois = gagner
        }
        else if ((y == 0 && z > 30) || (y == 1 && z > 20)) {
            messageTrois = perdre
        }
        else {
            messageTrois = autre
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white', }}>

                <SafeAreaView style={styles.containes}>

                    <ScrollView style={styles.scrollView}>

                        <View style={Platform.OS === 'ios' ? styles.choixSexeIOS : styles.choixSexeAndroid}>
                            <Picker style={styles.onePicker}
                                itemStyle={styles.onePickerItem}
                                selectedValue={this.state.sexe}
                                onValueChange={(itemValue) => this.setState({ sexe: itemValue })}>
                                <Picker.Item label={"Sélectionnez votre sexe"} value="2" />
                                <Picker.Item label="Femme" value="0" />
                                <Picker.Item label="Homme" value="1" />
                            </Picker>
                        </View>
                        <View style={styles.conseilSexe}>
                            <Text>{conseil}</Text>
                        </View>
                        <Text style={{ fontWeight: "bold", marginLeft: 20 }}>{"\n"}{"\n"}Sélectionnez votre âge:</Text>
                        <Text style={{ marginLeft: 20 }}>{"\n"}Âge:{this.state.age}</Text>
                        <Slider
                            style={{ width: '75%' }} step={1}
                            age={this.state.slidevalue}
                            onValueChange={age => this.setState({ age })}
                            minimumValue={0}
                            maximumValue={100}
                            marginLeft={20}
                            minimumTrackTintColor='#2dcc70'
                            thumbTintColor='#2dcc70'
                            value={this.props.Age}
                            color='#2dcc70'
                        />

                        <Text style={{ fontWeight: "bold", marginLeft: 20 }}>{"\n"}{"\n"}Sélectionnez votre taille (en cm):</Text>
                        <Text style={{ marginLeft: 20 }}>{"\n"}Taille:{this.state.taille}</Text>
                        <Slider
                            style={{ width: '75%' }} step={1}
                            taille={this.state.slidevalue}
                            onValueChange={taille => this.setState({ taille })}
                            minimumValue={0}
                            maximumValue={220}
                            marginLeft={20}
                            minimumTrackTintColor='#2dcc70'
                            thumbTintColor='#2dcc70'
                            value={this.props.Taille}
                        />

                        <Text style={{ fontWeight: "bold", marginLeft: 20 }}>{"\n"}{"\n"}Sélectionnez votre poids (en Kg):</Text>
                        <Text style={{ marginLeft: 20 }}>{"\n"}Poids:{this.state.poids}</Text>
                        <Slider
                            style={{ width: '75%' }} step={1}
                            poids={this.state.slidevalue}
                            onValueChange={poids => this.setState({ poids })}
                            minimumValue={0}
                            maximumValue={250}
                            marginLeft={20}
                            value={this.props.Poids}
                            minimumTrackTintColor='#2dcc70'
                            thumbTintColor='#2dcc70'
                        />



                        <Text>{"\n"}{"\n"}</Text>
                        <View>
                            <Text style={{ fontSize: 30, textAlign: 'center', borderColor: '#000000', borderWidth: 1, marginLeft: 5, marginRight: 5 }}>
                                IMC: {this._calculIMC()}
                            </Text>
                            <View>{message}</View>
                        </View>

                        <View>
                            <Text style={{ fontSize: 30, textAlign: 'center', borderColor: '#000000', borderWidth: 1, marginLeft: 5, marginRight: 5 }}>
                                IMG: {this._calculIMG()}
                            </Text>
                            <View>{messageDeux}</View>
                        </View>

                        {/*lieu où le bouton apparait*/}
                        <View>{messageTrois}</View>
                        <Text style={{ fontWeight: "bold", marginLeft: 20 }}>{"\n"}{"\n"}{"\n"}Nombre de Kcal souhaité:</Text>
                        <Text style={{ marginLeft: 20 }}>{"\n"}Kcal souhaitées:{this.state.calories}</Text>
                        <Slider
                            style={{ width: '75%' }} step={100}
                            calories={this.state.slidevalue}
                            onValueChange={calories => this.setState({ calories })}
                            minimumValue={0}
                            maximumValue={10000}
                            marginLeft={20}
                            minimumTrackTintColor='#2dcc70'
                            thumbTintColor='#2dcc70'
                            value={this.props.kcalProfil}
                        />
                        <Text style={{ fontWeight: "bold", marginLeft: 20 }}>{"\n"}{"\n"}Combien de pas souhaitez-vous faire par jour ?</Text>
                        <Text style={{ marginLeft: 20 }}>{"\n"}Nombre de Pas:{this.state.Pas}</Text>
                        <Slider
                            style={{ width: '75%' }} step={500}
                            Pas={this.state.slidevalue}
                            onValueChange={Pas => this.setState({ Pas })}
                            minimumValue={0}
                            maximumValue={20000}
                            marginLeft={20}
                            value={this.props.PasVoulu}
                            minimumTrackTintColor='#2dcc70'
                            thumbTintColor='#2dcc70'
                        />

                        <Text>{"\n"}{"\n"}</Text>
                        <Text style={{ flexDirection: 'row', alignSelf: 'center', fontWeight: 'bold' }}>Intolérance au lactose:{"\n"}        Oui          Non</Text>
                        <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
                            <CheckBox checked={this.state.lactoseun}
                                onPress={() => this.lactoseunPressed()}
                                checkedColor='#2dcc70'
                            />
                            <CheckBox checked={this.state.lactosedeux}
                                onPress={() => this.lactosedeuxPressed()}
                                checkedColor='#2dcc70'
                            />
                        </View>
                        <Text style={{ flexDirection: 'row', alignSelf: 'center', fontWeight: 'bold' }}>Intolérance au gluten:{"\n"}       Oui          Non</Text>
                        <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
                            <CheckBox checked={this.state.glutenun}
                                onPress={() => this.glutenunPressed()}
                                checkedColor='#2dcc70'
                            />
                            <CheckBox checked={this.state.glutendeux}
                                onPress={() => this.glutendeuxPressed()}
                                checkedColor='#2dcc70'
                            />
                        </View>
                        <Text style={{ flexDirection: 'row', alignSelf: 'center', fontWeight: 'bold' }}>Allergie aux noix:{"\n"}   Oui          Non</Text>
                        <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
                            <CheckBox checked={this.state.noixun}
                                onPress={() => this.noixunPressed()}
                                checkedColor='#2dcc70'
                            />
                            <CheckBox checked={this.state.noixdeux}
                                onPress={() => this.noixdeuxPressed()}
                                checkedColor='#2dcc70'
                            />
                        </View>
                        <Text style={{ flexDirection: 'row', alignSelf: 'center', fontWeight: 'bold' }}>Etes vous végétarien:{"\n"}       Oui          Non</Text>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <CheckBox checked={this.state.vegeun}
                                onPress={() => this.vegeunPressed()}
                                checkedColor='#2dcc70'
                            />
                            <CheckBox checked={this.state.vegedeux}
                                onPress={() => this.vegedeuxPressed()}
                                checkedColor='#2dcc70'
                            />
                        </View>
                        <Text>{"\n"}</Text>
                        <View>
                            <TouchableOpacity style={styles.btnEnregistrer}
                                onPress={() => { this._enregistrerKcal() }}>
                                <Text style={styles.textbtnenregistrer}>Enregister</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnDeconnexion}
                                onPress={() => { this._deconnexion() }}>
                                <Text style={styles.textbtnDeconnexion}>Déconnexion</Text>
                            </TouchableOpacity>
                        </View>

                        <Text>{"\n"}{"\n"}</Text>
                        <Text style={{ fontSize: 10, color: 'grey', marginLeft: 10, marginRight: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'black' }}>L'indice de masse corporelle ou IMC</Text> permet de déterminer la corpulence d'une personne.
                            Cet indice se calcule en fonction de la taille et du poids.
                            Il n'est correctement interprétable que pour un adulte de 18 à 65 ans.
                        </Text>
                        <Text style={{ fontSize: 10, color: 'grey', marginLeft: 10, marginRight: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: 'black' }}>L'indice de masse grasse ou IMG </Text>est un indice, exprimé en pourcentage,
                            qui permet de juger de la proportion de tissus adipeux d'une personne adulte.
                            Il prend en compte la disproportion entre la masse de graisse et celle des muscles.{"\n"}{"\n"}
                        </Text>


                    </ScrollView>

                </SafeAreaView>

            </View>
        )
    }
}

export default connect(mapStateToProps)(Profil)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    onePicker:{
        color:"#2dcc70",
        marginLeft:20,  
    },
    btnEnregistrer: {
        width: WIDTH - 155,
        height: 45,
        borderRadius: 25, 
        backgroundColor:'#2dcc70',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    btnDeconnexion: {
        width: WIDTH - 155,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#DC143C', //Nuance de rouge
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
    btnConseils: {
        width: WIDTH - 155,
        height: 45,
        borderRadius: 25, 
        backgroundColor:'#2dcc70',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginTop:40
    },
    textbtnenregistrer: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        textAlign: 'center'
    },
    textbtnDeconnexion: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        textAlign: 'center'
    },
    textbtnConseils: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        textAlign: 'center'
    },
    monprofil: {
        marginTop: -40
    },
    choixSexeAndroid: {
        borderWidth: 1.5,
        width: 300,
        height:50,
        alignSelf:'center',
        marginTop:20,
        borderRadius:25,
        borderColor:'#2dcc70'
    },
    choixSexeIOS: {
        flex: 1,
        width: 300,
        alignSelf: 'center'
    },
    conseilSexe: {
        alignSelf: 'center',
        marginLeft: 10,
        marginTop: 10
    }
})