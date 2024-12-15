import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Registration.css";
import closeIcon from "../Components/Assets/close.png"; // Import close icon

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
        agreeTerms: false
    });

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

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (token !== '1234') {
            Swal.fire({
                icon: 'warning',
                title: 'Access denied',
                footer: "You have to log in first",
                confirmButtonText: 'OK'
            });
            navigate('/Pages/home');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfileInfo(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
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

        let endpoint;
        let redirectPath;

        switch (profileInfo.userType) {
            case "client":
                endpoint = "http://localhost:8000/api/registerClient";
                redirectPath = "/Pages/Home";
                break;
            case "professional":
                endpoint = "http://localhost:8000/api/registerProfessional";
                redirectPath = "/Pages/professional";
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

        try {
            const response = await axios.post(endpoint, profileInfo);

            if (response.status === 201 && response.data.message === "User registered successfully") {
                Swal.fire({
                    title: "Do you want to save the changes?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Save",
                    denyButtonText: `Don't save`
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Information saved successfully",
                            confirmButtonText: "OK",
                            footer: "Let's fill some of our details further..."
                        }).then(() => {
                            const { firstName, lastName, email } = profileInfo;
                            navigate(redirectPath, { state: { firstName, lastName, email } });
                        });
                    } else if (result.isDenied) {
                        Swal.fire("Changes are not saved", "", "info");
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
            const errorMessage = error.response?.data?.message || "Error saving information";
            if (errorMessage === "User with this email already exists") {
                Swal.fire({
                    icon: "warning",
                    title: "User Exists",
                    text: "A user with this email already exists. Please log in or use a different email.",
                    confirmButtonText: "OK",
                    footer: "Let's fill some of our details further..."
                }).then(() => {
                    const { firstName, lastName, email } = profileInfo;
                    navigate(redirectPath, { state: { firstName, lastName, email } });
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorMessage,
                    confirmButtonText: "OK"
                });
            }
        }
    };


    const handleClose = () => {
        navigate("/Pages/Home"); // Navigate to the home page
    };

    const currentYear = (new Date()).getFullYear();
    const pastYears = 50;
    const years = Array.from(new Array(pastYears), (_, index) => currentYear - index);

    const months = [
        { value: "", label: "Select Month" },
        { value: "January", label: "January" },
    { value: "April", label: "April" },
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
        <>
            <div className="reg_form">
                <img src={closeIcon} alt="Close" className="close-icon" style={{ filter: 'invert(100%)' }} onClick={handleClose} />
                    <div className="reg-form1">
                        <h1 className="reg-formh1">User Account</h1>
                        <div className="line"></div>
                        <form onSubmit={handleSubmit} className="reg-form-label">
                            <label className="reg-form-l1">
                                Email <br />
                                <input
                                    type="email"
                                    name="email"
                                    value={profileInfo.email}
                                    onChange={handleChange}
                                    readOnly
                                    required
                                />
                            </label>
                            <div className="reg-form-l3">
                                <label>
                                    First Name <br />
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={profileInfo.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label className="reg-form-l4">
                                    Last Name <br />
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
                                Birthday<br />
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
                                    Country<br />
                                    <input
                                        type="text"
                                        name="country"
                                        value={profileInfo.country}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label className="reg-form-l4">
                                    Phone Number <br />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={profileInfo.phoneNumber}
                                        onChange={handleChange}
                                        pattern="[0-9]{10}"
                                        required
                                    />
                                </label>
                            </div>
                            <label>
                                Gender<br />
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
                            <label>
                                Address<br />
                                <input
                                    type="text"
                                    name="address"
                                    value={profileInfo.address}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Account Type<br />
                                <select
                                    name="userType"
                                    value={profileInfo.userType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select an account type</option>
                                    <option value="client">Client</option>
                                    <option value="professional">Professional</option>
                                    <option value="service supplier">Service Supplier</option>
                                    <option value="material supplier">Material Supplier</option>
                                </select>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={profileInfo.agreeTerms}
                                    onChange={handleChange}
                                    required
                                />
                                I agree to the terms and conditions
                            </label>
                            <div className="reg-btn-container">
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
            </div>
            </>
        );
    }


export default Registration;
