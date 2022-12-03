const PersonDetailTab1 = ({ person, isFriend, deleteFriend, addFriend }) => {
  const isFriendStyle = {
    fontWeight: '700',
    borderRadius: '5px',
    padding: '3px 7px',
    background: 'gray',
    color: 'white',
  };
  const isNotFriendStyle = {
    fontWeight: '700',
    borderRadius: '5px',
    padding: '0 5px',
    background: 'white',
    color: 'gray',
    border: '1px solid gray',
  };
  return (
    <div id="personDetailTab1">
      <h2>Modifica</h2>
      <h3 style={{ marginBottom: 0 }}>name: {person.name}</h3>
      <div>phone: {person.phone}</div>
      <div>street: {person.address.street}</div>
      <div>city: {person.address.city}</div>
      <div id="buttons">
        {isFriend ? (
          <span
            role="button"
            tabIndex="0"
            style={isFriendStyle}
            onClick={() => deleteFriend(person.name)}
          >
            amico
          </span>
        ) : (
          <span
            role="button"
            tabIndex="0"
            style={isNotFriendStyle}
            onClick={() => addFriend(person.name)}
          >
            amico
          </span>
        )}
        {/* {isFriend ? (
          <span style={isFriendStyle} onClick={() => deleteFriend(person.name)}>
            lavoro
          </span>
        ) : (
          <span style={isNotFriendStyle} onClick={() => addFriend(person.name)}>
            lavoro
          </span>
        )} */}
      </div>
    </div>
  );
};

export default PersonDetailTab1;
