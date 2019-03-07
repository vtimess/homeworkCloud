import http from './http'

const GET = 'GET'
const POST = 'POST'
const PUT = 'POST'
const DELETE = 'DELETE'

/**
 * api统一管理
 * 
 */

const login = (params) => http('/login',GET,params,"正在登录中...")

const api = {
    login
}

export default api