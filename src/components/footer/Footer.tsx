import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Jose Dev</div>
      <div className={styles.text}>
        Lama creative thoughts agency © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;