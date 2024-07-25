import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Registration.css";
import uploadIcon from '../Components/Assets/upload.png';
import profImg from "../Components/Assets/professional.png";
import serviceImg from "../Components/Assets/team.png";
import materialImg from "../Components/Assets/courier.png";
import profileImg from "../Components/Assets/profile.png";

function Registration() {
    const navigate = useNavigate();

    const [profileInfo, setProfileInfo] = useState({
        email: "",
        firstName: "",
        lastName: "",
        gender: "",
        address: "",
        phoneNumber: "",
        country: "",
        birthdayDate: "",
        birthdayMonth: "",
        birthdayYear: "",
        userType: "",
        agreeTerms: false,
        profilePic: "", // New field for profile picture
        linkedin: "",   // New field for LinkedIn profile
        phone: "",      // New field for phone number
        location: "",   // New field for location
        website: "",    // New field for website
        portfolio: null // New field for portfolio (file upload)
    });

    const [showAdditionalFields, setShowAdditionalFields] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        const firstName = localStorage.getItem("userFirstName");
        const lastName = localStorage.getItem("userLastName");
        if (email) {
            setProfileInfo(prevData => ({
                ...prevData,
                email,
                firstName,
                lastName
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setProfileInfo(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!profileInfo.email || !profileInfo.firstName || !profileInfo.lastName || !profileInfo.gender || !profileInfo.address || !profileInfo.phoneNumber || !profileInfo.country || !profileInfo.birthdayDate || !profileInfo.birthdayMonth || !profileInfo.birthdayYear || !profileInfo.userType || !profileInfo.agreeTerms) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in all required fields",
                confirmButtonText: "OK"
            });
            return;
        }
    
        if (profileInfo.userType !== "client") {
            if (!profileInfo.profilePic || !profileInfo.linkedin || !profileInfo.phone || !profileInfo.location || !profileInfo.website || !profileInfo.portfolio) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please fill in all required additional fields",
                    confirmButtonText: "OK"
                });
                return;
            }
        }
    
        let endpoint;
        let redirectPath;
    
        switch (profileInfo.userType) {
            case "client":
                endpoint = "http://localhost:8000/api/registerClient";
                redirectPath = "/Pages/Home";
                break;
            case "professional":
                endpoint = "http://localhost:8000/api/registerProfessional";
                redirectPath = "/Pages/ProfProfile";
                break;
            case "service supplier":
                endpoint = "http://localhost:8000/api/registerServiceSupplier";
                redirectPath = "/Pages/ServiceSup";
                break;
            case "material supplier":
                endpoint = "http://localhost:8000/api/registerMaterialSupplier";
                redirectPath = "/Pages/MaterialSup";
                break;
            default:
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid user type selected",
                    confirmButtonText: "OK"
                });
                return;
        }
    
        const formData = new FormData();
        formData.append("email", profileInfo.email);
        formData.append("firstName", profileInfo.firstName);
        formData.append("lastName", profileInfo.lastName);
        formData.append("gender", profileInfo.gender);
        formData.append("address", profileInfo.address);
        formData.append("phoneNumber", profileInfo.phoneNumber);
        formData.append("country", profileInfo.country);
        formData.append("birthdayDate", profileInfo.birthdayDate);
        formData.append("birthdayMonth", profileInfo.birthdayMonth);
        formData.append("birthdayYear", profileInfo.birthdayYear);
        formData.append("userType", profileInfo.userType);
        formData.append("agreeTerms", profileInfo.agreeTerms);
        formData.append("profilePic", profileInfo.profilePic);
        formData.append("linkedin", profileInfo.linkedin);
        formData.append("phone", profileInfo.phone);
        formData.append("location", profileInfo.location);
        formData.append("website", profileInfo.website);
        formData.append("portfolio", profileInfo.portfolio);
    
        try {
            const response = await axios.post(endpoint, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            if (response.status === 201 && response.data.message === "User registered successfully") {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Information saved successfully",
                    confirmButtonText: "OK"
                }).then(() => {
                    navigate(redirectPath);
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
                text: error.response?.data?.message || "Error saving information",
                confirmButtonText: "OK"
            });
        }
    };
    

    const toggleAdditionalFields = () => {
        setShowAdditionalFields(!showAdditionalFields);
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
                            readOnly
                            required
                        />
                    </label>
                    <div className="reg-form-fulll1">
                        <label className="reg-form-l2">
                            First Name <br/>
                            <input
                                type="text"
                                name="firstName"
                                value={profileInfo.firstName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br/>
                        <label className="reg-form-l2">
                            Last Name <br/>
                            <input
                                type="text"
                                name="lastName"
                                value={profileInfo.lastName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    
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
                    <div className="reg-form-fulll1">
                        <label className="reg-form-l2">
                            Phone Number<br/>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={profileInfo.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className="reg-form-l2">
                            Country<br/>
                            <input
                                type="text"
                                name="country"
                                value={profileInfo.country}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <h3 className="reg-formh3">Choose Your Profile Type</h3>
                    <div className="user-type-buttons">
                            <button
                                type="button"
                                className={`reg-type-button ${profileInfo.userType === "client" ? "active" : ""}`}
                                onClick={() => {
                                    setProfileInfo(prevState => ({
                                        ...prevState,
                                        userType: "client"
                                    }));
                                    setShowAdditionalFields(false); // Reset additional fields visibility
                                }}
                            >
                                <label htmlFor="client" className="reg-form-l5">
                                    <img src={profileImg} alt="client" className="reg-image" />
                                    Client
                                </label>
                            </button>
                            <button
                                type="button"
                                className={`reg-type-button ${profileInfo.userType === "professional" ? "active" : ""}`}
                                onClick={() => {
                                    setProfileInfo(prevState => ({
                                        ...prevState,
                                        userType: "professional"
                                    }));
                                    setShowAdditionalFields(true); // Show additional fields for professional
                                }}
                            >
                                <label htmlFor="professional" className="reg-form-l5">
                                    <img src={profImg} alt="professional" className="reg-image" />
                                    Professional
                                </label>
                            </button>
                            <button
                                type="button"
                                className={`reg-type-button ${profileInfo.userType === "service supplier" ? "active" : ""}`}
                                onClick={() => {
                                    setProfileInfo(prevState => ({
                                        ...prevState,
                                        userType: "service supplier"
                                    }));
                                    setShowAdditionalFields(true); // Show additional fields for service supplier
                                }}
                            >
                                <label htmlFor="serviceSupplier" className="reg-form-l5">
                                    <img src={serviceImg} alt="service supplier" className="reg-image" />
                                    Service Supplier
                                </label>
                            </button>
                            <button
                                type="button"
                                className={`reg-type-button ${profileInfo.userType === "material supplier" ? "active" : ""}`}
                                onClick={() => {
                                    setProfileInfo(prevState => ({
                                        ...prevState,
                                        userType: "material supplier"
                                    }));
                                    setShowAdditionalFields(true); // Show additional fields for material supplier
                                }}
                            >
                               <label htmlFor="materialSupplier" className="reg-form-l5">
                                    <img src={materialImg} alt="material supplier" className="reg-image" />
                                    Material Supplier
                                </label>
                            </button>
                        </div>
                    {showAdditionalFields && profileInfo.userType !== "client" && (
                        <>
                            <label className="reg-form-l2">
                                Profile Picture<br/>
                                <input
                                    type="file"
                                    name="profilePic"
                                    onChange={handleChange}
                                    accept="image/*"
                                    required
                                />
                            </label>
                            <label className="reg-form-l2">
                                Your LinkedIn<br/>
                                <input
                                    type="text"
                                    name="linkedin"
                                    value={profileInfo.linkedin}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="reg-form-l2">
                                Your Phone Number<br/>
                                <input
                                    type="text"
                                    name="phone"
                                    value={profileInfo.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="reg-form-l2">
                                Your Location<br/>
                                <input
                                    type="text"
                                    name="location"
                                    value={profileInfo.location}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="reg-form-l2">
                                Your Website<br/>
                                <input
                                    type="text"
                                    name="website"
                                    value={profileInfo.website}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="reg-form-l2">
                                Portfolio (File Upload)<br/>
                                <input
                                    type="file"
                                    name="portfolio"
                                    onChange={handleChange}
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                                    required
                                />
                            </label>
                        </>
                    )}
                    <div className="checkbox3">
                        <label>
                            <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={profileInfo.agreeTerms}
                                onChange={handleChange}
                                required
                            />
                            I agree to the Terms and Conditions
                        </label>
                    </div>
                    <div className="reg-buttons">
                        <button type="button" >Edit</button>
                        <button type="submit" className="reg-button-b1">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;
