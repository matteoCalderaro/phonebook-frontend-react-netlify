const isCollegueStyle = {
  fontWeight: '700',
  borderRadius: '5px',
  padding: '3px 7px',
  background: 'gray',
  color: 'white',
  cursor: 'pointer',
};
const isNotCollegueStyle = {
  fontWeight: '700',
  borderRadius: '5px',
  padding: '3px 7px',
  background: 'white',
  color: 'gray',
  border: '1px solid gray',
  cursor: 'pointer',
};
const ButtonCollegues = ({
  person,
  addCollegue,
  deleteCollegue,
  isCollegue,
  setVisibleNone,
}) => {
  return (
    <div id="buttonCollegue">
      {isCollegue ? (
        <span
          role="button"
          tabIndex="0"
          style={isCollegueStyle}
          onClick={() => {
            deleteCollegue(person.name);
            setVisibleNone(person.id);
          }}
        >
          collega
        </span>
      ) : (
        <span
          role="button"
          tabIndex="0"
          style={isNotCollegueStyle}
          onClick={() => {
            addCollegue(person.name);
            setVisibleNone(person.id);
          }}
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
