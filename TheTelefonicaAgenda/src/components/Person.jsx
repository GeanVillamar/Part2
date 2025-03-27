const Person = ({ filteredpersons }) => {
  return (
    <>
      <ul>
        {filteredpersons.map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    </>
  );
};
export default Person;
