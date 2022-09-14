exports.log = (req, res, next)=>{
    console.log(req.url, new Date());
    next();
}