import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Registration.css";
import materialImg from '../Components/Assets/courier.png';
import profileImg from '../Components/Assets/profile.png';
import serviceImg from '../Components/Assets/team.png';
import profImg from '../Components/Assets/professional.png';

function Registration() {
    const navigate = useNavigate();
    
    const [profileInfo, setProfileInfo] = useState({
        email: "",
        name: "",
        gender: "",
        address: "",
        phoneNumber: "",
        country: "",
        birthdayDate: "",
        birthdayMonth: "",
        birthdayYear: "",
        userType: "",
        agreeTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfileInfo(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log form data for debugging
        console.log("Submitting profile info:", profileInfo);

        try {
            const response = await axios.post("http://localhost:8000/api/registerClient", profileInfo);

            if (response.data.message === "Registration details added and client status updated successfully") {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Information saved successfully",
                    confirmButtonText: "OK"
                }).then(() => {
                    switch (profileInfo.userType) {
                        case "client":
                            navigate("/home");
                            break;
                        case "professional":
                            navigate("/Pages/professional");
                            break;
                        case "service supplier":
                            navigate("/Pages/serviceSup");
                            break;
                        case "material supplier":
                            navigate("/Pages/materialSup");
                            break;
                        default:
                            navigate("/home");
                            break;
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.message || "Error saving information",
                    confirmButtonText: "OK"
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.message : "Error saving information",
                confirmButtonText: "OK"
            });
        }
    };

    const currentYear = (new Date()).getFullYear();
    const pastYears = 50; 
    const years = Array.from(new Array(pastYears), (val, index) => currentYear - index);

    const months = [
        { value: "", label: "Select Month" },
        { value: "January", label: "January" },
        { value: "February", label: "February" },
        { value: "March", label: "March" },
        { value: "April", label: "April" },
        { value: "May", label: "May" },
        { value: "June", label: "June" },
        { value: "July", label: "July" },
        { value: "August", label: "August" },
        { value: "September", label: "September" },
        { value: "October", label: "October" },
        { value: "November", label: "November" },
        { value: "December", label: "December" }
    ];

    const genders = [
        { value: "", label: "Select Gender" },
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Other", label: "Other" }
    ];

    const days = Array.from(new Array(31), (val, index) => index + 1);

    return (
        <div className="reg_form">
            <div className="reg-form1">
                <h1 className="reg-formh1">User Account</h1>
                <div className="line"></div>
                <form onSubmit={handleSubmit} className="reg-form-label">
                    <label className="reg-form-l1">
                        Email <br/>
                        <input
                            type="email"
                            name="email"
                            value={profileInfo.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="reg-form-l1">
                        Name <br/>
                        <input
                            type="text"
                            name="name"
                            value={profileInfo.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="reg-form-l2">
                        Birthday<br/>
                        <div className="reg-form-dropdown1">
                            <select
                                name="birthdayYear"
                                value={profileInfo.birthdayYear}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select Year</option>
                                {years.map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </select>
                            <select
                                name="birthdayMonth"
                                value={profileInfo.birthdayMonth}
                                onChange={handleChange}
                                required
                            >
                                {months.map((month, index) => (
                                    <option key={index} value={month.value}>{month.label}</option>
                                ))}
                            </select>
                            <select
                                name="birthdayDate"
                                value={profileInfo.birthdayDate}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select Date</option>
                                {days.map((day, index) => (
                                    <option key={index} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>
                    </label>
                    <div className="reg-form-l3">
                        <label>
                            Country<br/>
                            <input
                                type="text"
                                name="country"
                                value={profileInfo.country}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className="reg-form-l4">
                            Phone Number<br/>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={profileInfo.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div className="reg-form-l3">
                        <label>
                            Address<br/>
                            <input
                                type="text"
                                name="address"
                                value={profileInfo.address}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className="reg-form-l4">
                            Gender<br/>
                            <select
                                name="gender"
                                value={profileInfo.gender}
                                onChange={handleChange}
                                required
                            >
                                {genders.map((gender, index) => (
                                    <option key={index} value={gender.value}>{gender.label}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <h3 className="reg-formh3">Choose Your Profile Type</h3>
                    <div className="user-type-buttons">
                        <input
                            type="radio"
                            id="client"
                            name="userType"
                            value="client"
                            checked={profileInfo.userType === "client"}
                            onChange={handleChange}
                        />
                        <label htmlFor="client" className="reg-form-l5">
                            <img src={profileImg} alt="client" className="reg-image" />
                            Client
                        </label>

                        <input
                            type="radio"
                            id="professional"
                            name="userType"
                            value="professional"
                            checked={profileInfo.userType === "professional"}
                            onChange={handleChange}
                        />
                        <label htmlFor="professional" className="reg-form-l5">
                            <img src={profImg} alt="professional" className="reg-image" />
                            Professional
                        </label>

                        <input
                            type="radio"
                            id="serviceSupplier"
                            name="userType"
                            value="service supplier"
                            checked={profileInfo.userType === "service supplier"}
                            onChange={handleChange}
                        />
                        <label htmlFor="serviceSupplier" className="reg-form-l5">
                            <img src={serviceImg} alt="service supplier" className="reg-image" />
                            Service Supplier
                        </label>

                        <input
                            type="radio"
                            id="materialSupplier"
                            name="userType"
                            value="material supplier"
                            checked={profileInfo.userType === "material supplier"}
                            onChange={handleChange}
                        />
                        <label htmlFor="materialSupplier" className="reg-form-l5">
                            <img src={materialImg} alt="material supplier" className="reg-image" />
                            Material Supplier
                        </label>
                    </div>
                    <label className="reg-form-l6">
                        <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={profileInfo.agreeTerms}
                            onChange={handleChange}
                            required
                        />
                        I agree to the Terms and Conditions
                    </label>
                    <div className="reg-buttons">
                        <button type="button" onClick={() => navigate("/Pages/Professional")}>Edit</button>
                        <button type="submit" className="reg-button-b1">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;
