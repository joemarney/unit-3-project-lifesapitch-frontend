// ! Styles
import styles from "../Loading/Loading.module.scss";

// ! Images

export default function Loading() {
  return (
    <main className={styles.container}>
      <img src="/src/assets/images/tent.gif" alt="a cartoon tent with a flag flapping in the wind" />
      <p>loading ...</p>
    </main>
  );
}
