import { Link } from "react-router-dom";

// ! Styles
import styles from "../AboutUs/AboutUs.module.scss";

export default function AboutUs() {
  return (
    <main className={styles.container}>
      <h1> About Us</h1>
      <h3> Who are we?</h3>

      <p>Camping with Lifes-a-Pitch is the perfect way to embrace the outdoors while discovering amazing campsite locations across the UK. With their easy-to-use website, you can find and choose from top-rated spots to suit your camping style, whether you're after a quiet woodland retreat or a lively, family-friendly campsite. Exploring these scenic locations encourages physical activity, from hiking and setting up camp to cooking over an open flame, all of which boost health and fitness. The fresh air and peaceful sounds of nature also reduce stress, helping you unwind and reconnect. Lifes-a-Pitch makes camping an enjoyable and memorable experience, connecting you with nature and fostering unforgettable moments under the stars.</p>

      <h2>Meet the Founders</h2>
      <Link to="https://github.com/The-Mostest" className="github-link">
        <img src="src/assets/images/FinnMcDougall.png" alt="A photo of a bald man,standing in a pink jumper with his hands on his hips" />
      </Link>
      <p>'I like Camping, it is cool'</p>
      <p>
        <strong>- Finn</strong>
      </p>

      <Link to="https://github.com/joemarney" className="github-link">
        <img src="src/assets/images/JoeMarney.png" alt="A placeholder image of the silhouette of a figure" />
      </Link>
      <p>'Camping is the best way to spend a weekend'</p>
      <p>
        <strong>- Joe</strong>
      </p>
    </main>
  );
}
