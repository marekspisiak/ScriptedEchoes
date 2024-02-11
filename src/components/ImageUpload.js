import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import Button from "./buttons/Button";
import styles from "./ImageUpload.module.scss"; // Predpokladajme, že ste vytvorili štýly
import { set } from "ramda";

const ImageUpload = ({ onImageSelected, existingImageUrl }) => {
  const [removeImage, setRemoveImage] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(existingImageUrl || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (image && typeof image === "object") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
      setRemoveImage(false);
    }
    onImageSelected(removeImage ? "REMOVE_IMAGE" : image); // Posielanie vybraného obrázka nadradenému komponentu
  }, [image, removeImage]);

  const handleRemoveImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setRemoveImage(true);
    setImagePreview(null); // Ak ukladáte náhľad v state
    setImage(null); // Ak obrázok pochádza z input type="file"
  };

  return (
    <div className={styles.imageUpload}>
      {imagePreview && (
        <Form.Group controlId="imagePreview" className={styles.formGroup}>
          <Form.Label className={styles.label}>Aktuálny obrázok</Form.Label>
          <div className={styles.imagePreviewContainer}>
            <img
              src={imagePreview}
              alt="Náhľad obrázka"
              className={styles.imagePreview}
            />
          </div>
          <Button variant="danger" onClick={handleRemoveImage}>
            Odstrániť obrázok
          </Button>
        </Form.Group>
      )}

      <Form.Group controlId="blogImage" className={styles.formGroup}>
        <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className={styles.fileInput}
          ref={fileInputRef}
        />
      </Form.Group>
    </div>
  );
};

export default ImageUpload;
