
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  shadow: {
    flex: 1,
    // resizeMode: '',
    width: null,
    height: null,
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 100,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
  main: {
    flex: 1,
    marginTop: deviceHeight / 4,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  button: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
  },
  padding: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  title: {
    paddingTop: 20,
    paddingBottom: 20,
    bottom: 0,
    alignSelf: 'center',
    color: '#45CC82',
    fontSize: 30,
    fontFamily: 'futura',
  },
  center: {
    alignSelf: 'center',
  },
  box: {
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 10,
    bottom: 0,
  },
  border: {
    borderWidth: 1,
    borderColor: '#32393D',
    backgroundColor: '#45CC82',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 50,
  },
  search: {
    borderWidth: 1,
    borderColor: '#32393D',
    backgroundColor: '#EBDAC7',
    borderRadius: 50,
  },
  bgColor: {
    backgroundColor: '#32393D',
  },
  card: {
    backgroundColor: '#EBDAC7',
  },
  tenderCard: {
    backgroundColor: '#EBDAC7',
    elevation: 5,
  },
  errorMessage: {
    color: '#EBDAC7',
    fontFamily: 'futura',
    alignSelf: 'center',
    padding: 20,
  },
});
