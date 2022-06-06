import { useState, useEffect } from "react";

const Home = () => {
  const [animals, setAnimals] = useState([]);
  const [name, setName] = useState([]);
  const [animal, setAnimal] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/animals")
      .then((response) => response.json())
      .then((data) => setAnimals(data));
  }, []);

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const animalChangeHandler = (event) => {
    setAnimal(event.target.value);
  };

  const submitHandler = (event) => {
    fetch("http://localhost:3000/api/animals", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name, animal }),
    })
      .then((response) => response.json())
      .then((data) => setAnimals(data));
  };

  return (
    <div>
      <h1 className="text-l font-bold">Flame Factory Animal List</h1>
      {animals.map((animal) => (
        <li key={animal.id}>
          {animal.name}, {animal.animal}
        </li>
      ))}
      <form>
        <h2 className="font-bold">New Animal</h2>
        <input
          className="border border-black-200 py-3 px-4"
          id="name"
          value={name}
          onChange={nameChangeHandler}
        />
        <input
          className="border border-black-200 py-3 px-4"
          id="animal"
          value={animal}
          onChange={animalChangeHandler}
        />
        <button className="border bg-gray-200 py-3 px-4" onClick={submitHandler}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
