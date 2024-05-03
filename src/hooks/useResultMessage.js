import React, { useState, useCallback, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

const useResultMessage = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const showMessage = useCallback(
    (msg, type) => {
      setMessage(msg);
      setMessageType(type);
      setIsVisible(true);

      if (timeoutId) clearTimeout(timeoutId);

      const newTimeoutId = setTimeout(() => {
        setIsVisible(false);
        setMessage("");
        setTimeoutId(null);
      }, 5000);

      setTimeoutId(newTimeoutId);
    },
    [timeoutId]
  );

  const success = useCallback(
    (msg) => {
      showMessage(msg, "success");
    },
    [showMessage]
  );

  const error = useCallback(
    (msg) => {
      showMessage(msg, "danger");
    },
    [showMessage]
  );

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const MessageComponent = isVisible ? (
    <Alert variant={messageType}>{message}</Alert>
  ) : null;

  return [MessageComponent, success, error];
};

export default useResultMessage;
