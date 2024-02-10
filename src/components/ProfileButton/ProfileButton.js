import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import styles from "./ProfileButton.module.scss";
import useAuthHook from "../../hooks/useAuthHook";
import { Link } from "react-router-dom";
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
        src={user?.image ?? "/images/users/default.jpg"} // Nahraďte cestou k obrázku profilu
        alt="Profilový obrázok"
        onClick={handleToggle}
        className={styles.profileImage}
      />
      <Dropdown show={showDropdown} onToggle={handleToggle}>
        <Dropdown.Toggle as="div" className={styles.dropdownToggle} />

        <Dropdown.Menu className={styles.dropdownMenu} align={"end"}>
          <Dropdown.Item as={Link} to={"/profile"}>
            Profil
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={"/profile  "}>
            Príspevky
          </Dropdown.Item>
          <Dropdown.Item className={styles.logout} onClick={logout}>
            Odhlásiť
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ProfileButton;
