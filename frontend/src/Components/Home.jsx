// frontend/src/Components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import '../styles/Home.css';
export const Home = () => {
    return (
        <>
            <div className="PD_DIV_P">
                <p className="PD_DIV_PP">I am Atish Kumar Sahu, a Full Stack Web Developer with expertise in building dynamic, scalable applications using modern technologies. This project demonstrates full CRUD functionality (Create, Read, Update, Delete) to manage data efficiently across a web application. The front-end is built with React.js, utilizing JSX for optimized UI, React Router for smooth navigation, React Icons for enhanced visuals, and Axios for seamless API communication. On the backend, Node.js and Express.js power the API, while MongoDB and Mongoose provide a flexible and efficient database layer. Key tools like Multer handle file uploads, CORS manages cross-origin requests, and dotenv secures environment configuration. Development is streamlined using Nodemon, and the entire application is deployed on Vercel with version control managed via GitHub. This project showcases a robust full-stack solution, integrating front-end and back-end technologies for a seamless web experience.</p>
            </div>
            <div className="LNK_DIV_LINK">
                <Link to="/user" className="LNK_DIV_LINK_CLK">
                    <p>Click Here</p>
                    <FaArrowUp size={18} color="white" />
                </Link>
            </div>
        </>
    );
}