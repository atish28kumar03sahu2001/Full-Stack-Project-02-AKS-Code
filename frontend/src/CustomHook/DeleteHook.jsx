//frontend/src/CustomHook/DeleteHook.jsx
import axios from "axios";
export const DeleteHook = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/users/${id}`)
    } catch (error) {
        console.error("Error deleting product", error);
    }
}