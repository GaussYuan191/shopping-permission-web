import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/product/list',
    method:'get',
    params:params
  })
}
export function addProduct(data) {
  return request({
    url:'/product/add',
    method:'post',
    data:data
  })
}

