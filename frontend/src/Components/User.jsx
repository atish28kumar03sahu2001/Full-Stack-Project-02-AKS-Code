//frontend/src/Components/User.jsx
import React, { useState } from "react";
import { FaUser, FaBookmark} from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { MdCancel, MdEdit } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { TbSortDescendingLetters, TbSortAscendingLetters } from "react-icons/tb";
import '../styles/User.css';
import { Player } from "./Player";
import { PostHook } from "../CustomHook/PostHook";
import { GetHook } from "../CustomHook/GetHook";
import { PatchHook } from "../CustomHook/PatchHook";
export const User = () => {
    const [formVisibility, setFormVisibility] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const {data, loading, error, refetch} = GetHook();
    const [editingPlayer, setEditingPlayer] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    };

    const handleSearch = debounce((term) => {
        setSearchTerm(term);
    }, 1000);

    const handleSort = (order) => {
        setSortOrder(order);
    };

    const HandleShowForm = () => setFormVisibility(true);
    const HandleCancelForm = () => setFormVisibility(false);

    const HandleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => { setImagePreview(reader.result); };
            reader.readAsDataURL(file);
        }
    };

    const HandleEditPlayer = (player) => {
        setEditingPlayer(player);
        setFormVisibility(true);
        setImagePreview(player.playerimage ? `data:image/jpeg;base64,${player.playerimage}` : null)
    };
    
    
    const HandleSubmit = async (e) => {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
        if(editingPlayer) {
            await PatchHook(editingPlayer._id, formData);
            refetch();
        } else {
            await PostHook(formData); 
        }
        refetch();
        form.reset(); 
        setImagePreview(null);
        setFormVisibility(false);
        setEditingPlayer(null);
    }

    const HandleViewPlayer = (player) => {
        setSelectedPlayer(player);
    };

    const HandleCloseModal = () => {
        setSelectedPlayer(null);
        refetch();
    };

    const filteredPlayers = data.filter(player => 
        player.playername.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === "asc") {
        filteredPlayers.sort((a, b) => a.playername.localeCompare(b.playername));
    } else if (sortOrder === "desc") {
        filteredPlayers.sort((a, b) => b.playername.localeCompare(a.playername));
    }

    return (
        <>
            <div className="BTN_FRM_DIV_D">
                {
                    !formVisibility && (
                    <div className="BTN_DIV">
                         <button className="BTN_DIV_D" onClick={HandleShowForm}><p className="BTN_P">User Form</p><FaUser size={20} color="rgb(200, 90, 0)" /></button>
                    </div>
                )}
                {
                    formVisibility && (
                    <div>
                        <form onSubmit={HandleSubmit}>
                            <div className="IMG_FRM_DIV_SEC">
                                {
                                    imagePreview ? (<img src={imagePreview} alt="Preview" style={{ width: 50, height: 50, borderRadius: "50%" }} />) : (<IoPersonCircle size={62} color="rgb(200, 90, 0)" />)
                                }
                                <label className="FRM_IMG_LBL" htmlFor="playerimage"><GrGallery size={20} color="rgb(200, 90, 0)" /></label>
                                <input type="file" id="playerimage" name="playerimage" accept="image/*" style={{ display: "none" }} onChange={HandleImageChange} />
                            </div>
                            <div className="GEN_TYP_FRM_DIV_SEC">
                                <div className="GEN_TYP_FRM_DIV_SEC_P">
                                    <label className="FRM_LBL" htmlFor="playergender">Gender</label>
                                    <label className="FRM_LBL1"><input className="FRM_LBL1" type="radio" id="playergender_male" name="playergender" value="Male" defaultChecked={editingPlayer && editingPlayer.playergender === "Male"} />Male</label>
                                    <label className="FRM_LBL1"><input className="FRM_LBL1" type="radio" id="playergender_female" name="playergender" value="Female" defaultChecked={editingPlayer && editingPlayer.playergender === "Female"} />Female</label>
                                    
                                </div>
                                <div className="GEN_TYP_FRM_DIV_SEC_P">
                                    <label className="FRM_LBL" htmlFor="playertype">Player</label>
                                    <label className="FRM_LBL1"><input className="FRM_LBL1" type="radio" id="playertype_admin" name="playertype" value="Batsman" defaultChecked={editingPlayer && editingPlayer.playertype === "Batsman"} />Batsman</label>
                                    <label className="FRM_LBL1"><input className="FRM_LBL1" type="radio" id="playertype_user" name="playertype" value="Bowler" defaultChecked={editingPlayer && editingPlayer.playertype === "Bowler"} />Bowler</label>
                                    <label className="FRM_LBL1"><input className="FRM_LBL1" type="radio" id="playertype_both" name="playertype" value="AllRounder" defaultChecked={editingPlayer && editingPlayer.playertype === "AllRounder"} />Both</label>
                                    <label className="FRM_LBL1"><input className="FRM_LBL1" type="radio" id="playertype_wicketkeeper" name="playertype" value="Wicketkeeper" defaultChecked={editingPlayer && editingPlayer.playertype === "Wicketkeeper"} />Wicketkeeper</label>
                                </div>
                            </div>
                            <div className="USER_FRM_DIV_GR">
                                <div className="FRM_DIV_D">
                                    <label className="FRM_LBL" htmlFor="jerseynumber">Jersey Number</label>
                                    <input className="FRM_IP" required type="text" placeholder="Enter Jersey Number" id="jerseynumber" name="jerseynumber" defaultValue={editingPlayer ? editingPlayer.jerseynumber : ""} />
                                </div>
                                <div className="FRM_DIV_D">
                                    <label className="FRM_LBL" htmlFor="playerrank">Player Rank</label>
                                    <input className="FRM_IP" required type="text" placeholder="Enter Player Rank" id="playerrank" name="playerrank" defaultValue={editingPlayer ? editingPlayer.playerrank : ""} />
                                </div>
                                <div className="FRM_DIV_D">
                                    <label className="FRM_LBL" htmlFor="playerposition">Player Position</label>
                                    <input className="FRM_IP" required type="text" placeholder="Enter Player Rank" id="playerposition" name="playerposition" defaultValue={editingPlayer ? editingPlayer.playerposition : ""} />
                                </div>
                                <div className="FRM_DIV_D">
                                    <label className="FRM_LBL" htmlFor="playername">Player Name</label>
                                    <input className="FRM_IP" required type="text" placeholder="Enter Username" id="playername" name="playername" defaultValue={editingPlayer ? editingPlayer.playername : ""} />
                                </div>
                                <div className="FRM_DIV_D">
                                    <label className="FRM_LBL" htmlFor="playerbirthdate">Player Birthdate</label>
                                    <input className="FRM_IP FRM_IP_DT" required type="date" id="playerbirthdate" name="playerbirthdate"  defaultValue={editingPlayer ? editingPlayer.playerbirthdate : ""} />
                                </div>
                                <div className="FRM_DIV_D">
                                    <label className="FRM_LBL" htmlFor="playeraddress">Player Address</label>
                                    <input className="FRM_IP" required type="text" placeholder="City, Country" id="playeraddress" name="playeraddress" defaultValue={editingPlayer ? editingPlayer.playeraddress : ""} />
                                </div>
                                <div className="FRM_DIV_D">
                                    <label className="FRM_LBL" htmlFor="totalmatches">Total Matches</label>
                                    <input className="FRM_IP" required type="text" placeholder="Total Matches" id="totalmatches" name="totalmatches"  defaultValue={editingPlayer ? editingPlayer.totalmatches : ""} />
                                </div>
                                <div className="FRM_DIV_D">
                                    <label className="FRM_LBL" htmlFor="totalscore">Total Score</label>
                                    <input className="FRM_IP" required type="text" placeholder="Total Score" id="totalscore" name="totalscore" defaultValue={editingPlayer ? editingPlayer.totalscore : ""} />
                                </div>
                                <div className="FRM_DIV_D">
                                    <label className="FRM_LBL" htmlFor="totalfifties">Total Fifties</label>
                                    <input className="FRM_IP" required type="text" placeholder="Total Fifties" id="totalfifties" name="totalfifties" defaultValue={editingPlayer ? editingPlayer.totalfifties : ""} />
                                </div>
                                <div className="FRM_DIV_D">
                                    <label className="FRM_LBL" htmlFor="totalcenturies">Total Centuries</label>
                                    <input className="FRM_IP" required type="text" placeholder="Total Centuries" id="totalcenturies" name="totalcenturies" defaultValue={editingPlayer ? editingPlayer.totalcenturies : ""} />
                                </div>
                                <div className="FRM_DIV_D">
                                    <label className="FRM_LBL" htmlFor="highestscore">Highest Score</label>
                                    <input className="FRM_IP" required type="text" placeholder="Highest Score" id="highestscore" name="highestscore" defaultValue={editingPlayer ? editingPlayer.highestscore : ""} />
                                </div>
                                <div className="FRM_DIV_D">
                                    <label className="FRM_LBL" htmlFor="totalwickets">Total Wickets</label>
                                    <input className="FRM_IP" required type="text" placeholder="Total Wickets" id="totalwickets" name="totalwickets" defaultValue={editingPlayer ? editingPlayer.totalwickets : ""} />
                                </div>
                                <div className="FRM_DIV_D">
                                    <label className="FRM_LBL" htmlFor="highestwickets">Highest Wickets</label>
                                    <input className="FRM_IP" required type="text" placeholder="Highest Wickets" id="highestwickets" name="highestwickets" defaultValue={editingPlayer ? editingPlayer.highestwickets : ""} />
                                </div>
                                <div className="FRM_DIV_D">
                                    <label className="FRM_LBL" htmlFor="playeraverage">Average Run</label>
                                    <input className="FRM_IP" required type="text" placeholder="Player Average" id="playeraverage" name="playeraverage" defaultValue={editingPlayer ? editingPlayer.playeraverage : ""} />
                                </div>
                                <div className="FRM_DIV_D">
                                    <label className="FRM_LBL" htmlFor="playerstrikerate">Strike Rate</label>
                                    <input className="FRM_IP" required type="text" placeholder="Player Strike Rate" id="playerstrikerate" name="playerstrikerate" defaultValue={editingPlayer ? editingPlayer.playerstrikerate : ""} />
                                </div>
                            </div>
                            <div className="USER_FRM_DIV_TXT">
                                <label className="FRM_LBL" htmlFor="playerdetail">Player Details</label>
                                <textarea className="FRM_TXT" required placeholder="Player Details..." rows="10" cols="60" id="playerdetail" name="playerdetail" defaultValue={editingPlayer ? editingPlayer.playerdetail : ""} />
                            </div>
                            <div className="DIV_SBMT_BTND">
                                <button className="DIV_SBMT_BTND_SBMT" type="submit"><p>{editingPlayer ? "Update" : "Submit"}</p>{editingPlayer ? <MdEdit size={20} color="rgb(200, 90, 0)" /> : <FaBookmark size={18} color="rgb(200, 90, 0)" />}</button>
                                <button className="DIV_SBMT_BTND_SBMT" type="button" onClick={HandleCancelForm}><p>Cancel</p><MdCancel size={18} color="rgb(200, 90, 0)" /></button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <div className="SRC_DIV_D">
                <button className="SRT_BTN" onClick={() => handleSort("asc")}><TbSortAscendingLetters size={20} color="white" /></button>
                <button className="SRT_BTN" onClick={() => handleSort("desc")}><TbSortDescendingLetters size={20} color="white" /></button>
                <input className="SRC_IP" type="text" placeholder="Search..." onChange={(e) => handleSearch(e.target.value)} />
            </div>
            <div className="USER_LIST_DIV_D">
                {loading ? <p>Data Loading...</p> : error ? <p>Fetch Data Error: {error}</p> : (
                    filteredPlayers.map(dt => (
                        <div key={dt._id} className="USER_LIST_DIV_USER">
                            <p className="USER_LIST_DIV_P">{dt.playername}</p>
                            <button className="VIEW_BTN" onClick={() => HandleViewPlayer(dt)}>View</button>
                        </div>
                    ))
                )}
            </div>
            {selectedPlayer && <Player onEdit={HandleEditPlayer} playerData={selectedPlayer} onClose={HandleCloseModal} />}
        </>
    );
}