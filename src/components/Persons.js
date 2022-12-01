import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_PERSON, USER } from '../queries';
import PersonForm from './PersonForm';
import PhoneForm from './PhoneForm';
import Person from './Person';

const Persons = ({ persons, setError, show, setPage, page }) => {
  console.log(persons);

  const [nameToSearch, setNameToSearch] = useState(null);

  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    const person = result.data.findPerson;
    return (
      <Person
        persons={persons}
        person={person}
        setNameToSearch={setNameToSearch}
        setPage={setPage}
        show={show}
        page={page}
      />
    );
  }
  if (!show) {
    return null;
  }
  return (
    <>
      <div>
        {persons.map(p => (
          <div key={p.id}>
            {p.name}
            {p.phone}
            <button onClick={() => setNameToSearch(p.name)}>search</button>
          </div>
        ))}
      </div>
      <PersonForm setError={setError} />
      <PhoneForm setError={setError} />
    </>
  );
};

export default Persons;
