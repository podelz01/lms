"use client";

import styles from "./../styles/Profile.module.css";
import { useState } from "react";
import { FaCamera, FaArrowLeft } from "react-icons/fa";
import ProfileForm from "@/app/(class)/(profile)/components/ProfileForm";
import ProfileDetails from "@/app/(class)/(profile)/components/ProfileDetails";


export default function Profile() {
  const hasImage = false; 
  const [profileImage, setProfileImage] = useState("/profile-picture.jpg"); 

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("John Doe");
  const [phoneNumber, setPhoneNumber] = useState("+1-555-123-4567");
  const [email, setEmail] = useState("john.doe@example.com");

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (data: {
    fullName: string;
    phoneNumber: string;
    email: string;
  }) => {
    setFullName(data.fullName);
    setPhoneNumber(data.phoneNumber);
    setEmail(data.email);
    toggleEdit();
  };

  const handleImageClick = () => {
    // Implement logic to open file upload dialog or handle image selection
    // For example, you can trigger a hidden file input element
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };


  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.profileImage} onClick={handleImageClick}>
          {hasImage ? (
            <img src={profileImage} alt="Profile" />
          ) : (
            <div className={styles.profileCircle}>KF</div>
          )}
          <div className={styles.imageOverlay}>
            <FaCamera className={styles.cameraIcon} /> {/* Add camera icon */}
          </div>
        </div>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.profileDetails}>

        {isEditing ? (
            <ProfileForm
              fullName={fullName}
              phoneNumber={phoneNumber}
              email={email}
              onSave={handleSave}
            />
          ) : (
            <ProfileDetails
              fullName={fullName}
              phoneNumber={phoneNumber}
              email={email}
            />
          )}        

        
          {isEditing ? 
          
            <button className={styles.cancelButton} onClick={toggleEdit}><FaArrowLeft className={styles.cancelIcon}/>Cancel</button>
            :
            <button className={styles.editButton} onClick={toggleEdit}>Edit Profile</button>
          }
        
      </div>
    </div>
  );
}