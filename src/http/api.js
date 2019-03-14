import http from './http'

const GET = 'GET'
const POST = 'POST'
const PUT = 'POST'
const DELETE = 'DELETE'

/**
 * api统一管理
 * 
 */
/** 首页登录api
 */
const login = (url,params) => http(url,POST,params,"正在登录中...")

/** 发布帖子api
 */
const release = (params) => http('/s/post',POST,params,"发布中...")

/** 首页作业列表获取api
 */
const gethomework = (params) => http('/s/homework',GET,params,"正在加载...")






/** 创建班群api
 */
const createClass = (params) => http('/t/class',POST,params,"创建中...")

/** 发布作业api
 */
const releaseWorks = (params) => http('',POST,params,"发布中...")

/** 获取班群列表api
 */
const getClassList = (params) => http('/t/class',GET,params,"正在加载...")

const api = {
    login,
    release,
    gethomework,
    createClass,
    releaseWorks,
    getClassList,
}

export default api