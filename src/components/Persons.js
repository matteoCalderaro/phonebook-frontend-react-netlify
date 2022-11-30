import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_PERSON } from '../queries';

const Person = ({ person, setNameToSearch }) => {
  return (
    <>
      <h2>name: {person.name}</h2>
      <div>phone: {person.phone}</div>
      <div>
        address: {person.address.street}, {person.address.city}
      </div>
      <button onClick={() => setNameToSearch(null)}>cancel</button>
    </>
  );
};

const Persons = ({ persons }) => {
  console.log(persons);

  const [nameToSearch, setNameToSearch] = useState(null);

  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    const person = result.data.findPerson;
    return <Person person={person} setNameToSearch={setNameToSearch} />;
  }
  return (
    <div>
      {persons.map(p => (
        <div key={p.id}>
          {p.name}
          {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>search</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
