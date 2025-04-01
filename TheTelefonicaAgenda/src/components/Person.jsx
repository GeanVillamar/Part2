const Person = ({ filteredpersons, toggledelet }) => {
  return (
    <>
      <ul>
        {filteredpersons.map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}
            <button onClick={() => toggledelet(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Person;
