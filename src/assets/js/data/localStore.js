/*
From: https: //blog.csdn.net/weixin_42779950/article/details/81989105
 用来获取和设置 删除 localStorage 存储
*/
const local = {
  save(key, value) {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },
  fetch(key) {
    return JSON.parse(localStorage.getItem(key)) || {}
  },
  del(key) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  }
}
export default  local;
