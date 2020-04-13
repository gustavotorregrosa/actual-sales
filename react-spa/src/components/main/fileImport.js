import React, { Component } from 'react'
import UserContext from '../../suport/userContext'
import * as helper from '../../suport/helper'
import M from 'materialize-css'
import history from '../../suport/history'

class FileImportScreen extends Component {

    constructor(props){
        super(props)
        this.inputFile = null
    }

    state = {
        loading: false
    }

    sendFile = e => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        const file = this.inputFile.files[0]
        let formData = new FormData()
        formData.append('myFiles', file)

        const options = {
            method: 'post',
            body: formData
        }
        helper.jwtFetch('uploadfile', this.context, options).then(r => {
            this.setState({
                loading: false
            })
            history.push('/')
            M.toast({ html: r.message })
        }).catch(r => {
            history.push('/')
            M.toast({ html: r.message })

        })
        
    }

    render() {
        return (
            <div>
                <h5>File import</h5>
                <br/><br/><br/>
                <div className="row">
                    <div style={{padding: '2em'}} className="col offset-s3 s6 card">
                        <form>
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>File</span>
                                    <input ref={ input => this.inputFile = input } type="file" />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" />
                                </div>
                            </div>
                            <br/>
                            <a onClick={e => this.sendFile(e)} className="waves-effect waves-light btn right">Upload</a>
                            <br/><br/>
                            {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null }   
                        </form>
                    </div>
                </div>  
            </div>
        )
    }

}

FileImportScreen.contextType = UserContext

export default FileImportScreen
