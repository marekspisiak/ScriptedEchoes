import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import styles from "./ProfileButton.module.scss";
import useAuthHook from "../../hooks/useAuthHook";
import LogoutButton from "../buttons/LogoutButton";

const ProfileButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { user, logout } = useAuthHook();

  const handleToggle = () => setShowDropdown(!showDropdown);
  const handleLogout = () => {
    // Implement logout logic
    console.log("Logout");
  };

  return (
    <div className={styles.profileButton}>
      <img
        src="path_to_profile_image.jpg" // Nahraďte cestou k obrázku profilu
        alt="Profilový obrázok"
        onClick={handleToggle}
        className={styles.profileImage}
      />
      <Dropdown show={showDropdown} onToggle={handleToggle}>
        <Dropdown.Toggle as="div" className={styles.dropdownToggle} />

        <Dropdown.Menu className={styles.dropdownMenu}>
          <Dropdown.Item href="#action1">Možnosť 1</Dropdown.Item>
          <Dropdown.Item href="#action2">Možnosť 2</Dropdown.Item>
          <Dropdown.Item className={styles.logout} onClick={logout}>
            Odhlásiť
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ProfileButton;
