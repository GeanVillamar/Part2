import { useState, useEffect } from "react";
import axios from "axios";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("new person");
  const [newNumber, setNewNumber] = useState("new number");
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("effect");
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        console.log("promise fulfilled");
        setPersons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log("render", persons.length, "persons");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredpersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Person filteredpersons={filteredpersons} />
    </div>
  );
};

export default App;
