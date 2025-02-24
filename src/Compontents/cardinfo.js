import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaCreditCard } from "react-icons/fa";
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CAlert,
  CRow,
  CCol,
  CProgress
} from "@coreui/react";
import "./paymentstep.css";

const PaymentStep = () => {
  const navigate = useNavigate();

 
  const getStoredData = () => {
    const storedData = localStorage.getItem("paymentInfo");
    return storedData
      ? JSON.parse(storedData)
      : {
          cardType: "",
          cardNumber: "",
          cvc: "",
          cardHolder: "",
          expiryMonth: "",
          expiryYear: ""
        };
  };

  const [formData, setFormData] = useState(getStoredData());
  const [errors, setErrors] = useState({});


  useEffect(() => {
    localStorage.setItem("cardInfo", JSON.stringify(formData));
  }, [formData]);


  const handleChange = (e) => {
    let { name, value } = e.target;

    
    if (["cardNumber", "cvc"].includes(name)) {
      value = value.replace(/\D/g, "");
    }


    if (name === "cardNumber" && value.length > 16) {
      value = value.slice(0, 16);
    }
    if (name === "cvc" && value.length > 3) {
      value = value.slice(0, 3);
    }

    setFormData({ ...formData, [name]: value });
  };


  const validateForm = () => {
    let newErrors = {};

    if (!formData.cardType) newErrors.cardType = "Card type is required";
    if (!/^\d{16}$/.test(formData.cardNumber))
      newErrors.cardNumber = "Card number must be 16 digits";
    if (!/^\d{3}$/.test(formData.cvc)) newErrors.cvc = "CVC must be 3 digits";
    if (!formData.cardHolder.trim()) newErrors.cardHolder = "Cardholder name is required";
    if (!formData.expiryMonth) newErrors.expiryMonth = "Expiry month is required";
    if (!formData.expiryYear) newErrors.expiryYear = "Expiry year is required";

    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      navigate("/viewpage", { state: { formData } });
    } else {
      setErrors(newErrors);
    }
  };

  const handlePrev = () => {
    navigate("/personlinfo", { state: { formData } });
  };

  return (
    <CContainer className="payment-container">
      <h2 className="text-center">Secure Payment</h2>

      <div className="progress-container">
        <CProgress className="mb-4" color="info" value={75} />
        <div className="progress-icon">
          <FaCreditCard />
        </div>
      </div>

      <CCard className="payment-card">
        <CCardHeader className="text-center text-white bg-primary">
          <h4>Payment Information</h4>
        </CCardHeader>
        <CCardBody>
          <CForm>
 
            {Object.keys(errors).length > 0 && (
              <CAlert color="danger">
                {Object.values(errors).map((err, idx) => (
                  <div key={idx}>{err}</div>
                ))}
              </CAlert>
            )}

            <div className="mb-3">
              <label className="form-label">Card Type</label>
              <CFormSelect name="cardType" onChange={handleChange} value={formData.cardType}>
                <option value="">Select Credit Card Type</option>
                <option>Visa</option>
                <option>MasterCard</option>
                <option>American Express</option>
              </CFormSelect>
              {errors.cardType && <div className="text-danger">{errors.cardType}</div>}
            </div>

            <CRow className="g-3">
              <CCol md={8}>
                <label className="form-label">Card Number</label>
                <CFormInput
                  type="text" 
                  name="cardNumber"
                  placeholder="1234-5678-9012-3456"
                  onChange={handleChange}
                  value={formData.cardNumber}
                  autoComplete="off"
                />
                {errors.cardNumber && <div className="text-danger">{errors.cardNumber}</div>}
              </CCol>
              <CCol md={4}>
                <label className="form-label">CVC</label>
                <CFormInput
                  type="text" 
                  name="cvc"
                  placeholder="***"
                  onChange={handleChange}
                  value={formData.cvc}
                  autoComplete="off"
                />
                {errors.cvc && <div className="text-danger">{errors.cvc}</div>}
              </CCol>
            </CRow>

            <div className="mt-3">
              <label className="form-label">Card Holder Name</label>
              <CFormInput
                type="text"
                name="cardHolder"
                placeholder="Enter Your Name"
                onChange={handleChange}
                value={formData.cardHolder}
                autoComplete="off"
              />
              {errors.cardHolder && <div className="text-danger">{errors.cardHolder}</div>}
            </div>

            <CRow className="g-3 mt-3">
              <CCol md={6}>
                <label className="form-label">Expiry Month</label>
                <CFormSelect name="expiryMonth" onChange={handleChange} value={formData.expiryMonth}>
                  <option value="">Expiry Month</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </CFormSelect>
                {errors.expiryMonth && <div className="text-danger">{errors.expiryMonth}</div>}
              </CCol>
              <CCol md={6}>
                <label className="form-label">Expiry Year</label>
                <CFormSelect name="expiryYear" onChange={handleChange} value={formData.expiryYear}>
                  <option value="">Expiry Year</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={new Date().getFullYear() + i}>{new Date().getFullYear() + i}</option>
                  ))}
                </CFormSelect>
                {errors.expiryYear && <div className="text-danger">{errors.expiryYear}</div>}
              </CCol>
            </CRow>

          
            <div className="d-flex justify-content-between mt-4">
              <CButton color="secondary" onClick={handlePrev}>
                <FaArrowLeft /> Previous
              </CButton>
              <CButton color="success" onClick={handleNext}>
                Next <FaArrowRight />
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default PaymentStep;
