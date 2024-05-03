import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "../buttons/Button";
import { useAuth } from "../../contexts/UserContext";
import axios from "axios";
import useResultMessage from "../../hooks/useResultMessage";

const ChangePasswordCard = () => {
  const { user } = useAuth();
  const [ResultComponent, successMessage, errorMessage] = useResultMessage();

  const sendPasswordResetEmail = async () => {
    const email = user?.email;
    const url = `https://dev-lvx04gpir514yisr.us.auth0.com/dbconnections/change_password`;
    const payload = {
      client_id: "jAs3G0RPYsvmlsnfF2XurxhRW8EI3uYf",
      email: email,
      connection: "Username-Password-Authentication",
    };
    const headers = {
      "content-type": "application/json",
    };

    try {
      const response = await axios.post(url, payload, { headers: headers });
      console.log("Password reset email sent:", response.data);
      successMessage("Email na zmenu hesla bol odoslaný.");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      errorMessage("Nepodarilo sa odoslať email na zmenu hesla.");
    }
  };

  return (
    <>
      {ResultComponent}
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Zmena Hesla</Card.Title>
          <Card.Text>Vyžiadajte email pre zmenu hesla na váš účet.</Card.Text>
          <Button onClick={sendPasswordResetEmail} variant={"accent"}>
            Zmeniť Heslo
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ChangePasswordCard;
