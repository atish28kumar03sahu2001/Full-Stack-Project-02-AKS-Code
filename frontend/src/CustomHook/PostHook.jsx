//frontend/src/CustomHook/PostHook.jsx
import axios from 'axios';
export const PostHook = async (data) => {
    console.log(`Player Data : ${data}`);
    try {
        const response = await axios.post('https://full-stack-project-02-aks.vercel.app/users',data,{
            headers: {'Content-Type': 'multipart/form-data',}
        })
        return response.data;
    } catch (error) {
        console.error('Error while submitting the form:', error);
    }
}