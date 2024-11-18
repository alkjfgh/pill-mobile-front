import { View, Text, Button } from "react-native";
import styles from "../style/MainStyle";
import useGetGoogleAuth from "../auth/useGetGoogleAuth";

const Main = () => {
  const { user, promptAsync, handleLogout, request } = useGetGoogleAuth();

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Text>Welcome, {user.displayName}!</Text>
          <Text>Email: {user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <Button
          title="Login with Google"
          disabled={!request}
          onPress={() => promptAsync({ useProxy: false })}
        />
      )}
    </View>
  );
};

export default Main;