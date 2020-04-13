import React, { Component } from 'react'
import UserContext from '../../suport/userContext'
import NavBar from './emptyNavBar'
import M from 'materialize-css'
import * as helper from '../../suport/helper'


class LoginScreen extends Component {


    state = {
        loading: false,
        email: '',
        password: ''
    }


    login = e => {
        e.preventDefault()
        this.setState({
            loading: true
        })

        const objUser = {...this.state}

        setTimeout(() => {
            let myHeaders = new Headers
            myHeaders.set("Content-Type", "application/json")
            let opcoes = {
                url: helper.url.concat('user/login'),
                method: 'post',
                body: JSON.stringify(objUser),
                headers: myHeaders
            }
            let status
            fetch(opcoes.url, opcoes).then(response => {
                status = response.status
                return response.json()
            }).then(data => {
                if (status == 200) {
                    const newUser = {
                        isLogged: true,
                        userName: data.user.name,
                        userEmail: data.user.email,
                        jwt: data.jwt 
                    }
                    localStorage.setItem("user", JSON.stringify(newUser))
                    this.context.changeUserState(newUser)
                }
                this.setState({
                        loading: false,
                        email: '',
                        password: ''
                })
                M.updateTextFields()
                M.toast({ html: data.message })
            })
        }, 2000)
    }

    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    componentDidUpdate(){
        this.authenticatedToRoot()
    } 


    authenticatedToRoot = () => {
        if(this.context.state.user.isLogged){
          this.props.history.push('/')
        }
    }

    redirectToRegister = (e) => {
        e.preventDefault()
        this.props.history.push('/register')

    }


    render() {
        return (
            <div>
                <NavBar />
                    <div className="container">
                        <br/><br/>
                        <h5 style={{textAlign: 'center'}}>Login</h5>
                        <br/><br/>
                        <div className="row">
                            <form className="col offset-s3 s6 card" style={{padding: '2em'}}>
                                <div className="input-field col s12">
                                    <input value={this.state.email} onChange={(e) => this.handleChangeEmail(e)} id="login_email" type="email" className="validate" />
                                    <label for="login_email">email</label>
                                </div>
                                <br/>
                                <div className="input-field col s12">
                                    <input value={this.state.password} onChange={(e) => this.handleChangePassword(e)} id="login_password" type="password" className="validate" />
                                    <label for="login_password">password</label>
                                </div>
                                <br/>
                                <br/>
                                <div className="input-field col s12">
                                    <a onClick={(e) => this.redirectToRegister(e) } className="waves-effect waves-teal btn-flat">register</a>
                                    <a onClick={(e) => this.login(e) } className="waves-effect waves-light btn right">login</a>
                                </div>
                                {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null }   
 
                               

                            </form>
                        </div>
                    </div>
            </div>
        )
    }

}

LoginScreen.contextType = UserContext

export default LoginScreen
