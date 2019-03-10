import http from './http'

const GET = 'GET'
const POST = 'POST'
const PUT = 'POST'
const DELETE = 'DELETE'

/**
 * api统一管理
 * 
 */

const login = (params) => http('/s/login',POST,params,"正在登录中...")
const release = (params) => http('/s/post',POST,params,"发布中...")
const getPost = (params) => http('/s/post',GET,params,"正在加载...")

const api = {
    login,
    release,
    getPost
}

export default api