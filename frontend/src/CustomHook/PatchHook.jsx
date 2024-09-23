//frontend/src/CustomHook/PatchHook.jsx
import axios from "axios";
export const PatchHook = async (id, formData) => {
    try {
        const response = await axios.patch(`http://localhost:8080/users/${id}`,formData,{
            headers:{'Content-Type': 'multipart/form-data',}
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user", error);
        throw error;
    }
}