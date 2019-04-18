
//login
import Login from '../view/Login'
import NotFound from '../view/404'

import register from '../view/register'
import verifyPhone from '../view/register/verifyPhone'
import uploadDocuments from '../view/register/uploadDocuments'
import uploadCard from '../view/register/uploadCard'
import uploadCard2 from '../view/register/uploadCard2'
import affirmCompanyName from '../view/register/affirmCompanyName'
import perfectionCompanyInfo from '../view/register/perfectionCompanyInfo'
import perfectionLegalInfo from '../view/register/perfectionLegalInfo'
import faceFecognition from '../view/register/faceFecognition'
import contractSigning from '../view/register/contractSigning'
import waitReview from '../view/register/waitReview'

const  routes = [
      {
        path: '/login',
        component: Login,
        name: 'login',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/uploadDocuments' }
    },
    //注册
    { path: '/register',component: register,name: '注册首页',iconCls: 'el-icon-setting',classschildren: []},
    { path: '/verifyPhone',component: verifyPhone, name: '验证手机号',iconCls:'',children: []},
    { path: '/uploadDocuments',component: uploadDocuments, name: '上传证件资料',iconCls:'',children: []},
    { path: '/uploadCard',component: uploadCard, name: '上传身份证',iconCls:'',children: []},
    { path: '/uploadCard2',component: uploadCard2, name: '上传身份证2',iconCls:'',children: []},
    { path: '/affirmCompanyName',component: affirmCompanyName, name: '确认公司名称',iconCls:'',children: []},
    { path: '/perfectionCompanyInfo',component: perfectionCompanyInfo, name: '完善公司信息',iconCls:'',children: []},
    { path: '/perfectionLegalInfo',component: perfectionLegalInfo, name: '完善法人信息',iconCls:'',children: []},
    { path: '/faceFecognition',component: faceFecognition, name: '人脸识别',iconCls:'',children: []},
    { path: '/contractSigning',component: contractSigning, name: '合同签署',iconCls:'',children: []},
    { path: '/waitReview',component: waitReview, name: '注册成功等待审核',iconCls:'',children: []},
  ]

export default {
    routes,
};