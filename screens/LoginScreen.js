import { View, Text, Button, Image } from "react-native";
import styles from "../style/LoginStyle";
import useGetGoogleAuth from "../auth/useGetGoogleAuth";
import GoogleLoginButton from "../components/GoogleLoginButton";

const LoginScreen = () => {
  const { user, promptAsync, handleLogout, request } = useGetGoogleAuth();

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.loggedInContainer}>
          <Image source={{ uri: user.photoURL }} style={styles.userPhoto} />
          <Text>Welcome222, {user.displayName}!</Text>
          <Text>Email: {user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <GoogleLoginButton
          // title="login"
          disabled={!request}
          onPress={() => promptAsync({ useProxy: false })}
        />
      )}
      
    </View>
  );
};

export default LoginScreen;