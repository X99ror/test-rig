const mongoose = require('mongoose')

const teamMemberSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , ' name is required']
    },
    linkedin:{
        type:String,
        required:[true , 'linkedin is required']
    },
    presentation:{
        type:String,
        required:[true , 'presentation is required']
    },
    position:{
        type:String,
        required:[true , 'position is required']
    },
    year:{
        type:String,
        required:[true , 'year is required']
    },
    team:{
        type:mongoose.Types.ObjectId,
        ref:'Team',
        required:[true , 'team is required']
        
    }
},{timestamps:true})

const TeamMember = mongoose.model('TeamMember',teamMemberSchema)

module.exports = TeamMember;