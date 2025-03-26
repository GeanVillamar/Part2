const Header = ({ course }) => {
  console.log("header component: ", course);
  return (
    <>
      <h1>{course.name}</h1>
    </>
  );
};
export default Header;
