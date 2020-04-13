import React, { Component } from 'react'
import UserContext from '../../../suport/userContext'
import * as helper from '../../../suport/helper'
import M from 'materialize-css'
import history from '../../../suport/history'

class DealsReport extends Component {

    state ={
        loading: false,
        deals: []
    }

    componentDidMount(){
        this.setState({
            loading: true
        })

        setTimeout(() => {
            helper.jwtFetch('deals', this.context).then(r => {
                this.setState({
                    loading: false,
                    deals: r.data
                })   
            })

        },1000)
    }

    unitDealReport = (e, id) => {
        e.preventDefault()
        history.push('/unit-deal-report/'+id)

    }

    dealsTable = () => {
        let table = (
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Deal Name</th>
                </tr>
                </thead>
                    <tbody>
                    {this.state.deals.map(deal => {
                        let tr = (
                            <tr style={{cursor: 'pointer'}} onClick={(e) => this.unitDealReport(e, deal.id) }>
                                <td>{deal.id}</td>
                                <td>{deal.name}</td>
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
                <h5 style={{textAlign: 'center'}}>Deals report</h5>
                <br/>
                <br/>
                {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null }   
                {this.dealsTable()}

            </div>

        )
    }

}

DealsReport.contextType = UserContext

export default DealsReport