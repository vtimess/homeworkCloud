
const devHost = 'http://192.168.1.106:8080'

const proHost = 'https://www.vtimess.cn'

export default (process.env.NODE_ENV === 'development' ? devHost : proHost)