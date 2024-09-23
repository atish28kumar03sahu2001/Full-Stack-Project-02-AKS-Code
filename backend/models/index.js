// backend/models/index.js
import mongoose from 'mongoose';
const PlayerSchema = new mongoose.Schema({
    playerimage: {type: Buffer, required: true},
    playergender: {type: String, required: true},
    playertype: {type: String, required: true},
    jerseynumber: {type: String, required: true},
    playerrank : {type: String, required: true},
    playerposition : {type: String, required: true},
    playername : {type: String, required: true},
    playerbirthdate : {type: String, required: true},
    playeraddress : {type: String, required: true},
    totalmatches : {type: String, required: true},
    totalscore : {type: String, required: true},
    totalfifties : {type: String, required: true},
    totalcenturies : {type: String, required: true},
    highestscore : {type: String, required: true},
    totalwickets : {type: String, required: true},
    highestwickets : {type: String, required: true},
    playeraverage : {type: String, required: true},
    playerstrikerate : {type: String, required: true},
    playerdetail : {type: String, required: true},

})
export const Players = mongoose.model("Players",PlayerSchema);