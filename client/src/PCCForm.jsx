import React, { useState } from 'react';
import my_image from  '/goa_image.png';
import './PCCForm.css';

const PCCForm = () => {
  const [district, setDistrict] = useState('');
  const [age, setAge] = useState(null);
  const [formData, setFormData] = useState({
    purpose: '',
    modeReceive: 'Online',
    name: '',
    dob: '',
    gender: 'Male',
    aadhar: '',
    occupation: '',
    nationality: '',
    religion: '',
    presentAddress: '',
    permanentAddress: '',
    stayDuration: '',
    addressDuringStay: '',
    email: '',
    phone: '',
    alternatePhone: '',
    idProofType: 'Aadhar Card',
    idProofFile: null,
    addressProofType: 'Utility Bill',
    addressProofFile: null,
    involvedInCase: 'no',
    photo: null,
    paymentReference: ''
  });

  const calculateAge = () => {
    const dob = new Date(formData.dob);
    const today = new Date();
    let calculatedAge = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge);
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can add your fetch call here to send formData to your backend
  };

  return (
    <div className="pcc-container">
      <div className="logo-container">
        <a href="https://citizen.goapolice.gov.in/">
          <img src={my_image} alt="Goa Police Logo" className="logo" />
        </a>
      </div>
      <h1 className="form-title">Police Clearance Certificate</h1>

      <form onSubmit={handleSubmit}>
        {/* Police station details */}
        <div className="form-section" id="station-details">
          <h2 className="section-title">Police Station Details</h2>
          <label htmlFor="District">District:</label>
          <select id="District" name="District" className="select-input" value={district} onChange={handleDistrictChange} required>
            <option value="">--Please choose a district--</option>
            <option value="North Goa">North Goa</option>
            <option value="South Goa">South Goa</option>
          </select>

          {/* North Goa Dropdown */}
          {district === 'North Goa' && (
            <div id="north-goa-options" className="dropdown-options">
              <label htmlFor="north-goa">North Goa:</label>
              <select id="north-goa" name="northGoaStation" className="select-input" onChange={handleInputChange}>
                <option value="Panaji Police Station">Panaji Police Station</option>
                <option value="Old Goa Police Station">Old Goa Police Station</option>
                <option value="Agacaim Police Station">Agacaim Police Station</option>
              </select>
            </div>
          )}

          {/* South Goa Dropdown */}
          {district === 'South Goa' && (
            <div id="south-goa-options" className="dropdown-options">
              <label htmlFor="south-goa">South Goa:</label>
              <select id="south-goa" name="southGoaStation" className="select-input" onChange={handleInputChange}>
                <option value="Margao Town Police Station">Margao Town Police Station</option>
                <option value="Colva Police Station">Colva Police Station</option>
              </select>
            </div>
          )}
        </div>

        {/* Other Details Section */}
        <div className="form-section" id="other-details">
          <h2 className="section-title">Other Details</h2>
          <label htmlFor="purpose">Purpose of applying this service:</label>
          <input type="text" id="purpose" name="purpose" className="text-input" placeholder='Purpose of Applying' value={formData.purpose} onChange={handleInputChange} required />

          <label htmlFor="mode_receive">Mode of receiving:</label>
          <select id="mode_receive" name="modeReceive" className="select-input" value={formData.modeReceive} onChange={handleInputChange}>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        {/* Personal Details Section */}
        <div className="form-section" id="personal-details">
          <h2 className="section-title">Personal Details</h2>
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" name="name" className="text-input" placeholder="Enter Your full name" value={formData.name} onChange={handleInputChange} required />

          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" className="date-input" value={formData.dob} onChange={handleInputChange} required />
          <button type="button" className="calculate-age-button" onClick={calculateAge}>Calculate Age</button>
          <p className="age-display">Your age is: {age} years</p>

          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" className="select-input" value={formData.gender} onChange={handleInputChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Rather not to say">Rather not to say</option>
          </select>

          <label htmlFor="aadhar">Aadhar Card Number:</label>
          <input placeholder='Aadhar number (XXXXXXXXXXXX)' type="text" id="aadhar" name="aadhar" className="text-input" value={formData.aadhar} onChange={handleInputChange} required />

          <label htmlFor="occupation">Occupation:</label>
          <input type="text" id="occupation" name="occupation" className="text-input" value={formData.occupation} onChange={handleInputChange} required />

          <label htmlFor="nationality">Nationality:</label>
          <input type="text" id="nationality" name="nationality" className="text-input" value={formData.nationality} onChange={handleInputChange} required />

          <label htmlFor="religion">Religion:</label>
          <input type="text" id="religion" name="religion" className="text-input" value={formData.religion} onChange={handleInputChange} required />

          <label htmlFor="presentAddress">Present Address:</label>
          <textarea id="presentAddress" name="presentAddress" className="textarea-input" value={formData.presentAddress} onChange={handleInputChange} required />

          <label htmlFor="permanentAddress">Permanent Address:</label>
          <textarea id="permanentAddress" name="permanentAddress" className="textarea-input" value={formData.permanentAddress} onChange={handleInputChange} required />

          <label htmlFor="stayDuration">Duration of Stay:</label>
          <input type="text" id="stayDuration" name="stayDuration" className="text-input" value={formData.stayDuration} onChange={handleInputChange} required />

          <label htmlFor="addressDuringStay">Address During Stay:</label>
          <textarea id="addressDuringStay" name="addressDuringStay" className="textarea-input" value={formData.addressDuringStay} onChange={handleInputChange} required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" className="text-input" value={formData.email} onChange={handleInputChange} required />

          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" className="text-input" value={formData.phone} onChange={handleInputChange} required />

          <label htmlFor="alternatePhone">Alternate Phone:</label>
          <input type="tel" id="alternatePhone" name="alternatePhone" className="text-input" value={formData.alternatePhone} onChange={handleInputChange} />

          <label htmlFor="idProofType">ID Proof Type:</label>
          <select id="idProofType" name="idProofType" className="select-input" value={formData.idProofType} onChange={handleInputChange}>
            <option value="Aadhar Card">Aadhar Card</option>
            <option value="PAN Card">PAN Card</option>
          </select>
          <input type="file" id="idProofFile" name="idProofFile" className="file-input" accept="image/*" onChange={handleFileChange} />

          <label htmlFor="addressProofType">Address Proof Type:</label>
          <select id="addressProofType" name="addressProofType" className="select-input" value={formData.addressProofType} onChange={handleInputChange}>
            <option value="Utility Bill">Utility Bill</option>
            <option value="Rental Agreement">Rental Agreement</option>
          </select>
          <input type="file" id="addressProofFile" name="addressProofFile" className="file-input" accept="image/*" onChange={handleFileChange} />

          <label htmlFor="involvedInCase">Involved in Any Case:</label>
          <select id="involvedInCase" name="involvedInCase" className="select-input" value={formData.involvedInCase} onChange={handleInputChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <label htmlFor="photo">Photo:</label>
          <input type="file" id="photo" name="photo" className="file-input" accept="image/*" onChange={handleFileChange} required />

          <label htmlFor="paymentReference">Payment Reference:</label>
          <input type="text" id="paymentReference" name="paymentReference" className="text-input" value={formData.paymentReference} onChange={handleInputChange} required />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default PCCForm;
