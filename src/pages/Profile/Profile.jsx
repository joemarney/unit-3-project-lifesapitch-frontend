export default function ProfilePage(props) {
  console.log(props.user);
  return (
    <main>
      <h1>Welcome {props.user.username}</h1>
      <img src={props.user.profilePhoto} />
    </main>
  );
}
