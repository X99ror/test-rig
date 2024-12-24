const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    year:{
        type:String,
        required:[true , 'year is required']
    },
    members:[
        {
            type:mongoose.Types.ObjectId,
            ref:'TeamMember',
            
        }
    ]
},{timestamps:true})

const Team = mongoose.model('Team',teamSchema)

module.exports = Team;