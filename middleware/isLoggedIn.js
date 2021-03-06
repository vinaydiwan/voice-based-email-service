module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash("error","You must be signed in first!")
        return res.redirect("/login");
    }else if(req.user.username !== req.params.id){
        req.session.returnTo = req.originalUrl
        req.flash("error","You must be signed in first!")
        return res.redirect("/login");
    }
    req.session.previouspath = req.originalUrl;
    next()
}