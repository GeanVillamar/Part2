import { useState, useEffect } from "react";
import noteService from "./services/Persons";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then((response) => {
        console.log("promise fulfilled");
        setPersons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredpersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        handleUpdate(existingPerson.id);
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    noteService
      .create(personObject)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");

        // Mostrar mensaje de éxito
        setSuccessMessage(`Added ${response.data.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error adding person:", error);
      });
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const toggledelet = (id) => {
    const person = persons.find((p) => p.id === id);

    if (!person) {
      alert("Person not found.");
      return;
    }

    if (window.confirm(`Delete ${person.name}?`)) {
      noteService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${person.name} was already removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter((p) => p.id !== id)); // Eliminar del estado de todas formas
          console.error("Error deleting person:", error);
        });
    }
  };

  const handleUpdate = (id) => {
    const person = persons.find((p) => p.id === id);
    if (!person) return;

    const updatedPerson = { ...person, number: newNumber };

    if (window.confirm(`Replace ${person.name}'s number with a new one?`)) {
      noteService
        .update(id, updatedPerson)
        .then((response) => {
          setPersons(persons.map((p) => (p.id !== id ? p : response.data)));
          setNewNumber("");

          // Mostrar mensaje de éxito
          setErrorMessage(`Updated ${response.data.name}'s number`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(`Error updating ${person.name}.`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          console.error("Error updating person:", error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} successMessage={successMessage} />
      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleUpdate={handleUpdate}
      />
      <h2>Numbers</h2>
      <Person filteredpersons={filteredpersons} toggledelet={toggledelet} />
    </div>
  );
};

export default App;
