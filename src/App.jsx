import { useState, useEffect, useRef } from "react";
import "./App.css";
import DogGreet from "./components/DogGreet";

function App() {
  const [newName, setNewName] = useState("");
  const [newBreed, setNewBreed] = useState("");
  const [dogs, setDogs] = useState([
    {
      id: 1,
      name: "Benny",
      breed: "německý ovčák",
    },
    {
      id: 2,
      name: "Max",
      breed: "čivava",
    },
    {
      id: 3,
      name: "Endy",
      breed: "kníráč",
    },
  ]);
  const focusElement = useRef();
  const dogList = dogs.map((dog) => (
    <div key={dog.id} className="box">
      <p>
        {dog.name}
        {dog.name.length < 5 && <sup>short name</sup>}
      </p>
      <p>{dog.breed}</p>
      <button onClick={() => handleDelete(dog.id)}>Odeber psa</button>
    </div>
  ));

  const handleDelete = (idToDel) => {
    const newDogs = dogs.filter((dog)=> dog.id !== idToDel);
    setDogs(newDogs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newId = Math.max(...dogs.map((dog) => dog.id)) + 1;
    const newDogs = [...dogs, { id: newId, name: newName, breed: newBreed }];
    setDogs(newDogs);
    setNewBreed("");
    setNewName("");
    focusElement.current.focus();
  };

  useEffect(() => console.log(dogs), [dogs]);
  useEffect(() => focusElement.current.focus(), []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="dog-name">jméno psa</label>
        <input
          type="text"
          name="dog-name"
          id="dog-name"
          value={newName}
          ref={focusElement}
          onChange={(event) => setNewName(event.target.value)}
        />
        <label htmlFor="dog-breed">rasa psa</label>
        <input
          type="text"
          name="dog-breed"
          id="dog-breed"
          value={newBreed}
          onChange={(event) => setNewBreed(event.target.value)}
        />
        <input type="submit" value="Přidej psa"></input>
      </form>
      <p>Můj pes {newName}</p>
      <DogGreet dogName={newName}/>
      <hr />
      {dogList}
    </div>
  );
}

export default App;
