import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { EDIT_NUMBER, USER } from '../queries';
import { ALL_PERSONS } from '../queries';

const EditPersonForm = ({ setError, person, children }) => {
  console.log(person);
  const [newPhone, setNewPhone] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');

  const [changeContact] = useMutation(EDIT_NUMBER, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
    onError: error => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const submit = event => {
    event.preventDefault();
    changeContact({
      variables: { name: person.name, newPhone, newStreet, newCity },
    });

    // setNewName('');
    // setPhone('');
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
          salva
        </button>
      </form>
    </div>
  );
};

export default EditPersonForm;
