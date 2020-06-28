import React, {useEffect} from 'react'
import LOGO from '../../images/logo.svg'
import { Link } from "react-router-dom";
import APP_CONSTANTS from '../../constants/appConstants'
import {useHistory} from 'react-router-dom'

function AdminCommon(props) {
    const history = useHistory()

    // useEffect(() => {
    //     const token = localStorage.getItem(APP_CONSTANTS.USER_TOKEN)
    //     if (!token) {
    //         history.replace("/login")
    //     }
    // })

    return (
        <div className="min-h-screen bg-gray-200">
            <nav className="flex items-center justify-between flex-wrap p-6">
                <div className="flex items-center flex-no-shrink text-white mr-6">
                    <img
                        src="//logo.clearbit.com/spotify.com"
                        alt=""
                        className="max-w-full"
                        style={{ maxHeight: 100, maxWidth: 150 }}
                    />
                </div>
                <div className="mt-4 lg:mt-0 w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow flex items-center divide-x">
                        <Link
                            to="/admin"
                            className="block lg:inline-block lg:mt-0 text-blue-700 hover:text-blue-400 px-2"
                        >
                            Users List
                        </Link>
                        <Link to="/admin/upload-photo" className="block lg:inline-block lg:mt-0 text-blue-700 hover:text-blue-400 px-2">
                            Upload Photo
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <button
                            className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            {props.children}
        </div>
    )
}

export default AdminCommon