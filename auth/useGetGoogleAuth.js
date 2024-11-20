import { useEffect, useState } from "react";
import { signInWithCredential, GoogleAuthProvider, signOut } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { auth } from "../firebaseConfig";
// import api from "../api";
// import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

const useGetGoogleAuth = () => {
  const [user, setUser] = useState(null);
  // const [res, setRes] = useState(null);

  // Google 인증 요청 초기화
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "224490414807-j4p0q498a68abg5lrch2q3es80j1nc6b.apps.googleusercontent.com",
    androidClientId: "224490414807-0sarci38gg865dc2m0o2a7aj41vobi3m.apps.googleusercontent.com",
  });

  // 로그인 처리
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then((userCredential) => {
          const user = userCredential.user; // 사용자 정보 가져오기
          // try{
          //   const res = api.post("/api/users", user)
          //   .then((response) => {
          //     console.log("Response:", response.data);
          //   })
          //   .catch((error) => {
          //     console.error("Error:", error);
          //   });
          //   setRes(res);
            // const res = axios.post("https://1.209.148.143:8443/api/users", user);
            // const res2 = axios.get("https://1.209.148.143:8443/api/users/1");
            // console.log("res : " + JSON.stringify(res));
            // console.log("res2 : " + JSON.stringify(res2));
          // } catch(error){
          //   console.error(error);
          // }
          console.log("User Info:", user);
          setUser(user); // 사용자 상태 업데이트
        })
        .catch((error) => {
          console.error("Error during signInWithCredential:", error);
        });
    }
  }, [response]);

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase에서 로그아웃
      setUser(null); // 사용자 상태 초기화
      console.log("User signed out.");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return { user, request, promptAsync, handleLogout }; // 필요한 값과 함수 반환
};

export default useGetGoogleAuth;