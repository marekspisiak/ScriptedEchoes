import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import styles from "./ProfileButton.module.scss";
import useAuthHook from "../../hooks/useAuthHook";
import { useAuth } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

const ProfileButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { logout } = useAuthHook();
  const { user } = useAuth();

  const handleToggle = () => setShowDropdown(!showDropdown);

  return (
    <div className={styles.profileButton}>
      <img
        src={user?.image}
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
