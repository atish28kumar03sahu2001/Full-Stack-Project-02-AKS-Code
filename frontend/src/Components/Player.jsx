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
            <p><strong>Player Gender:</strong> {playerData.playergender}</p>
            <p><strong>Player Type:</strong> {playerData.playertype}</p>
            <p><strong>Player jerseynumber:</strong> {playerData.jerseynumber}</p>
            <p><strong>Player Rank:</strong> {playerData.playerrank}</p>
          </div>
          <div>
            <p><strong>Player Position:</strong> {playerData.playerposition}</p>
            <p><strong>Player Birthdate:</strong> {playerData.playerbirthdate}</p>
            <p><strong>Player Address:</strong> {playerData.playeraddress}</p>
            <p><strong>Player Total Matches:</strong> {playerData.totalmatches}</p>
          </div>
          <div>
            <p><strong>Player Total Score:</strong> {playerData.totalscore}</p>
            <p><strong>Player Total Fifties:</strong> {playerData.totalfifties}</p>
            <p><strong>Player Total Centuries:</strong> {playerData.totalcenturies}</p>
            <p><strong>Player Highest Score:</strong> {playerData.highestscore}</p>
          </div>
          <div>
            <p><strong>Player Total Wickets:</strong> {playerData.totalwickets}</p>
            <p><strong>Player Highest Wickets:</strong> {playerData.highestwickets}</p>
            <p><strong>Player Average:</strong> {playerData.playeraverage}</p>
            <p><strong>Player Strike Rate:</strong> {playerData.playerstrikerate}</p>
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
