import axios from 'axios'
import Vue from 'vue'
import  { AlertPlugin } from 'vux'
import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
//import qs from 'qs';
let VueF = Vue


const port = '/api/';

axios.defaults.withCredentials = true;
axios.defaults.timeout = 60000;
const config = {headers:{post:{'Content-Type':'application/json;charset=UTF-8'}}};

const AjaxPost = (url, data={}, noToken) => {
    let timeNo = formatTime(undefined, 'requestTime'),token;
    
    if(window.sessionStorage.token)
    token = noToken ? {} : {token: window.sessionStorage.token};
    else
    token = noToken ? {} : {token: window.localStorage.token};

    let dataObj = {
    "service": url,"version": "1.0.1","partnerId": "1555922788801","bizContent": Object.assign({}, 
        {
            requestNo: timeNo,
            requestTime: timeNo,
            inputCharset: 'utf-8',
            signType: 'RSA',
            sign: 'sign',
        }, token, data),
    }
    return new Promise((resolve, reject) => {
        axios.post(`${port}${url}`,dataObj,config)
        .then(response => {
            resolve(response.data);
        }, err => {
            VueF.$vux.loading.hide();
            if(err.response.status==404)
            {
                VueF.$vux.alert.show({title: '提示',content: "请求不到接口，请检查网络是否正常。"})
            }else
            VueF.$vux.alert.show({title: '提示',content: "服务器错误"})
            //resolve(err);
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

//对象处理
const getUrlData = function (obj) {
    let res = '';
    for(let i in obj) {
        res += `&${i}=${obj[i]}`
    }
    return res.substring(1)
}

//全局字符串位数处理
const stringDispose = (str)=>{
    str = Number(str).toString();
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

const BtnColor = (e,arr,obj)=>{
    let thisLs = e;
    let className = thisLs.$refs.button.$el.className;
    if(obj){
        arr.forEach((v,i)=>{
            if(obj[v]!="")
            {
                className = className.replace("button_dark","")
                thisLs.$refs.button.$el.className =  className.replace("button_gray","") + " button_dark";   
            }else{
                className = className.replace("button_gray","")
                thisLs.$refs.button.$el.className =  className.replace("button_dark","") + " button_gray";  
            }
        });
    }else{
        arr.forEach((v,i)=>{
            if(thisLs[v]!="")
            {
                className = className.replace("button_dark","")
                thisLs.$refs.button.$el.className =  className.replace("button_gray","") + " button_dark";            
            }else{
                className = className.replace("button_gray","")
                thisLs.$refs.button.$el.className =  className.replace("button_dark","") + " button_gray";            
            }
        });        
    }

}

module.exports = {formatTime,AjaxPost,getUrlData,stringDispose,BtnColor}