import React, { useCallback, useEffect, useRef } from "react";
import styles from "./slider.module.scss";
const Slider = ({ min = 0, max, minVal, maxVal, onChange }) => {
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);
  const getConditionalClass = () => {
    return minVal > max - min
      ? "thumb thumb--zindex-3"
      : "thumb thumb--zindex-5";
  };
  const getPercent = useCallback(
    (value) => {
      return Math.round(((value - min) / (max - min)) * 100);
    },
    [min, max]
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  return (
    <div className="col-12 position-relative">
      <input
        type="range"
        name="min"
        min={min}
        max={max}
        step={max > 10 ? 1 : 0.01}
        value={minVal}
        ref={minValRef}
        onChange={onChange}
        className={getConditionalClass()}
      />
      <input
        type="range"
        min={min}
        name="max"
        value={maxVal}
        step={max > 10 ? 1 : 0.01}
        ref={maxValRef}
        max={max}
        onChange={onChange}
        className="thumb thumb--zindex-4"
      />
      <div className={styles.slider}>
        <div className={styles.slider__track} />
        <div ref={range} className={styles.slider__range} />
      </div>
      <div className="d-flex justify-content-between mt-3">
        <div className="">{max > 10 ? `${minVal} UAH` : minVal}</div>
        <div className="">{max > 10 ? `${maxVal} UAH` : maxVal}</div>
      </div>
    </div>
  );
};

export default Slider;
