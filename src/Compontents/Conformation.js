import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CListGroup,
  CListGroupItem,
  CProgress,
  CSpinner,
} from "@coreui/react";
import "./confirmationpage.css";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      let personalInfo = JSON.parse(localStorage.getItem("personalInfo")) || {};
      let accountInfo = JSON.parse(localStorage.getItem("accountInfo")) || {};
      let cardInfo = JSON.parse(localStorage.getItem("cardInfo")) || {};

      console.log("Fetched personalInfo:", personalInfo);
      console.log("Fetched accountInfo:", accountInfo);
      console.log("Fetched cardInfo:", cardInfo);

      const mergedData = { ...personalInfo, ...accountInfo, ...cardInfo };

      if (Object.keys(mergedData).length === 0) {
        console.warn("No form data found, redirecting...");
        navigate("/");
      } else {
        setFormData(mergedData);
      }

      setLoading(false);
    };

    fetchData();
  }, [navigate]);

  const maskCardNumber = (cardNumber) => {
    return cardNumber ? `**** **** **** ${cardNumber.slice(-4)}` : "**** **** **** ****";
  };

  if (loading) {
    return (
      <CContainer className="text-center mt-5">
        <CSpinner color="primary" size="lg" />
        <p>Loading data...</p>
      </CContainer>
    );
  }

  if (!formData) {
    return (
      <CContainer className="text-center mt-5">
        <h4 className="text-danger">No Data Found!</h4>
        <CButton color="primary" onClick={() => navigate("/")}>Go to Home</CButton>
      </CContainer>
    );
  }

  return (
    <CContainer className="confirm-container">
      <h2 className="text-center text-primary">Confirmation & Review</h2>

      <div className="progress-container position-relative">
        <CProgress className="mb-4" color="success" value={100} height={15} />
        <div className="progress-icon">
          <FaCheckCircle size={40} className="text-success" />
        </div>
      </div>

      <CCard className="confirm-card">
        <CCardHeader className="text-center bg-success text-white">
          <h4>Review Your Details</h4>
        </CCardHeader>
        <CCardBody>
          <CListGroup flush>
            <CListGroupItem><strong>Salutation:</strong> {formData.salutation || "N/A"}</CListGroupItem>
            <CListGroupItem><strong>Gender:</strong> {formData.gender || "N/A"}</CListGroupItem>
            <CListGroupItem><strong>First Name:</strong> {formData.firstName || "N/A"}</CListGroupItem>
            <CListGroupItem><strong>Last Name:</strong> {formData.lastName || "N/A"}</CListGroupItem>
            <CListGroupItem><strong>Email:</strong> {formData.email || "N/A"}</CListGroupItem>
            <CListGroupItem><strong>Phone:</strong> {formData.phone || "N/A"}</CListGroupItem>
            <CListGroupItem>
              <strong>Address:</strong> {formData.homeAddress || "N/A"}, {formData.state || "N/A"}, {formData.country || "N/A"}
            </CListGroupItem>
            <CListGroupItem><strong>Zip Code:</strong> {formData.zipCode || "N/A"}</CListGroupItem>
            <CListGroupItem><strong>Account Type:</strong> {formData.accountType || "N/A"}</CListGroupItem>
            <CListGroupItem><strong>Username:</strong> {formData.username || "N/A"}</CListGroupItem>
            <CListGroupItem><strong>Card Type:</strong> {formData.cardType || "N/A"}</CListGroupItem>
            <CListGroupItem><strong>Card Number:</strong> {maskCardNumber(formData.cardNumber)}</CListGroupItem>
            <CListGroupItem><strong>Expiry:</strong> {formData.expiryMonth || "MM"}/{formData.expiryYear || "YYYY"}</CListGroupItem>
          </CListGroup>

          <div className="d-flex justify-content-between mt-4">
            <CButton color="secondary" onClick={() => navigate("/cardinfo")}>
              <FaArrowLeft /> Previous Step
            </CButton>
            <CButton color="success" onClick={() => alert("Form submitted successfully!")}>
              Submit Form
            </CButton>
          </div>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default ConfirmationPage;

