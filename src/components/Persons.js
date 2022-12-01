import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FIND_PERSON, CREATE_FRIEND, ALL_PERSONS, USER } from '../queries';
import PersonForm from './PersonForm';
import PhoneForm from './PhoneForm';

const Person = ({ person, setNameToSearch }) => {
  const [createFriend, result] = useMutation(CREATE_FRIEND, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
  });

  console.log(result.data);

  const addFriend = name => {
    createFriend({ variables: { name } });
    setNameToSearch(null);
  };

  return (
    <>
      <h2>name: {person.name}</h2>
      <div>phone: {person.phone}</div>
      <div>
        address: {person.address.street}, {person.address.city}
      </div>
      <button onClick={() => setNameToSearch(null)}>cancel</button>
      <button onClick={() => addFriend(person.name)}>amico</button>
    </>
  );
};

const Persons = ({ persons, setError, show }) => {
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
