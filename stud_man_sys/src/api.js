import Axios from 'axios'
import urls from './URLs.js'
const api = {}
const size = 15
const appKey = {
    appkey: 'yang997_1558673628969'
}

api.findByPage = function (page = 1) {
    return Axios.get(urls.baseURL + urls.findByPage,{
        params: {
            page,
            size,
            ...appKey
        }
    })
}

api.updateStu = function (data) {
    return Axios.get(urls.baseURL + urls.updateStu,{
        params: {
            ...appKey,
            ...data
        }
    })
}

api.delBySno = function(sNo){
    return Axios.get(urls.baseURL + urls.delBySno,{
        params: {
            ...appKey,
            sNo
        }
    })
}

api.stuSearch = function(search,page=1) {
    return Axios.get(urls.baseURL + urls.stuSearch,{
        params: {
            ...appKey,
            search,
            sex: -1,
            page,
            size
        }
    }) 
}

api.addStu = function(data) {
    return Axios.get(urls.baseURL + urls.addStu,{
        params: {
            ...appKey,
            ...data
        }
    })
}
// console.log(api)
export default api