import React, { useEffect,  useState } from 'react'
import { showLoading } from '../../utils/helpers'
import axios from '../../api/axios'
import ENDPOINT from '../../api/endpoint'

function UserList(props) {
    const [usersList,  setUsersList]  = useState([])
    const [page, setPage] = useState(1)
    const [pageSize] = useState(10)
    const [totalCount,  setTotalCount] = useState(0)
    const [keyword, setKeyword] =  useState("")
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        getUsersList()
    }, [])

    const getUsersList = async (kw = keyword, pg = page, pgSize = pageSize) => {
        try {
            const params = {
                KeyWord: kw,
                page: pg,
                pageSize: pgSize
            }
            const  res = await axios.post(ENDPOINT.USERS_LIST, params)
            if (res.data && res.data.messageCode === 1) {
                setUsersList(res.data.result)
                setTotalCount(res.data.numberOfResult)
                setOffset(res.data.offset)
            }
        } catch (error) {
            console.log("Call API Users List Error: ", error)
        }
    }

    const handleSearch = () => {
        const kw = keyword
        getUsersList(kw)
    }

    const prevPage = async() => {
        const pg = page === 1 ? 1 : page - 1
        getUsersList(pg)
        setPage(pg)
    }

    const nextPage = async() => {
        const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page
        getUsersList(pg)
        setPage(pg)
    }

    const thCls =
        "px-3 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-left";
    const tdCls = "px-3 py-2 text-sm text-left";

    return (
        <>
            <div className="px-2 py-5  bg-gray-100">
                <div className="px-4 px-8 py-4 overflow-x-auto">
                    <div className="searchbox">
                        <div className="flex items-center justify-between">
                            <input
                                type="text"
                                className="focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                placeholder="Search..."
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="ml-4 align-middle bg-blue-500 hover:bg-blue-600 text-center px-4 py-2 text-white text-sm font-semibold rounded inline-block shadow-lg"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className={thCls}>Purpose</th>
                                    <th className={thCls}>Guest Name</th>
                                    <th className={thCls}>Contact Number</th>
                                    <th className={thCls}>Body Temperature</th>
                                </tr>
                            </thead>
                            <tbody className="customer-list">
                                {
                                    usersList.map((item) => (
                                        <tr
                                    key={item.visitType  + item.contactNumber}
                                    className="cursor-pointer bg-white even:bg-gray-100 hover:bg-gray-200">

                                    <td className={tdCls}>{item.visitType}</td>
                                    <td className={tdCls}>{item.fullName}</td>
                                    <td className={tdCls}>{item.contactNumber}</td>
                                    <td className={tdCls}>{item.bodyTemperature}</td>
                                </tr>
                                    ))
                                }
                                
                            </tbody>
                        </table>
                        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                            <span className="text-xs xs:text-sm text-gray-900">
                                Showing {totalCount === 0 ? 0 : offset + 1} to {offset + pageSize > totalCount ? totalCount : offset + pageSize} of {totalCount} Records
                            </span>
                            <div className="inline-flex mt-2 mt-0">
                                <button
                                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                                    onClick={prevPage}
                                >
                                    Prev
                                </button>
                                <button
                                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                                    onClick={nextPage}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserList