// PlayerModal.jsx
import React from "react";
import ReactDOM from "react-dom";
import { MdCancel, MdDelete, MdEdit } from "react-icons/md";
import "../styles/Player.css";
import { DeleteHook } from "../CustomHook/DeleteHook";
import { GetHook } from "../CustomHook/GetHook";

export const Player = ({ playerData, onClose, onEdit }) => {
  const {refetch} = GetHook();
  const HandleDelete = async (id) => {
    await DeleteHook(id); refetch();
    onClose();
  }
  return ReactDOM.createPortal(
    <>
      <div className="player-modal-container">
        <button className="close-btn" onClick={onClose}><MdCancel size={24} color="red" /></button>
        <div className="player-modal-image">
          <img className="PLAYER_IMAGE" src={playerData.playerimage ? `data:image/jpeg;base64,${playerData.playerimage}` : 'fallback_image_url'} alt={playerData.playername} />
        </div>
        <div className="PLAYER_NAME">
          <h3>{playerData.playername}</h3>
        </div>
        <div className="player-modal-content">
          <div>
            <p>Player Gender: {playerData.playergender}</p>
            <p>Player Type: {playerData.playertype}</p>
            <p>Player jerseynumber: {playerData.jerseynumber}</p>
            <p>Player Rank: {playerData.playerrank}</p>
          </div>
          <div>
            <p>Player Position: {playerData.playerposition}</p>
            <p>Player Birthdate: {playerData.playerbirthdate}</p>
            <p>Player Address: {playerData.playeraddress}</p>
            <p>Player Total Matches: {playerData.totalmatches}</p>
          </div>
          <div>
            <p>Player Total Score: {playerData.totalscore}</p>
            <p>Player Total Fifties: {playerData.totalfifties}</p>
            <p>Player Total Centuries: {playerData.totalcenturies}</p>
            <p>Player Highest Score: {playerData.highestscore}</p>
          </div>
          <div>
            <p>Player Total Wickets: {playerData.totalwickets}</p>
            <p>Player Highest Wickets: {playerData.highestwickets}</p>
            <p>Player Average: {playerData.playeraverage}</p>
            <p>Player Strike Rate: {playerData.playerstrikerate}</p>
          </div>
        </div>
        <div className="PLAYER_DETAILS">
          <p className="PLAYER_DETAILS_P">{playerData.playerdetail}</p>
        </div>
        <div className="PLAYER_DETAILS_BTN">
          <button className="PLAYER_BTN" onClick={()=>HandleDelete(playerData._id)}><MdDelete size={20} color="white" /></button>
          <button className="PLAYER_BTN" onClick={() => { onEdit(playerData); onClose(); }}><MdEdit size={20} color="white" /></button>
        </div>
      </div>
    </>,document.getElementById("root1")
  );
};
