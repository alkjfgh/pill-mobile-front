import { StyleSheet, Dimensions } from "react-native";

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  loginContainer: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  loggedInContainer: {
    width: "90%",
    height: "70%",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333333",
    letterSpacing: 1,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666666",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 25,
  },
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#f0f0f0",
  },
  userInfo: {
    marginTop: 15,
  },
  userInfoTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666666",
  },
  userInfoText: {
    fontSize: 22,
    marginBottom: 20,
    color: "black",
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    // width: "90%",
  },
  buttonText: {
    fontSize: 14,
    color: "#333",
  },
  deleteButton: {
    // marginTop: 'auto',
    marginTop: 20,
    marginBottom: 20,   
    backgroundColor: '#000',  
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',  
  },
});

export default LoginStyle;

