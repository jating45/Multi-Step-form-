import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar, Button } from "react-bootstrap";

const steps = [
  { title: "Account Information", icon: "bi-lock", color: "success" },
  { title: "Personal Information", icon: "bi-person", color: "danger" },
  { title: "Payment Information", icon: "bi-credit-card", color: "secondary" },
  { title: "Confirm Your Details", icon: "bi-file-earmark", color: "secondary" },
];

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`text-center ${index <= currentStep ? "text-" + step.color : "text-secondary"}`}
          >
            <i className={`bi ${step.icon} fs-3`}></i>
            <p className="mb-0">{step.title}</p>
          </div>
        ))}
      </div>
      <ProgressBar now={(currentStep / (steps.length - 1)) * 100} />
      <div className="mt-4 text-center">
        <Button variant="secondary" onClick={prevStep} disabled={currentStep === 0}>
          Previous
        </Button>
        <Button className="ms-2" variant="primary" onClick={nextStep} disabled={currentStep === steps.length - 1}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Wizard;
