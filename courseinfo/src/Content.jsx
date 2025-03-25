const Content = ({ course }) => {
  console.log("content component: ", course);
  return (
    <div>
      <p>
        {course.parts[0].name} Exercises:{course.parts[0].exercises}
      </p>
      <p>
        {course.parts[1].name} Exercises:{course.parts[1].exercises}
      </p>
      <p>
        {course.parts[2].name} Exercises:{course.parts[2].exercises}
      </p>
    </div>
  );
};
export default Content;
