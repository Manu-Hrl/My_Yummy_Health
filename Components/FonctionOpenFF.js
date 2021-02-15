//Fonction pour accèder aux informations du produit voulu

export function getProduitFromApi(num_barre) {
  const url = 'https://fr.openfoodfacts.org/api/v0/product/'+num_barre+'.json'
  return fetch(url).then((response) => response.json()).catch((error) => console.error(error))
}