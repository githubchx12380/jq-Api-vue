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
          .get('/',handle.Select)
          .get('/:id',handle.SelectId)
          .post('/',handle.Insert)
          .put('/:id',handle.update)
          .delete('/:id',handle.deleteData)
          .post('/list/page',handle.pageData)
          .get('/v1/seekDetail',handle.seekDetails)
          .get('/v1/contribute',handle.contribute)
    app.post('/admin/api/login',handle.loginData)      
       .post('/admin/api/upload',updata.single('file'),async (req,res) => {
    const file = req.file
    file.url = 'http://localhost:3000/upload/' + file.filename + ''
    res.send(file)
})      
}