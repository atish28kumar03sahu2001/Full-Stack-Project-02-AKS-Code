//frontend/src/CustomHook/PatchHook.jsx
import axios from "axios";
export const PatchHook = async (id, formData) => {
    try {
        const response = await axios.patch(`https://full-stack-project-02-aks.vercel.app/users/${id}`,formData,{
            headers:{'Content-Type': 'multipart/form-data',}
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user", error);
        throw error;
    }
}