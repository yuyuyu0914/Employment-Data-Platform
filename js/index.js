// 调用token校验函数，如果用户未登录或token无效，将跳转到登录页面
checkoutToken();

// 渲染用户名，这通常是在用户成功登录后，将用户名显示在页面上
renderUname();

// 清除用户的登录状态并跳转到登录页面
logout();

// 从本地存储中获取用户信息，并解构出token
const {token} = JSON.parse(localStorage.getItem('userMsg'))


const getData=async ()=>{
    // const data=localStorage.getItem('userMsg')?JSON.parse(localStorage.getItem('userMsg')):{}
    // const {token}=data
    // 使用axios发送GET请求到'/dashboard'，并在请求头中添加token
        const res=await axios({
            url:'/dashboard',
            method:'GET',
        })
        console.log(res)
        renderOverview(res.data.overview)

}
getData()

//调用渲染函数
const renderOverview=(overview)=>{
    console.log(overview)
    Object.keys(overview).forEach(item=>{
        document.querySelector(`.${item}`).innerHTML=overview[item]
    })
}