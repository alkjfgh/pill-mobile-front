import { StyleSheet } from 'react-native';

const MyCustomDrawerStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultPictureContainer: {
    justifyContent:'flex-start', 
    alignItems: 'flex-start', 
    paddingTop: "10%",
    paddingLeft: "1%",
  },
  profilePictureContainer: {
    justifyContent:'flex-start', 
    alignItems: 'flex-start', 
    paddingTop: "12%",
    paddingLeft: "5%",
  },
  profilePictureView: {
    borderColor: '#fff', 
    borderWidth: 0, 
    borderRadius: 43,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  profileTextView: {
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
    paddingTop: 10, 
    paddingLeft: "8%",
  },
  profileText: {
    fontSize: 14,
    color: '#000000',
  }
});

export default MyCustomDrawerStyle;