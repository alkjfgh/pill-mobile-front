import { StyleSheet } from 'react-native';

const MyCustomDrawerStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultPictureContainer: {
    justifyContent:'center', 
    alignItems: 'center', 
    paddingTop: "10%",
    paddingLeft: "1%",
    textAlign: 'center',
  },
  profilePictureContainer: {
    justifyContent:'flex-start', 
    alignItems: 'flex-start', 
    justifyContent:'center', 
    alignItems: 'center', 
    paddingTop: "12%",
  },
  profilePictureView: { 
    borderWidth: 0, 
    justifyContent:'center', 
    alignItems: 'center', 
  },
  defaultPicture:{
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginBottom: 10,
  },
  profilePictureText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileTextView: {
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
    justifyContent:'center', 
    alignItems: 'center', 
    paddingTop: 10, 
    // paddingLeft: "8%",
  },
  profileText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  profileTextEmail:{
    fontSize: 16,
    color: '#000000',
  },
  defaultProfileTextView: {
    justifyContent:'center', 
    alignItems: 'center', 
    paddingTop: 15,
  },
  defaultProfileText: {
    fontSize: 15,
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