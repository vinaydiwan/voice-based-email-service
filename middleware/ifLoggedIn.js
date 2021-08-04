module.exports.ifLoggedIn = (req,res,next)=>{
    if(req.user){
        res.redirect(`/dashboard/${req.user.username}`)
    }
    next()
}