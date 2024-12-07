import { View, Text, Button, SafeAreaView } from "react-native";
import styles from "../style/LoginStyle";
import useGetGoogleAuth from "../auth/useGetGoogleAuth";
import GoogleLoginButton from "../components/GoogleLoginButton";

const LoginScreen = () => {
  const { user, promptAsync, handleLogout, request, status } = useGetGoogleAuth();

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Text>Welcome222, {user.displayName}!</Text>
          <Text>Email: {user.email}</Text>
          <Text>status: {status}</Text>
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