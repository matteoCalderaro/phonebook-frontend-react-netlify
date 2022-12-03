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
const ButtonFriends = ({ isFriend, deleteFriend, addFriend, person }) => {
  return (
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
  );
};

export default ButtonFriends;
