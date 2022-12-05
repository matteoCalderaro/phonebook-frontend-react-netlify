const Navbar = ({ setPage, logout, page }) => {
  const isSelected = {
    color: 'white',
    textDecoration: 'underline',
    fontWeight: '600',
    marginRight: 20,
    fontSize: 15,
    cursor: 'pointer',
  };
  const isNotSelected = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '400',
    marginRight: 20,
    fontSize: 15,
    cursor: 'pointer',
  };

  return (
    <div id="navbar">
      <div>
        <span
          role="button"
          tabIndex="0"
          style={page === 'persons' ? isSelected : isNotSelected}
          onClick={() => {
            setPage('persons');
          }}
        >
          contatti
        </span>
        <span
          role="button"
          tabIndex="0"
          style={page === 'friends' ? isSelected : isNotSelected}
          onClick={() => {
            setPage('friends');
          }}
        >
          amici
        </span>
        <span
          role="button"
          tabIndex="0"
          style={page === 'collegues' ? isSelected : isNotSelected}
          onClick={() => {
            setPage('collegues');
          }}
        >
          colleghi
        </span>
      </div>
      <span
        role="button"
        tabIndex="0"
        style={{
          color: 'white',
          fontWeight: '600',
          fontSize: 15,
          cursor: 'pointer',
        }}
        onClick={logout}
      >
        logout
      </span>
    </div>
  );
};

export default Navbar;
