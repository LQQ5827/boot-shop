import request from '@/request.js'
/**
 * 登录
 */
export function login(data){
    return request({
        url:'/admin/login',
        method:'post',
        data:data
    });
}
/**
 * 添加管理员
 * @param {*} data 
 */
export function addAdmin(data){
    console.log(data.username)
    return request({
        url:'/admin',
        method:'post',
        data:data
    });
}
/**
 * 修改管理员
 * @param {*} data 
 */
export function updateAdmin(data){
    return request({
        url:'/admin',
        method:'put',
        data:data
    });
}
/**
 * 获取管理员列表
 */
export function getList(){
    return request({
        url:'/admin',
        method:'get'
    });
}
/**
 * 批量删除
 */
export function batchDelete(ids){
    return request({
        url:'/admin/batch',
        method:'delete',
        data:ids
    });
}
/**
 * 重置密码
 */
export function resetPassword(data){
    return request({
        url:'/admin/resetPwd',
        method:'put',
        data:data
    });
}
/**
 * 根据id删除 
 * @param {*} data 
 */
export function deleteAdmin(id){
    return request({
        url:'/admin/'+id,
        method:'delete'
    });
}
