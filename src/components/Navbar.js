const Navbar = ({ setPage, logout, page }) => {
  const isSelected = {
    color: 'white',
    textDecoration: 'underline',
    fontWeight: '600',
    marginRight: 20,
    fontSize: 16,
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
          style={page === 'persons' ? isSelected : isNotSelected}
          onClick={() => {
            setPage('persons');
          }}
        >
          tutti i contatti
        </span>
        <span
          style={page === 'amici' ? isSelected : isNotSelected}
          onClick={() => {
            setPage('amici');
          }}
        >
          amici
        </span>
        <span
          style={page === 'lavoro' ? isSelected : isNotSelected}
          onClick={() => {
            setPage('lavoro');
          }}
        >
          lavoro
        </span>
      </div>
      <span
        style={page === 'logout' ? isSelected : isNotSelected}
        onClick={logout}
      >
        logout
      </span>
    </div>
  );
};

export default Navbar;
