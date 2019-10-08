import request from '@/request.js'

/**
 *  添加分类
 */
export function add(data){
    return request({
        url:'/category',
        method:'post',
        data:data
    });
}
/**
 * 获取分类列表
 */
export function getList(){
    return request({
        url:'/category',
        method:'get'
    });
}

/**
 * 删除分类
 */
export function deleteCategory(id){
    return request({
        url:'/category'+id,
        method:'delete'
    });
}