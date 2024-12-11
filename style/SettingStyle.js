import { StyleSheet } from "react-native";

const SettingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: "#333",
  },
  deleteButton: {
    marginTop: 'auto',  
    marginBottom: 20,   
    backgroundColor: 'red',  
  },
  
  deleteButtonText: {
    color: '#fff',  
  },
});

export default SettingStyle;

