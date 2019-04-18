import axios from 'axios'
//import qs from 'qs';


const port = '/api/';

axios.defaults.withCredentials = true;
axios.defaults.timeout = 30000;

const AjaxPost = (url, data={}, noToken) => {
    let timeNo = formatTime(undefined, 'requestTime');
    let token = noToken ? {} : {token: sessionStorage.token};
    let dataObj = {
    "service": url,
        "version": "1.0",
        "partnerId": "111111111111",
            "bizContent": Object.assign({}, {
                requestNo: timeNo,
                requestTime: timeNo,
                inputCharset: 'utf-8',
                signType: 'RSA',
                sign: 'sign',
            }, token, data),
    }
    return new Promise((resolve, reject) => {
        axios.post(`${port}${url}`,dataObj,{headers:{post:{'Content-Type':'application/json;charset=UTF-8'}}})
        .then(response => {
            resolve(response.data);
        }, err => {
            resolve(err);
        })
        .catch((error) => {
            reject(error)
        })
    })
}

const AjaxGet = (url, data, noToken) => {
    let timeNo = formatTime(undefined, 'requestTime');
    let token = noToken ? {} : {token: sessionStorage.token};
    return new Promise((resolve, reject) => {
        axios.get(`${port}${url}`,{
        "service": url,
            "version": "1.0",
            "partnerId": "111111111111",
                "bizContent": Object.assign({}, {
                  requestNo: timeNo,
                  requestTime: timeNo,
                  inputCharset: 'utf-8',
                  signType: 'RSA',
                  sign: 'sign',
                }, token, data),
        }
        ,{headers:{post:{'Content-Type':'application/json;charset=UTF-8'}}})
        .then(response => {
            resolve(response.data);
        }, err => {
            resolve(err);
        })
        .catch((error) => {
            reject(error)
        })
    })
}

const formatTime = (date= new Date(), type) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return type === 'requestTime' ? [year, month, day, hour, minute, second].map(formatNumber).join('') : 
    [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//格式化时间 +0
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

//按钮是否高亮 condition条件
const isBtnClick = function(condition) {
    if (condition) {
      this.setData
        ({
          btnClass: "button_dark",
          btnHoverClass: "button_dark_hover",
          btnBind: true
        })
    }
    else {
      this.setData
        ({
          btnClass: "button_gray",
          btnHoverClass: "button_gray_hover",
          btnBind: false
        })
    }
  }
//弹出框

const getUrlData = function (obj) {
    let res = '';
    for(let i in obj) {
        res += `&${i}=${obj[i]}`
    }
    return res.substring(1)
}

//全局字符串位数处理
const stringDispose = (str)=>{
    let strLe = str.length,newstr = "",fig = parseInt(strLe/3),g=3,arr = str.split("").reverse();
    if(str.indexOf(".")>=0)
    {
        arr = (str.substr(0,str.indexOf("."))).split("").reverse();
        var arr1 = (str.substr(str.indexOf("."),str.length)).split("").reverse()
        for(var s = 0;s<fig;s++)
        {
            arr.forEach((v,i)=>{
            if(i==g)
            {
                arr.splice(g,0," ")            
            }
            });
            g = g +4
        }
        arr = arr.reverse();
        var newarr1 = arr1.reverse();
        arr = arr.concat(newarr1)
    }else
    {
        for(var s = 0;s<fig;s++)
        {
            arr.forEach((v,i)=>{
            if(i==g)
            {
                arr.splice(g,0," ")            
            }
            });
            g = g +4   
        }
        arr = arr.reverse()
    }
    newstr = arr.toString().replace(/,/g,"").replace(/ /g,",")
    return newstr
}

module.exports = {
    formatTime: formatTime,
    AjaxPost: AjaxPost,
    AjaxGet: AjaxGet,
    //AjaxResult:AjaxResult,
    isBtnClick: isBtnClick,
    getUrlData: getUrlData,
    stringDispose:stringDispose,
  }