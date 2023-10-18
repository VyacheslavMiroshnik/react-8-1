import { useEffect, useState } from "react";

const url =
  "https://raw.githubusercontent.com/SilantevR/ra16-homeworks/master/hooks-context/use-effect/data/";

function List() {
  const [list, setList] = useState(null);
  const [person, setPerson] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetch(`${url}users.json`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setList(result);
      });
  }, []);

  useEffect(() => {
    fetch(`${url}${id}.json`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setPerson(result);
      });
  }, [id]);

  const handleClick = (e) => {
    setId(e.target.id);
  };

  return (
    <div className="wrapper">
      {list ? (
        <div className="list">
          {list.map((item) => {
            return (
              <Item key={item.id} handleClick={handleClick} person={item} />
            );
          })}
        </div>
      ) : null}
      {person ? <Details details={person} /> : null}
    </div>
  );
}

function Item(props) {
  return (
    <div className="list_item" id={props.person.id} onClick={props.handleClick}>
      {props.person.name}
    </div>
  );
}

function Details({ details }) {
  return (
    <div className="person_wrapper">
      <div className="person_element">
        <img className="person_avatar_img" src={details.avatar} alt="Аватар" />
      </div>
      <div className="person_element">{details.name}</div>
      <div className="person_element">{details.details.city}</div>
      <div className="person_element">{details.details.company}</div>
      <div className="person_element">{details.details.position}</div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <List />
    </div>
  );
}

export default App;
