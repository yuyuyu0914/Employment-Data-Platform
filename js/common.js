//配置axios基地址(全局默认值)
axios.defaults.baseURL = 'https://hmajax.itheima.net';

//公共的提示框函数
const showToast = (msg) => {
    // alert(msg)
    //生成实例对象
    const mytoast=document.querySelector('.my-toast')
    const toastObj=new bootstrap.Toast(mytoast)
    toastObj.show()
    //2.2让提示框组件内容改变
    document.querySelector('.toast-body').innerHTML=msg 
}
// showToast('成功1')

const data=localStorage.getItem('userMsg')?JSON.parse(localStorage.getItem('userMsg')):{}
//公共的token校验函数
const checkoutToken = () => {
    //1.获取本地缓存中的token
    const {token} = data
    console.log(token)
    //2.判断token是否存在
    if (!token) {
        showToast("请先登录")
        setTimeout(() => {
        location.href = './login.html'
    },1500)
}
}

//回显用户名
const renderUname=()=>{
    const {username} = data
    console.log(username)
    if(username){
        document.querySelector('.username').innerHTML=username
    }
}

//退出登录
const logout=()=>{
    //清除本地缓存
    document.querySelector('#logout').addEventListener('click',function(){
    localStorage.removeItem('userMsg')
    //提示用户
    showToast('退出成功')
    //跳转页面
    setTimeout(()=>{
        location.href='./login.html'
    },1500)
})
}

//6.添加请求拦截器
axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    console.log("请求拦截器被经过");
    const {token}=data
    if (token) {
        config.headers['Authorization'] =token;
    }
    return config;
  },error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 7.添加响应拦截器
axios.interceptors.response.use(response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  }, error =>{
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if(error.response.status===401){
        showToast('您的登录信息已过期，请重新登录')
        localStorage.removeItem('userMsg')
        setTimeout(()=>{
          location.href='./login.html'
        },1500)
    }
    return Promise.reject(error);
  });