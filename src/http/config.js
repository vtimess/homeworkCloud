
// const devHost = 'http://192.168.1.109:8080'
// const devHost = 'http://192.168.1.104:8080'
const devHost = 'http://192.168.31.210:8080'


const proHost = 'https://www.vtimess.cn'

export default (process.env.NODE_ENV === 'development' ? devHost : proHost)