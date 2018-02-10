
// 公共变量
const attachPath = '/dist'// 前置路径,用于生成的静态
export default
{
  attachPath
}

// api 地址
// export const apiUrl ='http://127.0.0.1:8085';
// export const apiUrl = 'http://172.16.88.26:8081/api'
export const apiUrl = 'http://server.abigpush.com/api'

// 后台自动获取 新增条数 的 时间间隔  单位 毫秒
export const autoFetchTime = 30000
// 新增数目 显示的 临界值(大于该值)
export const criticalNotifyNum = 0
export const baseTitle = '一个大推网 | 实时同步全网折扣信息 | ABigPush.com'
