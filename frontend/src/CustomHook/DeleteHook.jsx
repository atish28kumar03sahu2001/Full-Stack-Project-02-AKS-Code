//frontend/src/CustomHook/DeleteHook.jsx
import axios from "axios";
export const DeleteHook = async (id) => {
    try {
        await axios.delete(`https://full-stack-project-02-aks.vercel.app/users/${id}`)
    } catch (error) {
        console.error("Error deleting product", error);
    }
}