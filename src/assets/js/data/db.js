/* ejslint esversion:6  */
/*
用来获取和设置 删除 indexDB 存储
*/

const indexDB = {
  indexedDB: window.indexedDB || window.webkitindexedDB,
  IDBKeyRange: window.IDBKeyRange || window.webkitIDBKeyRange, //键范围

  openDB: function (DB) {
    //建立或打开数据库
    return new Promise(resolve => {
      let name = DB.name;
      let version = DB.version || 1;
      let request = this.indexedDB.open(name, version);
      request.onerror = function (e) {
       console.log(e.currentTarget.error.message);
      };
      request.onsuccess = function (e) {
        DB.db = e.target.result;
        console.log('成功建立并打开数据库: ' + DB.name + '  version' + DB.version);
        resolve();
      };
      request.onupgradeneeded = function (e) {
        DB.db = e.target.result;
        console.log('初建数据库 : ' + DB.name + '  version' + DB.version);
        resolve()
      }
    })
  },
  deletedb: function (dbname) {
    //删除数据库
    this.indexedDB.deleteDatabase(dbname);
    console.log(dbname + ' 数据库已删除');
  },
  closeDB: function (db) {
    //关闭数据库
    db.close();
    console.log('数据库已关闭');
  },
  addData: function (db, storename, keypath, data) {
    //添加数据，重复添加会报错
    //设置传入数组，即使是一个对象也要包装成数组
    //添加的数据要指定 keypath ！！
    let store = db.transaction(storename, 'readwrite').objectStore(storename);
      //添加数据，重复添加会更新原有数据,每次添加自动添加 totalCount 字段记录数据
      let num = data.totalCount ? data.totalCount : 0
      data.totalCount = num
      let request = store.add(data);
      request.onerror = () => {
        console.log('add添加数据库中已有该数据');
        this.putData(db, storename, keypath, data);
      };
      request.onsuccess = () => {
        console.log('add 添加数据已存入数据库');
      };
  },
  putData: function (db, storename, keypath, data) {
    //添加数据，重复添加会更新原有数据,每次添加自动添加 totalCount 字段记录数据
      if (data[keypath]) {
        this.getDataByKey(db, storename, data[keypath])
          .then(res => {
            res.totalCount += data.totalCount;
            let store = db.transaction(storename, 'readwrite').objectStore(storename);
            let request = store.put(res);
            request.onsuccess = function () {
              console.log(`put ${data[keypath]} 添加数据已存入数据库`);
            };
          })
      }
  },
  getAllData: function (db, storename) {
    //获取所有数据
    return new Promise(resolve => {
      let store = db.transaction(storename, 'readwrite').objectStore(storename);
      let allRecords = store.getAll();

      allRecords.onsuccess = () => {
        console.log(' GET allRecords ');
        resolve(allRecords.result);
      }
    })
  },
  getDataByKey: function (db, storename, key) {
    //根据存储空间的键找到对应数据
    return new Promise(resolve => {
      let store = db.transaction(storename, 'readwrite').objectStore(storename);
      let request = store.get(key);
      request.onerror = function () {
        //console.log('getDataByKey error');
       console.log('GetDataByKey error');
      };
      request.onsuccess = function (e) {
        let result = e.target.result;
        console.log('查找数据成功', result);
        resolve(result);
      };
    })
  },
  deleteData: function (db, storename, key) {
    //删除某一条记录
    let store = db.transaction(storename, 'readwrite').objectStore(storename);
    store.delete(key);
    console.log('已删除存储空间' + storename + '中' + key + '记录');
  },
  addStore: function (db, ojstore) {
    //建立对象存储空间(ObjectStore)
    return new Promise(resolve => {
      if (!db.objectStoreNames.contains(ojstore.name)) {
        //没有该对象空间时创建该对象空间
        db.createObjectStore(ojstore.name, {
          keyPath: ojstore.keypath
        });
        console.log('成功建立对象存储空间：' + ojstore.name);
        resolve()
      } else {
        console.log('对象存储空间：' + ojstore.name + '  已存在或创建失败');
      }
    })
  },
  hasStore: function (db, name) {
    return db.objectStoreNames.contains(name)
  },
  clearStore: function (db, storename) {
    //删除存储空间全部记录
    let store = db.transaction(storename, 'readwrite').objectStore(storename);
    store.clear();
    console.log('已删除存储空间' + storename + '全部记录');
  }
}

export default indexDB;