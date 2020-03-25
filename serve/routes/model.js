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

//分类表只有一个,sql写死
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

//查询所有,带parent拿到关联数据,无parent拿到无关联数据
exports.SelectData = (list,callback) => {
    let str = list
    str = str.replace('parent','')  //所有关联数据请求后面带上parent即可

    if(list.indexOf('parent') != -1){  
        var sql = `SELECT * FROM category,${str} WHERE category._id=${str}._id order by date desc`
    }else{
        var sql = `SELECT * FROM ${list} `
    }
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
        console.log(obj);
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


