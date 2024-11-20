import { View, Text, Button } from "react-native";
import styles from "../style/MainStyle";
import useGetGoogleAuth from "../auth/useGetGoogleAuth";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Main = () => {
  const { user, promptAsync, handleLogout, request } = useGetGoogleAuth();

  return (
    <View style={styles.container}>
      {user ? (
        <View>
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

export default Main;