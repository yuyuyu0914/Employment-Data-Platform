/**
 * 用户登录
 *  1. 收集表单数据并判断
 *  2. 数据提交
 *  3. 提示用户
 *  4. 登录成功（缓存数据+页面跳转）
 * */
document.querySelector('#btn-register').addEventListener('click', async function (e) {
    const data=serialize(document.querySelector('.register-form'),{hash:true,empty:true})
    if(!data.username){
        return showToast('用户名不能为空')
    }
    if(!data.password){
        return showToast('密码不能为空')
    }
    if(data.username.length<8||data.username.length>30){
        return showToast('用户名不符合要求，用户名长度必须在8-30之间')
    }
    if(data.password.length<6||data.password.length>30){
        return showToast('密码不符合要求，密码长度必顼在6-30之间')
    }
    //发送请求
    const res=await axios.post('/register',data)
    console.log(res)
    showToast(res.message)
    setTimeout(()=>{
        location.href='./login.html'
    },2000)
})