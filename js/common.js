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

//公共的token校验函数
const checkoutToken = () => {
    //1.获取本地缓存中的token
    const {token} = JSON.parse(localStorage.getItem('userMsg'))
    console.log(token)
    //2.判断token是否存在
    if (!token) {
        showToast("请先登录")
        setTimeout(() => {
        location.href = './login.html'
    },1500)
}
}
