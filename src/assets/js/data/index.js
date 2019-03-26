import Vue from 'vue'
import indexDB from './db' // 导入数据库操作
import datas from './dbData' // 导入数据库初始设置
import localstore from './localStore'

Vue.prototype.$DB = datas.initDB // 注册数据库
Vue.prototype.$ojstores = datas.ojstores // 注册存储空间，表结构
Vue.prototype.$indexDB = indexDB // 注册数据库操作
Vue.prototype.$localstore = localstore // 注册 localstore 操作

Vue.prototype.$indexDB.checkData = function (ctx, storename, key) {
  return new Promise((resolve, reject) => {
    try {
      let db = ctx.$DB.db
      let storeFlag = ctx.$indexDB.hasStore(db, storename)
      if (storeFlag) {
        ctx.$indexDB.getDataByKey(db, storename, key)
          .then(res => {
            // {name:'slider',data:slider} 
            if(res) resolve(res)
            else reject('获取出错')            
          },err=>{
            reject(err)
          })
      }
    } catch (error) {
      console.log('查询出错')
      reject(error)
    }
  })
}
// data 是 {}形式，
Vue.prototype.$indexDB.addOneData = function (ctx, storename, data) {
  return new Promise((resolve,reject) => {
    try {
      let db = ctx.$DB.db
      let keypath = ctx.$ojstores[storename]
      let storeFlag = ctx.$indexDB.hasStore(db, storename)
      if (storeFlag) { // 没有进行 无表创建表的操作    ToDo
        ctx.$indexDB.addData(db, storename, keypath, data)
        resolve()
      }
    } catch (error) {
      reject('添加出错',error)
    }
  })
}