import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  faEdit,
  faTrashCan,
  faUser,
} from '@fortawesome/free-regular-svg-icons';

import {
  FIND_PERSON,
  REMOVE_PERSON,
  ALL_PERSONS,
  USER,
  CREATE_FRIEND,
  REMOVE_FRIEND,
} from '../queries';
import NewPerson from './NewPerson';
import EditPerson from './EditPerson';
import ButtonFriends from './ButtonFriends';
import { CREATE_COLLEGUE, REMOVE_COLLEGUE } from './../queries';
import ButtonCollegues from './ButtonCollegues';

const PersonsList = ({ persons, setError, show, setPage, page }) => {
  const [formVisible, setFormVisible] = useState(false);
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [valueInput, setValueInput] = useState('');
  const [nameToSearch, setNameToSearch] = useState(null);

  useEffect(() => {
    setPersonsToShow(persons);
    setValueInput('');
  }, [persons]);

  // QUERIES------------------------------------------
  const friedsAndCollegues = useQuery(USER);

  const personSearched = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  // AGGIUNGE AMICO------------------------------
  const [createFriend] = useMutation(CREATE_FRIEND, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
  });
  const addFriend = name => {
    createFriend({ variables: { name } });
  };
  // RIMUOVE AMICO -----
  const [removeFriend] = useMutation(REMOVE_FRIEND, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
  });
  const deleteFriend = name => {
    removeFriend({ variables: { name } });
  };
  // AGGIUNGI COLLEGA -----
  const [createCollegue] = useMutation(CREATE_COLLEGUE, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
  });
  const addCollegue = name => {
    createCollegue({ variables: { name } });
  };
  // RIMUOVI COLLEGA -----
  const [removeCollegue] = useMutation(REMOVE_COLLEGUE, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
  });
  const deleteCollegue = name => {
    removeCollegue({ variables: { name } });
  };

  // REMOVE_PERSON ---------------------------------------------------
  const [removePerson] = useMutation(REMOVE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }, { query: USER }],
  });
  const remove = name => {
    removePerson({ variables: { name } });
  };

  // FIND PERSON ----------------------------------------------------
  if (nameToSearch && personSearched.data) {
    const person = personSearched.data.findPerson;
    return (
      <EditPerson
        persons={persons}
        person={person}
        setNameToSearch={setNameToSearch}
        setPage={setPage}
        setError={setError}
        show={show}
        page={page}
      />
    );
  }
  if (!show) {
    return null;
  }

  // SEARCH ----------------------------------------------------------
  const searchPerson = value => {
    setValueInput(value);
    setPersonsToShow(
      persons.filter(
        p =>
          p.name.toLowerCase().includes(value.toLowerCase()) ||
          p.address.city.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  // LIST SORT METHOD-----------------------------------------------------
  const personsSorted = personsToShow.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  // RITORNA ARRAY AMICI & COLLEGHI-----------------------------------------
  if (friedsAndCollegues.loading) {
    return null;
  }
  const amiciAttuali = friedsAndCollegues.data.me.friends.map(a => a.name);
  const colleghiAttuali = friedsAndCollegues.data.me.collegues.map(a => a.name);

  const setVisible = id => {
    const bo = document.getElementById(`${id}`);
    bo.style.display = 'block';
  };

  const setVisibleNone = id => {
    const bo = document.getElementById(`${id}`);
    const timer = setTimeout(() => {
      bo.style.display = 'none';
    }, 2000);
    return () => clearTimeout(timer);
  };
  return (
    <>
      {formVisible ? (
        <>
          <NewPerson setError={setError} setFormVisible={setFormVisible} />
        </>
      ) : (
        <>
          <div id="selectList">
            <div>
              <div>cerca:</div>
              <input
                value={valueInput}
                id="selectInput"
                onChange={({ target }) => searchPerson(target.value)}
              />
            </div>

            <FontAwesomeIcon
              id="addButton"
              icon={faPlus}
              size="1x"
              onClick={() => setFormVisible(true)}
            ></FontAwesomeIcon>
          </div>
          <div id="headerPersonsList">
            <h2>Contatti esistenti</h2>
          </div>
          <div id="personsList">
            {personsSorted.length === 0 ? (
              <h2>nessun contatto inserito...</h2>
            ) : (
              <>
                {personsSorted.map((p, index) => (
                  <div className="personCard" key={index}>
                    <>
                      <div className="personDetails">
                        <div>
                          <h3 style={{ marginBottom: '10px' }}>
                            name: {p.name}
                          </h3>
                          <div>
                            <div>
                              phone: {p.phone ? p.phone : 'nessun telefono'}
                            </div>
                            <div>street: {p.address.street}</div>
                            <div>city: {p.address.city}</div>
                          </div>
                          <div className="labels">
                            {amiciAttuali.includes(p.name) && <div>amico</div>}
                            {colleghiAttuali.includes(p.name) && (
                              <div>collega</div>
                            )}
                          </div>
                        </div>
                        <div id="icons">
                          <FontAwesomeIcon
                            style={{ cursor: 'pointer' }}
                            icon={faUser}
                            size="2x"
                            onClick={() => setVisible(p.id)}
                          />
                          <FontAwesomeIcon
                            style={{ cursor: 'pointer' }}
                            icon={faEdit}
                            size="2x"
                            onClick={() => {
                              setNameToSearch(p.name);
                              setPersonsToShow(persons);
                              setValueInput('');
                            }}
                          ></FontAwesomeIcon>
                          <FontAwesomeIcon
                            style={{ cursor: 'pointer' }}
                            icon={faTrashCan}
                            size="2x"
                            onClick={() => {
                              remove(p.name);
                              setVisibleNone(p.id);
                            }}
                          ></FontAwesomeIcon>
                        </div>
                      </div>
                    </>
                    <div
                      id={p.id}
                      style={{
                        display: 'none',
                        width: '170px',
                        height: '55px',
                        position: 'absolute',
                        right: '50px',
                        top: '5px',
                        borderRadius: '10px',
                        border: '1px solid lightgray',
                        background: 'white',
                      }}
                    >
                      <div id="modalButtons">
                        <ButtonFriends
                          person={p}
                          addFriend={addFriend}
                          deleteFriend={deleteFriend}
                          isFriend={amiciAttuali.includes(p.name)}
                          setVisibleNone={setVisibleNone}
                        />
                        <ButtonCollegues
                          person={p}
                          addCollegue={addCollegue}
                          deleteCollegue={deleteCollegue}
                          isCollegue={colleghiAttuali.includes(p.name)}
                          setVisibleNone={setVisibleNone}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default PersonsList;
