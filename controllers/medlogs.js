const MedLog = require('../models/MedLog') // In order for the controller to get info from the database, we have to go through the MODEL!!
const currentDate = new Date();

module.exports = {
    getMedLogs: async (req,res)=>{
        console.log(req.user)
        try{
            const medLogItems = await MedLog.find({userId:req.user.id}) // get all the medlogs where the user id is equal to the signed-in user's id. MedLog is capitalized- it's a variable that requires us to go to the MedLog file in the models folder (line 1).
            const itemsLeft = await MedLog.countDocuments({userId:req.user.id,completed: false})
            res.render('medlogs.ejs', {medLogs: medLogItems, left: itemsLeft, user: req.user}) // render the view using the above two variables and the user that's logged in
        }catch(err){
            console.log(err)
        }
    },
    createMedLog: async (req, res)=>{
        try{
            await MedLog.create({date: currentDate, weight: req.body.weightInput, systolic: req.body.systolicInput, diastolic: req.body.diastolicInput, completed: false, userId: req.user.id}) // Gives the medlog a userId property of the logged-in user's ID!
            console.log('Medical Log has been added!')
            res.redirect('/medlogs')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await MedLog.findOneAndUpdate({_id:req.body.medLogIdFromJSFile},{
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
            await MedLog.findOneAndUpdate({_id:req.body.medLogIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteMedLog: async (req, res)=>{
        console.log(req.body.medLogIdFromJSFile)
        try{
            await MedLog.findOneAndDelete({_id:req.body.medLogIdFromJSFile})
            console.log('Deleted Medical Log')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    