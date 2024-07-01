import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import './Signup.css';
import si1 from "../Components/Assets/sign-img.jpg";
import closeIcon from "../Components/Assets/close.png"; // Import close icon

function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/user/signup", {
                email,
                password,
                firstName,
                lastName
            });

            const responseData = response.data;

            if (responseData === "notexist") {
                showSuccessMessage();
            } else if (responseData === "exist") {
                showExistMessage("User already exists with this email.");
            } else {
                showErrorMessage("An error occurred while processing your request");
            }

        } catch (error) {
            showErrorMessage("An error occurred while processing your request");
            console.error("Error:", error);
        }
    }

    function showSuccessMessage() {
        Swal.fire({
            icon: 'success',
            title: 'Signup Successful!',
            text: 'You have successfully signed up.',
            confirmButtonText: 'Login from here'
        }).then(() => {
            navigate("/Pages/Login"); 
        });
    }

    function showErrorMessage(message) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            confirmButtonText: 'OK'
        });
    }

    function showExistMessage(message) {
        Swal.fire({
            icon: 'error',
            title: 'Exist User',
            text: "You already signed up.",
            confirmButtonText: 'Login from here'
        }).then(() => {
            navigate("/Pages/Login"); 
        });
    }

    function handleClose() {
        navigate("/Pages/Home"); // Navigate to the home page
    }

    return (
        <div className="signup01"><img src={closeIcon} alt="Close" className="close-icon" onClick={handleClose} />
            <div className="signup">
                <div className="signup-locate">
                    
                    <h1 className="head1">Create New Account</h1>
                    <p className="par1">Please fill in your basic info</p>

                    <form onSubmit={submit}>
                        <div className="signup-firstline">
                            <input
                                className="signup-Fname"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                                required
                            />
                            <input
                                className="signup-Lname"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                                required
                            />
                        </div>
                        
                        <div className="row">
                            <input
                                className="signup-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="row">
                            <input
                                className="signup-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="btn-container">
                            <button className="btn" type="submit">CREATE ACCOUNT</button>
                        </div>
                    </form>
                    <p className="signup-para2">Already a member ?
                        <Link to="/Pages/Login" className="signup-log">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
