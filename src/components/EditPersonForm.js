import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { EDIT_NUMBER, USER } from '../queries';
import { ALL_PERSONS } from '../queries';

const EditPersonForm = ({ setError, person, children, setNameToSearch }) => {
  const [newPhone, setNewPhone] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  //console.log('dati persona', person);

  useEffect(() => {
    setNewPhone(person.phone);
    setNewStreet(person.address.street);
    setNewCity(person.address.city);
  }, [person.address.city, person.address.street, person.phone]);

  const [changeContact, result] = useMutation(EDIT_NUMBER, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
    onError: error => {
      setError(error.graphQLErrors[0].message);
    },
    onCompleted: () => {
      //setError('Edited with success');
      setNameToSearch(null);
    },
  });
  console.log('change contact', result.data);
  const submit = event => {
    event.preventDefault();
    changeContact({
      variables: { name: person.name, newPhone, newStreet, newCity },
    });
    //setNameToSearch(null);
  };
  // ???????????
  // useEffect(() => {
  //   if (result.data && result.data.editNumber === null) {
  //     setError('person not found');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [result.data]);

  return (
    <div id="editPersonForm">
      <div id="name">
        <span style={{ marginRight: 8 }}>name:</span>
        <span>{person.name}</span>
      </div>
      <form onSubmit={submit}>
        <div>
          <div>phone:</div>
          <input
            defaultValue={person.phone}
            //value={phone}
            onChange={({ target }) => setNewPhone(target.value)}
          />
        </div>
        <div>
          <div>street:</div>
          <input
            defaultValue={person.address.street}
            //value={phone}
            onChange={({ target }) => setNewStreet(target.value)}
          />
        </div>
        <div>
          <div>city:</div>
          <input
            defaultValue={person.address.city}
            //value={phone}
            onChange={({ target }) => setNewCity(target.value)}
          />
        </div>
        {/* buttons component */}
        {children}
        <button
          style={{ marginTop: '20px', width: '150px', fontSize: '20px' }}
          type="submit"
        >
          salva e chiudi
        </button>
      </form>
    </div>
  );
};

export default EditPersonForm;
