const isCollegueStyle = {
  fontWeight: '700',
  borderRadius: '5px',
  padding: '3px 7px',
  background: 'gray',
  color: 'white',
};
const isNotCollegueStyle = {
  fontWeight: '700',
  borderRadius: '5px',
  padding: '0 5px',
  background: 'white',
  color: 'gray',
  border: '1px solid gray',
};
const ButtonCollegues = ({
  person,
  addCollegue,
  deleteCollegue,
  isCollegue,
}) => {
  return (
    <div id="buttons">
      {isCollegue ? (
        <span
          role="button"
          tabIndex="0"
          style={isCollegueStyle}
          onClick={() => deleteCollegue(person.name)}
        >
          collega
        </span>
      ) : (
        <span
          role="button"
          tabIndex="0"
          style={isNotCollegueStyle}
          onClick={() => addCollegue(person.name)}
        >
          collega
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

export default ButtonCollegues;
