
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
    paddingTop: 140,
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
    color: '#b7ba06',
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
    borderWidth: 0,
    borderColor: '#32393D',
    backgroundColor: '#b7ba06',
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
    borderWidth: 1,
    borderBottomColor: '#32393D',
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
  address: {
    fontSize: 10,
  },
  restaurantTitle: {
    color: 'black',
  },
  thumb: {
    backgroundColor: '#32393D',
  },
  thumbPressed: {
    backgroundColor: '#b7ba06',
  },
  oddTitles: {
    paddingTop: 40,
    paddingBottom: 15,
    bottom: 0,
    alignSelf: 'center',
    color: '#b7ba06',
    fontSize: 30,
    fontFamily: 'futura',
  },
  addDish: {
    backgroundColor: '#b7ba06',
  },
});
