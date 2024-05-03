import { Card } from "react-bootstrap";
import styles from "./BenefitsCard.module.scss";

const BenefitsCard = ({ benefit }) => {
  return (
    <Card className={`mb-4 ${styles.benefitsCard}`}>
      <Card.Img
        variant="top"
        src={benefit.icon}
        className={styles.benefitsCardImgTop}
      />
      <Card.Body>
        <Card.Title className={styles.benefitsCardTitle}>
          {benefit.title}
        </Card.Title>
        <Card.Text className={styles.benefitsCardText}>
          {benefit.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BenefitsCard;
