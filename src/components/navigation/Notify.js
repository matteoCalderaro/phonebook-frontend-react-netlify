const styleError = {
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: 'inherit',
  color: 'red',
  border: '1px solid red',
  padding: '5px 10px',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  backgroundColor: '#eee8e8',
  position: 'absolute',
  borderTopColor: 'black',
  fontWeight: '600',
  zIndex: '6000',
  minHeight: '50px',
  //textAlign: 'center',
  // marginLeft: 'auto',
  // marginRight: 'auto',
  // left: '0',
  // right: '0',
};
const styleSuccees = {
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: 'inherit',
  color: 'green',
  border: '1px solid green',
  padding: '5px 10px',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  backgroundColor: '#eee8e8',
  position: 'absolute',
  borderTopColor: 'black',
  fontWeight: '600',
  zIndex: '6000',
  minHeight: '50px',
  textAlign: 'center',
};
const textCenter = {
  padding: '6px',
};

const Notify = ({ errorMessage }) => {
  if (errorMessage) {
    return (
      <div
        style={
          errorMessage.includes('added') ||
          errorMessage.includes('removed') ||
          errorMessage.includes('success')
            ? styleSuccees
            : styleError
        }
      >
        <div style={textCenter}>{errorMessage}</div>
      </div>
    );
  } else {
    return null;
  }
};
export default Notify;
