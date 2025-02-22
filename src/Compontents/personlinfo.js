import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaPhone, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CButton,
  CProgress,
} from "@coreui/react";

const PersonalInformation = () => {
  const navigate = useNavigate();

  const getStoredData = () => {
    const storedData = localStorage.getItem("personalInfo");
    return storedData
      ? JSON.parse(storedData)
      : {
          salutation: "",
          gender: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          zipCode: "",
          state: "",
          homeAddress: "",
          country: "",
        };
  };

  const [formData, setFormData] = useState(getStoredData());
  const [errors, setErrors] = useState({ email: "", phone: "", zipCode: "" });

  useEffect(() => {
    localStorage.setItem("personalInfo", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value === null || value === undefined) return;

    if (name === "zipCode" && value.length > 6) return;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" || name === "zipCode" ? value.replace(/\D/g, "") : value.trim(),
    }));

    if (name === "email") validateEmail(value);
    if (name === "phone") validatePhone(value);
    if (name === "zipCode") validateZipCode(value);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors((prev) => ({
      ...prev,
      email: emailPattern.test(email) ? "" : "Invalid email format.",
    }));
  };

  const validatePhone = (phone) => {
    const phonePattern = /^[0-9]{10}$/;
    setErrors((prev) => ({
      ...prev,
      phone: phonePattern.test(phone) ? "" : "Phone number must be 10 digits.",
    }));
  };

  const validateZipCode = (zipCode) => {
    const zipPattern = /^[0-9]{6}$/; 
    setErrors((prev) => ({
      ...prev,
      zipCode: zipPattern.test(zipCode) ? "" : "Zip code must be exactly 6 digits.",
    }));
  };

  const isFormValid = () => {
    return (
      Object.values(formData).every((value) => value.trim() !== "") &&
      errors.email === "" &&
      errors.phone === "" &&
      errors.zipCode === ""
    );
  };

  return (
    <CContainer className="mt-5">
      <h2 className="text-center">Form Wizard</h2>

      <CProgress className="mb-4" color="primary" style={{ height: "30px" }} value={50} />
      
      <CCard>
        <CCardHeader className="text-primary text-center">
          <h3>Personal Information</h3>
        </CCardHeader>
        <CCardBody>
          <CForm>
            <div className="row">
              <div className="col-md-6">
                <label>Salutation</label>
                <CFormSelect name="salutation" onChange={handleChange} value={formData.salutation}>
                  <option value="">Select</option>
                  <option>Mr.</option>
                  <option>Miss.</option>
                  <option>Mrs.</option>
                </CFormSelect>
              </div>
              <div className="col-md-6">
                <label>Gender</label>
                <CFormSelect name="gender" onChange={handleChange} value={formData.gender}>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </CFormSelect>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label>First Name</label>
                <CFormInput type="text" name="firstName" onChange={handleChange} value={formData.firstName} placeholder="First Name" />
              </div>
              <div className="col-md-6">
                <label>Last Name</label>
                <CFormInput type="text" name="lastName" onChange={handleChange} value={formData.lastName} placeholder="Last Name" />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label>Email</label>
                <CInputGroup>
                  <CInputGroupText><FaEnvelope /></CInputGroupText>
                  <CFormInput type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Enter your email" />
                </CInputGroup>
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>
              <div className="col-md-6">
                <label>Phone</label>
                <CInputGroup>
                  <CInputGroupText><FaPhone /></CInputGroupText>
                  <CFormInput type="text" name="phone" onChange={handleChange} value={formData.phone} placeholder="Enter your phone number" maxLength="10" />
                </CInputGroup>
                {errors.phone && <p className="text-danger">{errors.phone}</p>}
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label>Zip Code</label>
                <CFormInput
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Zip Code"
                  maxLength="6"
                />
                {errors.zipCode && <p className="text-danger">{errors.zipCode}</p>}
              </div>
              <div className="col-md-6">
                <label>State</label>
                <CFormSelect name="state" onChange={handleChange} value={formData.state}>
                  <option value="">Select one</option>
                  <option>Haryana</option>
                  <option>UP</option>
                  <option>MP</option>
                  <option>Raj</option>
                  <option>AP</option>
                </CFormSelect>
              </div>
            </div>

            <div className="mt-3">
              <label>Home Address</label>
              <CFormInput type="text" name="homeAddress" onChange={handleChange} value={formData.homeAddress} placeholder="Enter your home address" />
            </div>

            <div className="mt-3">
              <label>Country</label>
              <CFormSelect name="country" onChange={handleChange} value={formData.country}>
                <option value="">Select one</option>
                <option>India</option>
                <option>UK</option>
                <option>USA</option>
                <option>Australia</option>
                <option>Japan</option>
              </CFormSelect>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <CButton color="secondary" onClick={() => navigate("/")}>
                <FaArrowLeft /> Account Information
              </CButton>
              <CButton color="primary" onClick={() => navigate("/cardinfo")} disabled={!isFormValid()}>
                Next Step <FaArrowRight />
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default PersonalInformation;
