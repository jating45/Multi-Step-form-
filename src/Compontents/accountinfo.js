import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CButton,
  CProgress,
} from "@coreui/react";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

const FormWizard = () => {
  const navigate = useNavigate();

  // Function to get data from localStorage
  const getStoredData = () => {
    const storedData = localStorage.getItem("accountInfo");
    return storedData
      ? JSON.parse(storedData)
      : { username: "", password: "", confirmPassword: "", email: "" };
  };

  const [formData, setFormData] = useState(getStoredData);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Save form data to localStorage on change
  useEffect(() => {
    localStorage.setItem("accountInfo", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      navigate("/personlinfo"); 
    }
  };

  return (
    <CContainer className="mt-5">
      <h2 className="text-center">Form Wizard</h2>
      <CProgress className="mb-4" style={{ height: "30px" }} value={25} />

      <CCard>
        <CCardHeader>Account Information</CCardHeader>
        <CCardBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CInputGroupText><FaUser /></CInputGroupText>
              <CFormInput
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="off"
              />
            </CInputGroup>
            {errors.username && <div className="text-danger mb-2">{errors.username}</div>}

            <CInputGroup className="mb-3">
              <CInputGroupText><FaLock /></CInputGroupText>
              <CFormInput
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
              />
              <CButton variant="outline" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </CButton>
            </CInputGroup>
            {errors.password && <div className="text-danger mb-2">{errors.password}</div>}

            <CInputGroup className="mb-3">
              <CInputGroupText><FaLock /></CInputGroupText>
              <CFormInput
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="off"
              />
              <CButton variant="outline" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </CButton>
            </CInputGroup>
            {errors.confirmPassword && <div className="text-danger mb-2">{errors.confirmPassword}</div>}

            <CInputGroup className="mb-3">
              <CInputGroupText><FaEnvelope /></CInputGroupText>
              <CFormInput
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
              />
            </CInputGroup>
            {errors.email && <div className="text-danger mb-2">{errors.email}</div>}

            <div className="d-flex justify-content-end mt-3">
              <CButton color="primary" onClick={handleNext}>
                Next
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default FormWizard;
