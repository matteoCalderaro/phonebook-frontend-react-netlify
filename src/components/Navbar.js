const Navbar = ({ setPage, logout, page }) => {
  return (
    <div id="navbar">
      <span
        style={{
          color: 'white',
          textDecoration: page === 'persons' ? 'underline' : 'none',
          fontWeight: '600',
          marginRight: 20,
          fontSize: 18,
        }}
        onClick={() => {
          setPage('persons');
        }}
      >
        tutti i contatti
      </span>
      <span
        style={{
          color: 'white',
          textDecoration: page === 'amici' ? 'underline' : 'none',
          fontWeight: '600',
          marginRight: 20,
          fontSize: 18,
        }}
        onClick={() => setPage('amici')}
      >
        amici
      </span>
      <span
        style={{
          color: 'white',
          textDecoration: page === 'lavoro' ? 'underline' : 'none',
          fontWeight: '600',
          marginRight: 20,
          fontSize: 18,
        }}
        onClick={() => setPage('lavoro')}
      >
        lavoro
      </span>
      <span
        style={{
          color: 'white',
          fontWeight: '600',
          fontSize: 18,
        }}
        onClick={logout}
      >
        logout
      </span>
    </div>
  );
};

export default Navbar;
