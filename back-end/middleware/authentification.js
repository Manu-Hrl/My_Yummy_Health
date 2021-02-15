const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] //Permet d'extraire le token du header de la requête
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET') //Permet de décoder le token 
    const userId = decodedToken.userId //Extraction du l'id utilisateur contenu dans le token 
    if (req.body.userId && req.body.userId !== userId) { //Si ID user de la requête et ID user du token sont différent, on envoie une erreur
      throw 'Invalid user ID'
    } else {
      req.params.id = userId
      next()
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};