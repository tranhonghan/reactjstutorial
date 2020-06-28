import  APP_CONSTANTS from '../constants/appConstants'

class Authentication {
    constructor() {

    }

    isAuthentication() {
        const token = localStorage.getItem(APP_CONSTANTS.USER_TOKEN)
        return token
    }
}

const authentication = new Authentication()
export {authentication}