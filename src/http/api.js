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
const getPost = (params) => http((store.state.status==1?'/s':'/t')+'/post',GET,params,"正在加载...")

/**
 * 查看资料api
 */
const getUser = (params) =>http((store.state.status==1?'/s':'/t')+'/info/'+params,GET,null)

const uploadImg = () =>upload(type)


/** 帖子点赞api
 */
const postZan = (params) =>http((store.state.status==1?'/s':'/t')+'/post/like',PUT,params)

/** 用户点赞api
 */
const userZan = (params) =>http((store.state.status==1?'/s':'/t')+'/like',PUT,params)

/** 帖子详情api
 */
const postDetail = (params) =>http((store.state.status==1?'/s':'/t')+'/post/'+params,GET,null,"正在加载...")

/** 评论帖子api
 */
const rePost = (params) =>http((store.state.status==1?'/s':'/t')+'/re/post',POST,params,"正在加载...")

/** 点赞评论api
 */
const commentZan = (params) =>http((store.state.status==1?'/s':'/t')+'/re/like',POST,params)



/**
 * 学生端api
 */

/** 获取个人资料api
 */
const getProfile = (params) => http('/s/info',GET,params)

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

/** 获取作业列表api
 */
const getworksList = (params) =>http('/s/homework',GET,params,"正在加载...")

/** 获取作业详情api
 */
const getWkDetailS = (params) =>http('/s/homework/detail',GET,params,"正在加载...")

/** 退出班级api
 */
const exitClass = (params) =>http('/s/class/'+params,DELETE,null,"退出班群...")

/** 获取班群详细信息api
 */





/**
 * 教师端api
 */

/** 获取个人信息api
 */
const getInfo = (params) => http('/t/info',GET,params)

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

/** 获取作业详情api
 */
const getWkDetailT = (params) =>http('/t/homework/'+params,GET,null,"正在加载...")

/** 获取学生作业图片api
 */
const getImageT = (params) =>http('/t/homework/image',GET,params)

/** 批改作业图片api
 */
const updeteImageT = (params) =>http('/t/homework/image',POST,params,"正在提交批改...")


const api = {
    login,
    getPost,
    getUser,
    uploadImg,
    postZan,
    userZan,
    postDetail,
    rePost,
    commentZan,
    
    search,
    getProfile,
    modifyProfile,
    getClass,
    join,
    release,
    gethomework,
    postHomework,
    getCDS,
    getworksList,
    getWkDetailS,
    exitClass,


    createClass,
    releaseWorks,
    getClassList,
    updateClass,
    getInfo,
    modifyInfo,
    getCDT,
    getWorksT,
    getWkDetailT,
    getImageT,
    updeteImageT
}

export default api