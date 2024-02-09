import React, { useState, useCallback } from "react";
import Alert from "react-bootstrap/Alert";

const useResultMessage = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isVisible, setIsVisible] = useState(false);

  const showMessage = useCallback((msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
      setMessage("");
    }, 5000);
  }, []);

  const success = useCallback(
    (msg) => {
      showMessage(msg, "success");
    },
    [showMessage]
  );

  const error = useCallback(
    (msg) => {
      showMessage(msg, "error");
    },
    [showMessage]
  );

  const MessageComponent = isVisible ? (
    <Alert variant={messageType}>{message}</Alert>
  ) : null;

  return [MessageComponent, success, error];
};

export default useResultMessage;
