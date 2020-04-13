import React from 'react'
import csvLogo from '../../assets/csv-icon.png'

const myStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '20em'
  }

const Logo = () => (
    <div>
        <img src={csvLogo} style={myStyle}/>
    </div>
)

export default Logo