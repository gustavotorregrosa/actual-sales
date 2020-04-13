import React, { Component } from 'react'
import UserContext from '../../../suport/userContext'
import * as helper from '../../../suport/helper'
import M from 'materialize-css'
import history from '../../../suport/history'

class ClientsReport extends Component {

    state ={
        loading: false,
        clients: []
    }

    componentDidMount(){
        this.setState({
            loading: true
        })

        setTimeout(() => {
            helper.jwtFetch('clients', this.context).then(r => {
                this.setState({
                    loading: false,
                    clients: r.data
                })   
            })

        },1000)
    }

    unitClientReport = (e, id) => {
        e.preventDefault()
        history.push('/unit-client-report/'+id)

    }

    clientsTable = () => {
        let table = (
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Client Name</th>
                </tr>
                </thead>
                    <tbody>
                    {this.state.clients.map(client => {
                        let tr = (
                            <tr style={{cursor: 'pointer'}} onClick={(e) => this.unitClientReport(e, client.id) }>
                                <td>{client.id}</td>
                                <td>{client.name}</td>
                            </tr>
                        )
                        return tr
                    })}
                   
                </tbody>
            </table>
        )

        return table
    }

    render() {
        return (
            <div>
                <h5 style={{textAlign: 'center'}}>Clients report</h5>
                <br/>
                <br/>
                {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null }   
                {this.clientsTable()}

            </div>

        )
    }

}

ClientsReport.contextType = UserContext

export default ClientsReport