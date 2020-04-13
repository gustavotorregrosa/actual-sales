import React from 'react';
import logo from './logo.svg';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import MainScreen from './components/main/mainScreen'
import LoginScreen from './components/login/loginScreen'
import RegisterScreen from './components/login/registerScreen'
import history from './suport/history'
import { Route, Router, BrowserRouter, Switch, withRouter } from 'react-router-dom'
import UserContext from './suport/userContext'



class App extends React.Component {

  state = {
    user: {
      isLogged: false,
      userName: '',
      userEmail: '',
      jwt: ''
    }
  }

  componentDidMount(){
    this.checkUserUpdate()
  }

  changeUserState = newState => {
    this.setState({
      ...this.state,
      user: {
        ...newState
      }
    })
    if(!newState){
      setTimeout(() => {
        history.push('/login')
      }, 50)
    }
  }

  getJwt = () => this.state.user.jwt
    
   

  checkUserUpdate(){
    let user = null
    
    try {
      user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    } catch(e){
      console.log(e)
    }
    
    if(user){
        this.changeUserState(user)
      }
      setTimeout(() => {
        this.unauthenticatedToLogin()
    }, 50)
    
  }

  unauthenticatedToLogin = () => {
      if(!this.state.user.isLogged && history.location.pathname != "/register"){
        history.push('/login')
      }
  }


  render() {
    return (
      <div>
        <UserContext.Provider value={{
          state: this.state,
          changeUserState: this.changeUserState,
          getJwt: () => this.getJwt()

        }}>
          <Router history={ history } >
            <Switch>
              <Route path='/login' component={ LoginScreen } />
              <Route path='/register' component={ RegisterScreen } />
              <Route path='/' component={MainScreen} />
            </Switch>
          </Router>
        </UserContext.Provider>
      </div>
    )

  }

}

export default App
