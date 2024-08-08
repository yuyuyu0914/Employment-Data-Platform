/**
 * 用户登录
 *  1. 收集表单数据并判断
 *  2. 数据提交
 *  3. 提示用户
 *  4. 登录成功（缓存数据+页面跳转）
 * */
const loginForm=document.querySelector('.login-form')
document.querySelector('#btn-login').addEventListener('click', async function (e) {
    const data=serialize(loginForm,{hash:true,empty:true})
    if(!data.username){
        return showToast('用户名不能为空')
    }
    if(!data.password){
        return showToast('密码不能为空')
    }
    if(data.username.length<8||data.username.length>30){
        return showToast('用户名不符合要求')
    }
    if(data.password.length<6||data.password.length>30){
        return showToast('密码不符合要求')
    }
    try{
        //发送请求并获取响应
        const res=await axios.post('/login',data)
        const obj={}
        obj.username=res.data.username
        obj.token=res.data.token
        //存储用户名信息到本地缓存
        localStorage.setItem('userMsg',JSON.stringify(obj))
        showToast(res.message)
        //跳转页面
        setTimeout(function(){
            location.href='./index.html'
        },1500)
    }catch(err){
        return showToast(err.response.data.message)
        }
    
})
