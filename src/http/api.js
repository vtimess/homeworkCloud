import http from './http'
import upload from './upload'
import store from '../store/'

const GET = 'GET'
const POST = 'POST'
const PUT = 'PUT'
const DELETE = 'DELETE'

/**
 * api统一管理
 * 
 */

/** 首页登录api
 */
const login = (url,params) => http(url,POST,params,"正在登录中...")

/** 获取帖子api
 */
const getPost = (params) => http('/s/post',GET,params,"正在加载...")

/**
 * 查看资料api
 */
const getUser = () =>http((store.state.status==0?'/s':'/t')+'/info',GET,null,1)

const uploadImg = () =>upload(type)

/**
 * 学生端api
 */

/** 获取个人资料api
 */
const getProfile = (params) => http('/s/info',GET,params,"数据读取中...")

/** 修改个人资料api
 */
const modifyProfile = (params) => http('/s/info',POST,params,"修改中...")

/** 搜索班级api
 */
const search = (params) => http('/s/class',GET,params,"正在加载...")

/** 加入班级api
 */
const join = (params) => http('/s/class',PUT,params,"正在加载...")

/** 获取加入的班级List api
 */
const getClass = (params) => http('/s/class/joined',GET,params,"正在加载...")

/** 发布帖子api
 */
const release = (params) => http('/s/post',POST,params,"发布中...")

/** 首页作业列表获取api
 */
const gethomework = (params) => http('/s/homework',GET,params,"正在加载...")

/** 作业提交api
 */
const postHomework = (params) => http('/s/homework',POST,params)

/** 获取班群详细信息api
 */
const getCDS = (params) =>http('/s/class/user',GET,params,"正在加载...")



/**
 * 教师端api
 */

/** 获取个人信息api
 */
const getInfo = (params) => http('/t/info',GET,params,"读取中...")

/** 修改个人信息api
 */
const modifyInfo = (params) => http('/t/info',POST,params,"修改中...")

/** 创建班群api
 */
const createClass = (params) => http('/t/class',POST,params,"创建中...")

/** 发布作业api
 */
const releaseWorks = (params) => http('/t/homework',POST,params,"发布中...")

/** 获取班群列表api
 */
const getClassList = (params) => http('/t/class',GET,params,"正在加载...")

/** 更新班群信息api
 */
const updateClass = (params) => http('/t/class',PUT,params,"上传修改...")

/** 获取班群详细信息api
 */
const getCDT = (params) =>http('/t/class/user',GET,params,"正在加载...")

/** 获取作业列表api
 */
const getWorksT = (params) =>http('/t/homework',GET,params,"正在加载...")



const api = {
    login,
    getPost,
    getUser,
    uploadImg,
    
    search,
    getProfile,
    modifyProfile,
    getClass,
    join,
    release,
    gethomework,
    postHomework,
    getCDS,


    createClass,
    releaseWorks,
    getClassList,
    updateClass,
    getInfo,
    modifyInfo,
    getCDT,
    getWorksT
}

export default api