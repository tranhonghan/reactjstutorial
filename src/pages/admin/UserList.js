import React, {useEffect} from 'react'
import {showLoading} from '../../utils/helpers'

function UserList(props) {

    useEffect(() => {
        setTimeout(() => {
            showLoading(false)
        }, 5000)
    })

    return (
        <div className="flex h-screen items-center justify-center">
           <span>Page UserList</span>
        </div>
    )
}

export default UserList