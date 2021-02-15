import React from 'react'
import { View, TextInput, ImageBackground, StyleSheet, Text, Image, Dimensions, TouchableOpacity, Alert } from 'react-native'
import backgroundImage from './apples.jpg'
import logo from './Yummy.png'
import Icon from 'react-native-vector-icons/Ionicons'
import { serveur } from './Connexion'

const { width: WIDTH } = Dimensions.get('window')

export class Register extends React.Component {
    constructor() {
        super()
        this.textEmail = ''
        this.textPassWord = ''
        this.textPassWordConfirm = ''
        this.state = {
            showPass: true,
            press: false
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

    _getEmail(text) { // Permet de mettre à jour l'e-mail dans le TextInput
        this.textEmail = text
    }

    _getTextPassWord(text) { // Permet de mettre à jour le mot de passe dans le TextInput
        this.textPassWord = text
    }

    _getTextPassWordConfirm(text) { // Permet de mettre à jour la confirmation de mot de passe dans le TextInput
        this.textPassWordConfirm = text
    }

    _comparaisonPassWord() {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ // Permet de vérifier si l'email est valide ou non

        if (!regex.test(this.textEmail)) {
            //Email invalide
            Alert.alert('Email non valide !')
        } else if ((this.textPassWordConfirm.length < 8) || (this.textPassWord.length < 8)) {
            //Mot de passe inférieur à 8 caractères
            Alert.alert('Mot de passe inférieur à 8 caractères !')
        } else if (this.textPassWord !== this.textPassWordConfirm) {
            //Mot de passe différent
            Alert.alert('Mot de passe non identique !')
        } else {
            //Mot de passe identique
            fetch(serveur + '/utilisateur/inscription', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ email: this.textEmail, password: this.textPassWord })
            }).then(() => Alert.alert('Vous êtes bien inscrit ! Connectez vous :)')).catch(err => console.error(err))
        }
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                </View>


                <View style={styles.inputContainer}>
                    <Icon name={'ios-at'} size={28} color={'rgba(255,255,255,0.7)'}
                        style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder={'Adresse e-mail'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput1.focus()}
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
                        returnKeyType="next"
                        secureTextEntry={this.state.showPass}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        ref={(input) => this.passwordInput1 = input}
                        autoCapitalize="none"
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
                <View style={styles.inputContainer}>
                    <Icon name={'ios-lock'} size={28} color={'rgba(255,255,255,0.7)'}
                        style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder={'Confirmation mot de passe'}
                        returnKeyType="go"
                        secureTextEntry={this.state.showPass}
                        ref={(input) => this.passwordInput = input}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        autoCapitalize="none"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => { this._getTextPassWordConfirm(text) }}
                    />

                    <TouchableOpacity style={styles.btnEye}
                        onPress={this.showPass.bind(this)}>
                        <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'}
                            size={26} color={'rgba(255,255,255,0.7)'} />
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={styles.btnSignin} onPress={() => { this._comparaisonPassWord() }}>
                        <Text style={styles.text}>Inscription</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        );
    }
}

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
        marginBottom: 20,
        paddingTop: 40
    },
    logo: {
        width: 250,
        height: 120,
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
    btnSignin: {
        width: WIDTH - 155,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#432577',
        justifyContent: 'center',
        marginTop: 20,
    },
    text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        textAlign: 'center'
    },

});