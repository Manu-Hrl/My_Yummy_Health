import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'

let heartcolor = 'grey'
const mapStateToProps = (state) => {
    return {
        historiqueProduits: state.modificationHistorique.historiqueProduits,
        mesFavoris: state.modificationFavoris.mesFavoris,
    }
}

export class ProduitITem extends React.Component {

    constructor(props) {
        super(props)
        this.produit = this.props.produit
        this.navigation = this.props.navigation
    }

    _ajouterfavoris() {
        this.produit.id = new Date().getTime()
        const action2 = {
            type: 'AJOUT_FAVORIS',
            value: this.produit
        }
        this.props.dispatch(action2)
    }

    _supprimer() { //Supprime un produit de l'historique
        const action = {
            type: 'SUPPRIME_HISTORIQUE',
            value: this.produit
        }
        this.props.dispatch(action)
    }

    render() {
        return (
            <View style={styles.container}>

                <Image style={styles.image_container} source={{ uri: this.produit.image }} />

                <View style={styles.detail_container}>
                    <View style={styles.header_content}>
                        <Text style={styles.title_text}>{this.produit.nom_produit}</Text>
                        <Text style={styles.texte}>Calories/100g : {this.produit.calories}</Text>
                        <Text style={styles.texte}><Text style={{ color: this.produit.couleur_nutriscore }}>Nutriscrore : {this.produit.nutriscore.toUpperCase()}</Text></Text>
                    </View>
                    <View style={styles.main_button}>
                        <Icon raised name='pencil' type='evilicon' onPress={() => { this.navigation.navigate('ProduitPourcentage', { produitItem: this.produit }) }} />
                        <Icon raised name='minus' type='evilicon' color='red' onPress={() => this._supprimer()} />
                        <Icon containerStyle={{ flex: 9.5 / 12, alignItems: 'flex-end', justifyContent: 'center' }} name='ios-heart' type="ionicon" color={this.produit.couleur_favoris} size={42} onPress={() => this._ajouterfavoris()} />
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps)(ProduitITem)

const styles = StyleSheet.create({
    container: {
        height: 160,
        backgroundColor: "white",
        flexDirection: "row",
        borderTopColor: '#DCDCDC',
        borderTopWidth: 1
    },
    image_container: {
        width: 100,
        height: 150,
        margin: 5,
        backgroundColor: 'red',
        borderRadius: 15
    },
    detail_container: {
        flex: 1,
        margin: 2
    },
    header_content: {
        flex: 7,
        justifyContent: "center", alignItems: 'flex-start'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 15.4,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    main_button: {
        flex: 6,
        flexDirection: "row"
    },
    texte: {
        fontStyle: 'italic'
    }



})



