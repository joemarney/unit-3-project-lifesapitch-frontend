import { useState } from "react";

// ! Styles
import styles from "../Carousel/Carousel.module.scss";

export default function Carousel(props) {
  const [activeIdx, setActiveIdx] = useState(0);

  function nextSlide() {
    setActiveIdx((previous) => (previous === props.images.length - 1 ? 0 : previous + 1));
  }

  function prevSlide() {
    setActiveIdx((previous) => (previous === 0 ? props.images.length - 1 : previous - 1));
  }

  return (
    <div className={styles.container}>
      <button onClick={prevSlide}>
        <em></em>
      </button>
      <img src={props.images[activeIdx]} alt={`Slide ${activeIdx}`} />
      <button onClick={nextSlide}>
        <i></i>
      </button>
    </div>
  );
}
