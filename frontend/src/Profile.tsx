import BackBtn from "./components/back-btn";

function Profile() {
    const deleteUser = async () => {

    }
  return (
    <>
      <header>
        <BackBtn />
        <Link to={''} onClick={deleteUser}>DELETE</Link>
      </header>
      <main></main>
    </>
  );
}
export default Profile;
