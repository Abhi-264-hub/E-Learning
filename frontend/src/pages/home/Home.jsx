import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"
import Testimonials from "../../components/testimonials/testimonials";
const Home=()=>{
    const navigate = useNavigate(); 
    return (
        <div className="home">
            <div className="home-content">
                <h1>Welcome to our E-Learning Platform</h1>
                <p>Learn,Excel,Grow</p>
                <button className="common-btn"  onClick={()=>navigate("/courses")}>Get Started</button>

            </div>
            <Testimonials/>

        </div>
    )
}
export default Home;