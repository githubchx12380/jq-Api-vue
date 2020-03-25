module.exports = app => {
    
    const express = require('express')
    const handle = require('./handle')
    const auto = require('./midden')
    const router = express.Router({
        mergeParams:true
    })
    app.use('/admin/api',router)
    const multer = require('multer')
    const updata = multer({dest:__dirname + "/../upload"})

    //挂载动态请求中间件
    app.use('/admin/api/rest/:resource',async (req,res,next) => {
        req.model = req.params.resource
        next()
    },router)
    

    router.get('/category',handle.categoryGet)
          .get('/',auto,handle.Select)
          .get('/:id',handle.SelectId)
          .post('/',handle.Insert)
          .put('/:id',handle.update)
          .delete('/:id',handle.deleteData)
         
    app.post('/admin/api/login',handle.loginData)      
       .post('/admin/api/upload',updata.single('file'),handle.uploadfile)      
}