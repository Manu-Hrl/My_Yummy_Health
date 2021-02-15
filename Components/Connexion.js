import React from 'react'
import { View, TextInput, ImageBackground, StyleSheet, Text, Image, Dimensions, TouchableOpacity, Alert } from 'react-native'
import backgroundImage from './breakfast.jpg'
import logo from './Yummy.png'
import logouniv from './logoudp.png'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

const { width: WIDTH } = Dimensions.get('window')

const mapStateToProps = (state) => {
    return {
        historiqueProduits: state.modificationHistorique.historiqueProduits
    }
}

export let token = 0//Contient le token de l'utilisateur pour son authentification
export const serveur = 'https://FocusedChartreuseHacks.kidood93.repl.co' //Lien qui permet d'accéder au serveur repl
export let connecter = false

export class Connexion extends React.Component {
    constructor(props) {
        super(props)
        this.textMail = ''
        this.textPassword = ''
        this.state = {
            showPass: true,
            press: false,
            btnActif: false
        }
    }

    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true })
        }
        else {
            this.setState({ showPass: true, press: false })
        }
    }

    _getEmail(text) {
        this.textMail = text
    }

    _getTextPassWord(text) {
        this.textPassword = text
    }



    async _connexion() {
        this.state.btnActif = true

        token = await fetch(serveur + '/utilisateur/connexion', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ email: this.textMail, password: this.textPassword })
        }).then((token) => { return token.json() }).catch(err => console.error(err))

        if (token.error !== undefined) {
            Alert.alert(token.error)
            token = 0
            this.state.btnActif = false
        } else {
            connecter = true
            // -------------------------- INITATIALISATION HistoriqueREDUCER --------------------------
            const connexion = await fetch(serveur + '/utilisateur/trouver', {
                method: 'GET',
                headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token.token })
            }).then(res => { return res.json() }).catch(err => console.error(err))

            const actionHistorique = {
                type: 'CONNEXION_HISTORIQUE',
                value: connexion.historiqueProduit
            }
            this.props.dispatch(actionHistorique)
            // -------------------------- INITATIALISATION CaloriesREDUCER --------------------------
            const actionCalories = {
                type: 'CONNEXION_CALORIES',
                value: connexion
            }
            this.props.dispatch(actionCalories)
            // -------------------------- INITATIALISATION CaloriesDepenserREDUCER --------------------------
            const actionPas = {
                type: 'CONNEXION_PAS',
                value: connexion
            }
            this.props.dispatch(actionPas)
            // -------------------------- INITATIALISATION MaConsommationREDUCER --------------------------
            const actionConsommation = {
                type: 'CONNEXION_CONSOMMATION',
                value: connexion.maConsommation
            }
            this.props.dispatch(actionConsommation)
            // -------------------------- INITATIALISATION InfoConso --------------------------
            const actionInfo = {
                type: 'CONNEXION_ALLERGIE',
                value: connexion
            }
            this.props.dispatch(actionInfo)
            // -------------------------- INITATIALISATION MesFavoris --------------------------
            const actionFavoris = {
                type: 'CONNEXION_FAVORIS',
                value: connexion.mesFavoris
            }
            this.props.dispatch(actionFavoris)

            this.state.btnActif = false
            this.props.navigation.navigate('Application')
        }
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={'ios-person'} size={28} color={'rgba(255,255,255,0.7)'}
                        style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder={'E-mail'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => { this._getEmail(text) }}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={'ios-lock'} size={28} color={'rgba(255,255,255,0.7)'}
                        style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder={'Mot de passe'}
                        returnKeyType="go"
                        secureTextEntry={this.state.showPass}
                        ref={(input) => this.passwordInput = input}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => { this._getTextPassWord(text) }}
                    />

                    <TouchableOpacity style={styles.btnEye}
                        onPress={this.showPass.bind(this)}>
                        <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'}
                            size={26} color={'rgba(255,255,255,0.7)'} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 10 }}>
                    <TouchableOpacity style={styles.btnLogin} onPress={() => this._connexion()} disabled={this.state.btnActif}>
                        <Text style={styles.text}>Connexion</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.btngotoregister}
                        onPress={() => { this.props.navigation.navigate('Register') }} disabled={this.state.btnActif}>
                        <Text style={styles.textbtnregister}>Inscrivez-vous ici</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btnSessionInvite}
                    onPress={() => { this.props.navigation.navigate('Application') }} disabled={this.state.btnActif}>
                    <Text style={styles.text}>Session invité</Text>
                </TouchableOpacity>

                <View style={styles.logoContainerbis}>
                    <Image source={logouniv} style={styles.logoudp} />
                </View>

            </ImageBackground>

        );
    }
}

export default connect(mapStateToProps)(Connexion)

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    inputContainer: {
        marginTop: 10,

    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 35,
        paddingTop: 45
    },
    logoContainerbis: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',


    },
    logo: {
        width: 250,
        height: 120,


    },
    logoudp: {
        width: 70,
        height: 70,

    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37
    },
    btnEye: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    btnLogin: {
        width: WIDTH - 155,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#432577',
        justifyContent: 'center',
        marginTop: 20
    },
    btngotoregister: {
        marginTop: 10
    },
    btnSessionInvite: {
        width: WIDTH - 155,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#432577',
        justifyContent: 'center',
        marginTop: 20
    },
    text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        textAlign: 'center'
    },
    textbtnregister: {
        color: '#432577',
        fontSize: 15,
        textAlign: 'center'
    }
});