// ! Styles
import styles from "../Profile/Profile.module.scss";

export default function ProfilePage(props) {
  return (
    <main className={styles.container}>
      <img src={props.user.profilePhoto} />
      <h1>Welcome {props.user.username}</h1>
    </main>
  );
}
