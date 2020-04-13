import React, { Component } from 'react'
import UserContext from '../../suport/userContext'
import NavBar from './emptyNavBar'
import M from 'materialize-css'
import * as helper from '../../suport/helper'


class RegisterScreen extends Component {

    state = {
        loading: false,
        name: '',
        email: '',
        password: '',
        pvalidation: ''
    }

    register = e => {
        e.preventDefault()
        this.setState({
            loading: true
        })

        const objUser = {...this.state}

        if(objUser.password.length < 5){
            M.toast({html: "Password must be longer than 5 characters"})
            this.setState({
                loading: false,
                password: '',
                pvalidation: ''
            })
            M.updateTextFields()
            return

        }

        if(objUser.password != objUser.pvalidation){
            M.toast({html: "Passwords don't match"})
            this.setState({
                loading: false,
                password: '',
                pvalidation: ''
            })
            M.updateTextFields()
            return
        }

        setTimeout(() => {
            let myHeaders = new Headers
            myHeaders.set("Content-Type", "application/json")
            let opcoes = {
                url: helper.url.concat('user/register'),
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
                M.toast({ html: data.message })
                M.updateTextFields()
            })
        }, 2000)
    }


    handleChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
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

    handleChangePValidation = (e) => {
        this.setState({
            pvalidation: e.target.value
        })
    }

    componentDidUpdate() {
        this.authenticatedToRoot()
    }

    authenticatedToRoot = () => {
        if (this.context.state.user.isLogged) {
            this.props.history.push('/')
        }
    }

    redirectToLogin = e => {
        e.preventDefault()
        this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="container">
                    <br /><br />
                    <h5 style={{ textAlign: 'center' }}>Register</h5>
                    <br /><br />
                    <div className="row">
                        <form className="col offset-s3 s6 card" style={{ padding: '2em' }}>
                            <div className="input-field col s12">
                                <input value={this.state.name} onChange={(e) => this.handleChangeName(e)} id="login_name" type="text" className="validate" />
                                <label for="login_name">name</label>
                            </div>
                            <br />
                            <div className="input-field col s12">
                                <input value={this.state.email} onChange={(e) => this.handleChangeEmail(e)} id="login_email" type="email" className="validate" />
                                <label for="login_email">email</label>
                            </div>
                            <br />
                            <div className="input-field col s12">
                                <input value={this.state.password} onChange={(e) => this.handleChangePassword(e)} id="register_password" type="password" className="validate" />
                                <label for="register_password">password</label>
                            </div>
                            <br />
                            <div className="input-field col s12">
                                <input value={this.state.pvalidation} onChange={(e) => this.handleChangePValidation(e)} id="register_password_confirm" type="password" className="validate" />
                                <label for="register_password_confirm">password</label>
                            </div>
                            <br />
                            <br />
                            <div className="input-field col s12">
                                <a onClick={(e) => this.redirectToLogin(e)} className="waves-effect waves-light btn-flat">login</a>
                                <a onClick={(e) => this.register(e)} className="waves-effect waves-teal btn right">register</a>  
                            </div>
                            <br/>
                            {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null }   
                        </form>
                    </div>
                </div>
            </div>
        )
    }



}

RegisterScreen.contextType = UserContext

export default RegisterScreen