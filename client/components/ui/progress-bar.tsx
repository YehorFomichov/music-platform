import React from "react";
import styles from "./progress-bar.module.css";
interface ProgressBarProps {
  step: number;
}
const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  return (
    <>
      <div className={styles.steps}>
        <div
          className={
            step === 1 ? `${styles.step} ${styles.active}` : `${styles.step}`
          }
        >
          <div>1</div>
          <div>Step 1</div>
        </div>
        <div
          className={
            step === 2 ? `${styles.step} ${styles.active}` : `${styles.step}`
          }
        >
          <div>2</div>
          <div>Step 2</div>
        </div>
        <div
          className={
            step === 3 ? `${styles.step} ${styles.active}` : `${styles.step}`
          }
        >
          <div>3</div>
          <div>Step 3</div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
