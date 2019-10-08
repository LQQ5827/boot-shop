import request from '@/request.js'
/**
 * 获取商品分页数据
 * @param {*} data 
 */
export function getListPage(data){
    return request({
        url:'/goods/'+data,
        method:'get'
    });
}
/**
 *  添加商品
 * @param {*} data 
 */
export function addGoods(data){
    return request({
        url:'/goods',
        method:'post',
        data:data
    });
}
/**
 * 首页轮播
 */
export function getFirst(){
    return request({
        url:'/goods/first',
        method:'get',
    });
}