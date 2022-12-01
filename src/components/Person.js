import { useMutation, useQuery } from '@apollo/client';
import { ALL_PERSONS, CREATE_FRIEND, REMOVE_FRIEND, USER } from './../queries';

const Person = ({ persons, person, setNameToSearch, setPage, show }) => {
  // CREAZIONE AMICO
  const [createFriend, result] = useMutation(CREATE_FRIEND, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
  });
  const addFriend = name => {
    createFriend({ variables: { name } });
    //setNameToSearch(null);
    //setPage('amici');
  };
  console.log(result.data);
  // ---------------------------
  // CANCELLAZIONE AMICO
  const [removeFriend] = useMutation(REMOVE_FRIEND, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
  });
  const deleteFriend = name => {
    removeFriend({ variables: { name } });
    //setNameToSearch(null);
    //setPage('amici');
  };

  // ---------------------------

  // TUTTE LE PERSONE-------
  console.log('tutte le persone', persons);

  // AMICI ATTUALI
  const amici = useQuery(USER);
  if (amici.loading) {
    return null;
  }
  const amiciAttuali = amici.data.me.friends.map(a => a.name);
  console.log('amici attuali', amiciAttuali);

  // VERICA SE LA PERSONA E' AMICA
  console.log('persona attuale', person.name);
  const isfriend = amiciAttuali.includes(person.name);
  console.log('è amico?', isfriend);
  //-----------------------

  if (!show) return null;
  return (
    <>
      <h2>name: {person.name}</h2>
      <div>phone: {person.phone}</div>
      <div>
        address: {person.address.street}, {person.address.city}
      </div>
      <button onClick={() => setNameToSearch(null)}>chiudi</button>
      {isfriend ? (
        <button onClick={() => deleteFriend(person.name)}>
          non è più amico
        </button>
      ) : (
        <button onClick={() => addFriend(person.name)}>
          aggiungi agli amici
        </button>
      )}
    </>
  );
};

export default Person;
