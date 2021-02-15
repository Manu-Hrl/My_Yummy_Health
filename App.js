import React from 'react'
import  Navigation  from './Navigation/Navigation'
import { Provider } from 'react-redux' // Le Store redux englobera la navigation
import Store from './Store/configStore' // Import du store de Redux

export default class App extends React.Component {
  render() {
      return ( 
        <Provider store={Store}>
            <Navigation/>
        </Provider>
      )
  }
}


