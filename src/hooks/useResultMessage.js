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

      // Zrušenie existujúceho časovača
      if (timeoutId) clearTimeout(timeoutId);

      // Nastavenie nového časovača
      const newTimeoutId = setTimeout(() => {
        setIsVisible(false);
        setMessage("");
        setTimeoutId(null); // Reset identifikátora časovača po skončení
      }, 5000);

      // Uloženie identifikátora nového časovača
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

  // Čistenie na odpojenie komponentu
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
