
//辅助
import NotFound from '^/404'
import loading from '^/loading'
import iframeFile from '^/iframeFile'
//import PDF from '../components/PDF'
//注册
import register from '^/register'
import verifyPhone from '^/register/verifyPhone'
import uploadDocuments from '^/register/uploadDocuments'
import uploadCard from '^/register/uploadCard'
import uploadCard2 from '^/register/uploadCard2'
import affirmCompanyName from '^/register/affirmCompanyName'
import perfectionCompanyInfo from '^/register/perfectionCompanyInfo'
import perfectionLegalInfo from '^/register/perfectionLegalInfo'
import faceFecognition from '^/register/faceFecognition'
import contractSigning from '^/register/contractSigning'
import waitReview from '^/register/waitReview'
//登录modifyPassword
import Login from '^/Login'
import passwordRetrieve from '^/Login/passwordRetrieve'
import setPassword from '^/Login/setPassword'
import modifyPassword from '^/Login/modifyPassword'
//首页
import Home from '^/index'
//申请贷款 infoConfirming
import applicationLoan from '^/loan'
import infoConfirming from '^/loan/infoConfirming'
//我的
import mine from '^/mine'
import pendingLoan from '^/mine/pendingLoan'
import pendingLoanDetails from '^/mine/pendingLoanDetails'
import pendingContract from '^/mine/pendingContract'
import pendingContractDetails from '^/mine/pendingContractDetails'
import pendingLoanLoan from '^/mine/pendingLoanLoan'
import pendingLoanLoanDetails from '^/mine/pendingLoanLoanDetails'
import outstandingLoan from '^/mine/outstandingLoan'
import outstandingLoanDetailsExpire from '^/mine/outstandingLoanDetailsExpire'
import outstandingLoanDetailsOverdue from '^/mine/outstandingLoanDetailsOverdue'
import repaidLoan from '^/mine/repaidLoan'
import repaidLoanDetails from '^/mine/repaidLoanDetails'
import badLoan  from '^/mine/badLoan'
import badLoanDetails  from '^/mine/badLoanDetails'
//设置 personalInformation 
import setting from '^/mine/setting'
import personalInformation from '^/mine/personalInformation'
import aboutUs from '^/mine/aboutUs'

const  routes = [
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/loading',
        component: loading,
        name: '',
        hidden: true
    },
    {
        path: '/iframeFile',
        component: iframeFile,
        name: '',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/login' }
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
    //登录
    { path: '/login',component: Login, name: '登录',iconCls:'',children: [],hidden: true},
    { path: '/passwordRetrieve',component: passwordRetrieve, name: '密码找回',iconCls:'',children: [],hidden: true},
    { path: '/setPassword',component: setPassword, name: '设置新密码',iconCls:'',children: [],hidden: true},
    { path: '/modifyPassword',component: modifyPassword, name: '修改密码',iconCls:'',children: [],hidden: true},
    //首页
    { path: '/Home',component: Home, name: '首页',iconCls:'',children: [],hidden: true},
    //申请贷款
    { path: '/applicationLoan',component: applicationLoan, name: '申请贷款',iconCls:'',children: [],hidden: true},
    { path: '/infoConfirming',component: infoConfirming, name: '信息确认',iconCls:'',children: [],hidden: true},
    //我的
    { path: '/mine',component: mine, name: '我的',iconCls:'',children: [],hidden: true},
    { path: '/pendingLoan',component: pendingLoan, name: '受理中贷款',iconCls:'',children: [],hidden: true},
    { path: '/pendingLoanDetails',component: pendingLoanDetails, name: '受理中贷款详情',iconCls:'',children: [],hidden: true},
    { path: '/pendingContract',component: pendingContract, name: '待签订合同',iconCls:'',children: [],hidden: true},
    { path: '/pendingContractDetails',component: pendingContractDetails, name: '待签订合同详情',iconCls:'',children: [],hidden: true},
    { path: '/pendingLoanLoan',component: pendingLoanLoan, name: '待放款贷款',iconCls:'',children: [],hidden: true},
    { path: '/pendingLoanLoanDetails',component: pendingLoanLoanDetails, name: '待放款贷款详情',iconCls:'',children: [],hidden: true},
    { path: '/outstandingLoan',component: outstandingLoan, name: '待还款贷款',iconCls:'',children: [],hidden: true},
    { path: '/outstandingLoanDetailsExpire',component: outstandingLoanDetailsExpire, name: '待还款贷款详情',iconCls:'',children: [],hidden: true},
    { path: '/outstandingLoanDetailsOverdue',component: outstandingLoanDetailsOverdue, name: '待还款贷款详情',iconCls:'',children: [],hidden: true},
    { path: '/repaidLoan',component: repaidLoan, name: '已还款贷款',iconCls:'',children: [],hidden: true},
    { path: '/repaidLoanDetails',component: repaidLoanDetails, name: '已还款贷款详情',iconCls:'',children: [],hidden: true},
    { path: '/badLoan',component: badLoan, name: '未通过贷款',iconCls:'',children: [],hidden: true},
    { path: '/badLoanDetails',component: badLoanDetails, name: '未通过贷款详情',iconCls:'',children: [],hidden: true},
    //设置
    { path: '/setting',component: setting, name: '设置',iconCls:'',children: [],hidden: true},
    { path: '/personalInformation',component: personalInformation, name: '个人信息',iconCls:'',children: [],hidden: true},
    { path: '/aboutUs',component: aboutUs, name: '关于我们',iconCls:'',children: [],hidden: true},
    //{ path: '/FilePDF',component: PDF, name: 'FilePDF',iconCls:'',children: [],hidden: true},

  ]

module.exports = {routes}