function isLoggedIn(req, res, next) {
  
    if (req.session.user === undefined) {
        res.redirect("/")
    } else {
        next() 
    }

}

function updateLocals(req, res, next) {
    console.log("hola", req.session.user);
    if (req.session.user === undefined) {
      res.locals.isUserActive = false;
      res.locals.isUserAdmin = false;
    } 
    else if (req.session.user.role === "admin") {
        res.locals.isUserAdmin = true ;
        res.locals.isUserActive = true;
    }
    else {
      res.locals.isUserActive = true;
      res.locals.isUserAdmin = false;
    }
  
    
   
}

function isAdmin(req, res, next) {
    console.log(req.session.user)
    if (req.session.user.role === "admin") {
        next()
    } else {
        res.redirect("/body/inicio")     
    }
}

module.exports = {
    isLoggedIn: isLoggedIn,
    updateLocals: updateLocals,
    isAdmin: isAdmin
}