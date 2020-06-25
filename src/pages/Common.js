import React from 'react'
import LOGO from '../images/logo.svg'

function Common(props) {
    return (
        <div className="flex h-screen items-center justify-center">
           <img src={LOGO} width="150" height="150"/>
           <div className="w-full lg:w-2/3 m-auto">
                {props.children}
           </div>
        </div>
    )
}

export default Common