const mysql = require('mysql')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken')
const fs = require('fs')

const connetion = mysql.createConnection({
    host:"127.0.0.1",
    user:'root',
    password:'root',
    database:'project'
})

//分类表
exports.categoryGets = callback => {
    let sql = `SELECT * FROM category`
    connetion.query(sql,(err,result) => {
        if(err){
           callback({code:302,message:'获取数据失败'})
        }else{
           callback(null,result)
        }
    })
}

//查询所有
exports.SelectData = (list,callback) => {
    var sql = `SELECT * FROM ${list} `
    connetion.query(sql,(err,result) => {
        if(err){
          callback({code:302,message:'查询失败'})
        }else{
          callback(null,result)
        }
    })
}

//根据id查询单个数据
exports.SelectIid = (list,id,callback) => {
    if(list == 'category'){
        var sql  = `SELECT * FROM ${list} where _id=${id}`
    }else{
        var sql  = `SELECT * FROM ${list} where id=${id}`
    }
    connetion.query(sql,(err,result) => {
        if(err){
            callback({code:404,message:"错误"})
        }else{
            callback(null,result)
        }
    })
}

// 新增
exports.InsertData = (list,obj,callback) => {
    if(list == 'user'){
        var hash = bcrypt.hashSync(obj.password,salt);
        obj = {
            name:obj.name,
            username:obj.username,
            password:hash
        }

    }
    let sql = 'INSERT into '+ list +' set ?'
    connetion.query(sql,obj,(err,result) => {
        if(err){
            callback({code:302,message:'新增失败'})
            return
        }else if(result.affectedRows === 1){
            callback(null,result)
        }
    })
}

//修改数据,传入需要修改的表,id,和对象
exports.updateData = (list,obj,callback) => {
    if(list == 'category'){
        var sql = `update ${list} set ? where _id = ${obj._id}`
    }else{
        var sql = `update ${list} set ? where id=${obj.id}`
    }
    connetion.query(sql,obj,(err,result) => {
        if(err){
            callback({code:302,message:'修改失败'})
        }else{
            callback({code:200,success:true})
        }
    })
}

//删除数据,传入需要修改的表,和id
exports.deleteID = (list,id,callback) => {
    if(list == 'category'){
        var sql = `DELETE FROM ${list} where _id=${id}`
    }else{
        var sql = `DELETE FROM ${list} where id=${id}`
    }
    connetion.query(sql,(err,data) => {
        if(err){
            callback({code:404})
        }else{
            callback({code:200,success:true})
        }
    })
}



exports.loginverify = (req,obj,callback) => {
    let sql = `SELECT * FROM user where username='${obj.username}'`
    connetion.query(sql, (err,result) => {
        if(result.length == 0){
           callback({code:301,message:'用户名不存在'}) 
           return
        }
            const psd = bcrypt.compareSync(obj.password,result[0].password)
        if(!psd){
           callback({code:302,message:'密码错误'})
           return
        }
            const token = jwt.sign({id:result[0].id},req.app.get('selects'))
            const name = result[0].name
            callback(null,{token,name})
    })
}

//分页接口
exports.detailPage = (obj,callback) => {
    let sql = `SELECT * FROM category,detail WHERE category._id = detail._id ORDER BY DATE DESC LIMIT ${(obj.page - 1) * obj.pagesize},${obj.pagesize}`
    connetion.query(sql,(err,result) => {
        if(err){
            callback({code:302,msg:'查询失败'})
        }else{
            callback(null,result)
        }
    })
}

//页数查询
exports.countData = (callback) => {
   return new Promise(resolve => {
    let sql = `select count(*) count from detail`
    connetion.query(sql,(err,result) => {
        if(err){
            resolve({code:302,msg:'查询失败'})
        }else{
            resolve(result[0].count)
        }
    })
   })
}


//模糊搜索
exports.seekSqlDetail = (str,callback) => {
    let sql = `select * from detail,category where category._id = detail._id `
    if(str.indexOf('in:') != -1){
        str = str.replace('in:','')
        sql += ` and detail.id = ${str}`
    }else{
        sql += ` and name like '%${str}%'`
    }
    connetion.query(sql,(err,result) => {
        if(err){
            callback({code:302,msg:'查询失败'})
        }else{
            callback(null,result)
        }
    })
}

//话题
exports.modelContribute = (callback) => {
    let sql = `select * from webuser,userdetail where webuser.id = userdetail.webuser_id order by date desc`
    connetion.query(sql,(err,result) => {
        if(err){
            callback({code:302,msg:'查询失败'})
        }else{
            callback(null,result)
        }
    })
}