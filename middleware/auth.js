module.exports = {
  //middleware that sits between the request and the response and checks if the user is logged in. You can use this in any router that you want to check if the user is logged in!
  // When the person made the request, 
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) { // Is the user attached to the request logged in?
        return next() //next() is what you have to run in each piece of middleware to have it continue to the next piece of middleware and not hang once it is complete
      } else {
        res.redirect('/') //if not logged in, redirect you back to main page that you can log in
      }
    }
  }
  