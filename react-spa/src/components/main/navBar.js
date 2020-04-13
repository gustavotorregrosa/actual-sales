import React, { Component } from 'react'
import M from 'materialize-css'
import history from '../../suport/history'
import UserContext from '../../suport/userContext'
import * as helper from '../../suport/helper'


class NavBar extends Component {

    constructor(props){
        super(props)
        this.elems = null
        this.instances = null
    }


    componentDidMount(){
        this.elems = document.querySelectorAll('.dropdown-trigger');
        this.instances = M.Dropdown.init(this.elems, {});

    }

    redirecionar = (e, path) => {
        e.preventDefault()
        history.push(path)
    }

    logout = e => {
        e.preventDefault()
        const emptyUser = {
            isLogged: false,
            userName: "",
            userEmail: "",
            jwt: "" 
        }
        localStorage.removeItem("user")
        this.context.changeUserState(emptyUser)
        M.toast({ html: 'User logged out' })
        history.push('/login')

    }

    cleanDatabase = e => {
        e.preventDefault()
        helper.jwtFetch('cleandatabase', this.context).then(r => {
            history.push('/')
            M.toast({ html: r.message })
        })

    }


    render() {
        return (
            <nav className="black">
                <div className="nav-wrapper">
                    <a onClick={(e) => this.redirecionar(e, '/')} href="#" className="brand-logo">CSV Importer</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                       <li><a onClick={(e) => this.redirecionar(e, '/import')} href="#">CSV Import</a></li>
                       <li><a onClick={(e) => this.cleanDatabase(e)} href="#">Clean Database</a></li>
                       <li><a href="#" className="dropdown-trigger" data-target='report-items'>Reports</a></li>
                       <ul id="report-items" className='dropdown-content'>
                            <li><a onClick={(e) => this.redirecionar(e, '/clients-report')} href="#">Clients</a></li>
                            <li><a onClick={(e) => this.redirecionar(e, '/deals-report')} href="#">Deals</a></li>
                       </ul>
                       <li><a onClick={(e) => this.logout(e)} href="#">Logout</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

NavBar.contextType = UserContext

export default NavBar