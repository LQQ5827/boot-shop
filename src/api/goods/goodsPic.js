import request from '@/request.js'

/**
 * 删除图片
 * @param {*} id 
 */
export function deletePic(id){
    return request({
        url:'/goodsPic/'+id,
        method:'delete'
    });
}

