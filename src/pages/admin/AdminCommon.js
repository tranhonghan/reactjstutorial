import React from 'react'

function Common(props) {
    return (
        <div className="flex h-screen items-center justify-center">
           <span>Admin Common</span>
           <div className="w-full lg:w-2/3 m-auto">
                {props.children}
           </div>
        </div>
    )
}

export default Common