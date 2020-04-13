import React, { Component } from 'react'
import UserContext from '../../../suport/userContext'
import * as helper from '../../../suport/helper'
import M from 'materialize-css'
import history from '../../../suport/history'

class UnitClientReport extends Component {

    state = {
        loading: false,
        clientname: '',
        bets: []

    }


    componentDidMount(){
        this.setState({
            loading: true
        })

        setTimeout(() => {
            helper.jwtFetch('client/'+this.props.match.params.id, this.context).then(r => {
                this.setState({
                    loading: false,
                    clientname: r.client.name,
                    bets: r.client.bets
                })   
            })

        }, 500)
    }


    betsTable = () => {
       let table = (
        <table>
            <thead>
                <tr>
                    <th>Deal</th>
                    <th>Accepted</th>
                    <th>Refused</th>
                    <th>Hour</th>
                </tr>
            </thead>
        <tbody>
            {this.state.bets.map(bet => {
                let tr = (
                    <tr style={{cursor: 'pointer'}}>
                        <td>{bet.deal.name}</td>
                        <td>{bet.accepted}</td>
                        <td>{bet.refused}</td>
                        <td>{bet.hour}</td>
                    </tr>
                )
                return tr
            })}
        </tbody>
        </table>
       )

       return table
    }


    render(){
        return(
            <div>
                <h5>Client name: {this.state.clientname}</h5>
                <br/><br/>
                {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null }
                {this.betsTable()}
            </div>
        )
    }



}


UnitClientReport.contextType = UserContext

export default UnitClientReport