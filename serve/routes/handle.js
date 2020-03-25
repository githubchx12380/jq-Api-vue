const model = require('./model')


exports.categoryGet = (req,res) => {
    model.categoryGets((err,data) => {
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
}


exports.Select = (req,res) => {
    model.SelectData(req.model,(err,data) => {
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
}
exports.SelectId = (req,res) => {
   model.SelectIid(req.model,req.params.id,(err,data) => {
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
   })
}

exports.Insert = (req,res) => {
    console.log(req.model)
    model.InsertData(req.model,req.body,function (err,data) {
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
}

exports.update = (req,res) => {
    let obj = req.body
    let list = req.model
    model.updateData(list,obj,data => { 
        res.send(data)
    })
}

exports.deleteData = (req,res) => {
    let id = req.params.id
    let list = req.model
    model.deleteID(list,id,data => {
        res.send(data)
    })
}



exports.loginData = (req,res) => {
    let obj = req.body
    model.loginverify(req,obj,(err,data) => {
        if(err){
            return res.status(301).send(err)
        }else{
            res.send(data)
        } 
    })
}



exports.uploadfile = async (req,res) => {
    const file = req.file
    file.url = 'http://localhost:3000/upload/' + file.filename + ''
    res.send(file)
}


