import { useState, useEffect } from "react";

const Home = () => {
  const [animalsList, setAnimalsList] = useState([]);
  const [name, setName] = useState([]);
  const [animal, setAnimal] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/animals")
      .then((response) => response.json())
      .then((data) => setAnimalsList(data));
  }, []);

  const nameChangeHandler = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };
  const animalChangeHandler = (event) => {
    event.preventDefault();
    setAnimal(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/animals", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name, animal }),
    })
      .then((response) => response.json())
      .then((data) => setAnimalsList(data));
  };

  return (
    <div>
      <h1 className="text-l font-bold">Flame Factory Animal List</h1>
      <hr />
      <ul>
        {animalsList.map((animal) => (
          <li key={animal.id}>
            {animal.name}, {animal.animal}
          </li>
        ))}
      </ul>
      <form>
        <h2 className="font-bold">New Animal</h2>
        <hr />
        <input
          className="border border-black-200 py-3 px-4"
          id="name"
          value={name}
          onChange={nameChangeHandler}
          placeholder="Name..."
        />
        <input
          className="border border-black-200 py-3 px-4"
          id="animal"
          value={animal}
          onChange={animalChangeHandler}
          placeholder="Animal..."
        />
        <button
          className="border bg-gray-200 py-3 px-4"
          onClick={submitHandler}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
