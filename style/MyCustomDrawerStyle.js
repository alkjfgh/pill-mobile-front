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
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    marginHorizontal: 20,
    marginTop: 10,
  },
  footerContainer: {
    padding: 20, 
    borderTopWidth: 1, 
    borderTopColor: '#cccccc'
  },
  menuItemContainer: {
      flexDirection: 'row', 
      alignItems: 'center', 
      paddingVertical: 15
  },
  menuItemText: {
      color: 'gray', 
      fontSize: 15, 
      marginLeft: 5
  },
});

export default MyCustomDrawerStyle;