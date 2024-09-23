//backend/controller/index.js
import { Players } from "../models/index.js";

export const createPlayer = async (req, res) => {
    try {
        const { playergender, playertype, jerseynumber, playerrank, playerposition, playername, playerbirthdate, playeraddress, totalmatches, totalscore, totalfifties, totalcenturies, highestscore, totalwickets, highestwickets, playeraverage, playerstrikerate, playerdetail } = req.body;
        const playerimage = req.file.buffer;
        const newPlayer = new Players({playerimage, playergender, playertype, jerseynumber, playerrank, playerposition, playername, playerbirthdate, playeraddress, totalmatches, totalscore, totalfifties, totalcenturies, highestscore, totalwickets, highestwickets, playeraverage, playerstrikerate, playerdetail});
        const savedPlayer = await newPlayer.save();
        res.status(201).json({ message: 'User created successfully', user: savedPlayer });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
}

export const getPlayers = async (req, res) => {
    try {
       const players = await Players.find(); 
       const playerWithBase64Images = players.map(player => ({
        ...player._doc,
        playerimage: player.playerimage ? player.playerimage.toString('base64') : null
       }))
       res.status(200).json(playerWithBase64Images);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}

export const deletePlayer = async (req, res) => {
    try {
        const {id} = req.params;
        const player = await Players.findByIdAndDelete(id);
        if(player) {
            res.status(200).json({ message: "Player Deleted Successfully" });
        } else {
            res.status(404).json({ message: "Player Not Found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}

export const patchPlayer = async (req, res) => {
    try {
        const {id} = req.params;
        const { playergender, playertype, jerseynumber, playerrank, playerposition, playername, playerbirthdate, playeraddress, totalmatches, totalscore, totalfifties, totalcenturies, highestscore, totalwickets, highestwickets, playeraverage, playerstrikerate, playerdetail } = req.body;
        const playerimage = req.file ? req.file.buffer : null;
        const player = await Players.findById(id);
        if(!player) {
            return res.status(404).json({ message: "Player Not Found!" });
        }
        player.playergender = playergender || player.playergender
        player.playertype = playertype || player.playertype
        player.jerseynumber = jerseynumber || player.jerseynumber
        player.playerrank = playerrank || player.playerrank
        player.playerposition = playerposition || player.playerposition
        player.playername = playername || player.playername
        player.playerbirthdate = playerbirthdate || player.playerbirthdate
        player.playeraddress = playeraddress || player.playeraddress
        player.totalmatches = totalmatches || player.totalmatches
        player.totalscore = totalscore || player.totalscore
        player.totalfifties = totalfifties || player.totalfifties
        player.totalcenturies = totalcenturies || player.totalcenturies
        player.highestscore = highestscore || player.highestscore
        player.totalwickets = totalwickets || player.totalwickets
        player.highestwickets = highestwickets || player.highestwickets;
        player.playeraverage = playeraverage || player.playeraverage;
        player.playerstrikerate = playerstrikerate || player.playerstrikerate;
        player.playerdetail = playerdetail || player.playerdetail;
        if(playerimage) {
            player.playerimage = playerimage;
        }
        await player.save();
        res.status(200).json(player);
    } catch (error) {
        console.error("Error Updating User:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}