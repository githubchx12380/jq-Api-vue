const jwt = require('jsonwebtoken')
const model = require('./model')
module.exports =  (req,res,next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    if(!token){
        return  res.status(401).send({message:'请先登录'})
    }
    const {id} = jwt.verify(token,req.app.get('selects'))
    if(!id){
        return res.status(401).send({message:'请先登录'})
    }
    let str = req.model
    str = str.replace('parent','')
    model.SelectIid(str,id,(err,data) => {
        if(err){
            return res.status(401).send({message:'请先登录'})
        }
        next()
    })
    
}