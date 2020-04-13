import React, { Component } from 'react'
import SplashScreen from './splashScreen'
import FileImportScreen from './fileImport'
import history from '../../suport/history'
import { Route, BrowserRouter, Switch, withRouter, Redirect } from 'react-router-dom'
import UserContext  from '../../suport/userContext'
import NavBar from './navBar'
import ClientsReport from './reports/clients'
import UnitClientReport from './reports/unitClient'
import DealsReport from './reports/deals'
import UnitDealReport from './reports/unitDeal'

class MainScreen extends Component {

    render() {
        return (
            <div>
                <NavBar />
                    <br/><br/><br/><br/>

                    <div className="container">
                        <div className="row">
                            <Switch>
                                <Route path='/import' component={FileImportScreen} />
                                <Route path='/clients-report' component={ClientsReport} />
                                <Route path='/deals-report' component={DealsReport} />
                                <Route path='/unit-client-report/:id' component={UnitClientReport} />
                                <Route path='/unit-deal-report/:id' component={UnitDealReport} />
                                <Route path='/' exact component={SplashScreen} />
                                <Redirect from="/*" to="/" />
                            </Switch>
                        </div>
                    </div>    
            </div>
        )
    }

}

// MainScreen.contextType = UserContext

export default MainScreen
