import BackBtn from "./components/back-btn";

function ErrorElement() {
  return (
    <>
    <header>
        <BackBtn />
    </header>
      <main id="error">
        <img src="404.svg" alt="sad hot pot with 404 written on" />
        <h1 id="error-title">PAGE NOT FOUND</h1>
      </main>
    </>
  );
}
export default ErrorElement;
