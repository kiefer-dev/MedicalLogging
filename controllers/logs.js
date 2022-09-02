const Log = require('../models/Log') // In order for the controller to get info from the database, we have to go through the MODEL!!

module.exports = {
    getLogs: async (req,res)=>{
        console.log(req.user)
        try{
            const logItems = await Log.find({userId:req.user.id}) // get all the logs where the user id is equal to the signed-in user's id. Log is capitalized- it's a variable that requires us to go to the Log file in the models folder (line 1).
            const itemsLeft = await Log.countDocuments({userId:req.user.id,completed: false})
            res.render('logs.ejs', {logs: logItems, left: itemsLeft, user: req.user}) // render the view using the above two variables and the user that's logged in
        }catch(err){
            console.log(err)
        }
    },
    createLog: async (req, res)=>{
        try{
            await Log.create({log: req.body.logItem, completed: false, userId: req.user.id}) // Gives the log a userId property of the logged-in user's ID!
            console.log('Log has been added!')
            res.redirect('/logs')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Log.findOneAndUpdate({_id:req.body.logIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Log.findOneAndUpdate({_id:req.body.logIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteLog: async (req, res)=>{
        console.log(req.body.logIdFromJSFile)
        try{
            await Log.findOneAndDelete({_id:req.body.logIdFromJSFile})
            console.log('Deleted Log')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    