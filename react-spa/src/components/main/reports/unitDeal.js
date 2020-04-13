import React, { Component } from 'react'
import UserContext from '../../../suport/userContext'
import * as helper from '../../../suport/helper'
import M from 'materialize-css'
import history from '../../../suport/history'

class UnitDealReport extends Component {

    state = {
        loading: false,
        dealname: '',
        bets: []
    }

    componentDidMount(){
        this.setState({
            loading: true
        })

        setTimeout(() => {
            helper.jwtFetch('deal/'+this.props.match.params.id, this.context).then(r => {
                console.log(r)
                this.setState({
                    loading: false,
                    dealname: r.deal.name,
                    bets: r.deal.bets
                })   
            })
        }, 500)
    }


    betsTable = () => {
       let table = (
        <table>
            <thead>
                <tr>
                    <th>Client</th>
                    <th>Accepted</th>
                    <th>Refused</th>
                    <th>Hour</th>
                </tr>
            </thead>
        <tbody>
            {this.state.bets.map(bet => {
                let tr = (
                    <tr style={{cursor: 'pointer'}}>
                        <td>{bet.client.name}</td>
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
                <h5>Deal name: {this.state.dealname}</h5>
                <br/><br/>
                {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null }
                {this.betsTable()}
            </div>
        )
    }
}

UnitDealReport.contextType = UserContext

export default UnitDealReport