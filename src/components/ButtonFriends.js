const isFriendStyle = {
  fontWeight: '700',
  borderRadius: '5px',
  padding: '3px 7px',
  background: 'gray',
  color: 'white',
  cursor: 'pointer',
};
const isNotFriendStyle = {
  fontWeight: '700',
  borderRadius: '5px',
  padding: '0 5px',
  background: 'white',
  color: 'gray',
  border: '1px solid gray',
  cursor: 'pointer',
};
const ButtonFriends = ({
  isFriend,
  deleteFriend,
  addFriend,
  person,
  setVisibleNone,
}) => {
  return (
    <div id="buttonFriend">
      {isFriend ? (
        <span
          role="button"
          tabIndex="0"
          style={isFriendStyle}
          onClick={() => {
            deleteFriend(person.name);
            setVisibleNone(person.id);
          }}
        >
          amico
        </span>
      ) : (
        <span
          role="button"
          tabIndex="0"
          style={isNotFriendStyle}
          onClick={() => {
            addFriend(person.name);
            setVisibleNone(person.id);
          }}
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
