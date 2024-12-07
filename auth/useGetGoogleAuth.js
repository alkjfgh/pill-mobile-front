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
  const [status, setStatus] = useState(null);

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
          
          const status = userCheck(user.email);
          if(status == 404){
            signUp(user);
          }
          else if(status == 200){
            signIn(user);
          }
          console.log("User Info:", user);
          setUser(user); // 사용자 상태 업데이트
        })
        .catch((error) => {
          console.error("Error during signInWithCredential:", error);
        });
    }
  }, [response]);

  // db에 유저있는지 체크
  const userCheck = async (email) => {
    try {
      const res = await fetch(`http://1.209.148.143:8883/api/users/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // if (!res.ok) {
      //   throw new Error(`HTTP error! status[userCheck]: ${res.status}`);
      // }
  
      const data = await res.json();
      console.log("Response Data[userCheck]:", data);
      setStatus(res.status);
      return res.status
    } catch(error) {
      console.error("Error sending user data[userCheck]:", error.message);
    }
  }

  // 회원가입
  const signUp = async (user) => {
    try {
      const payload = {
        uid: user.uid || "string",
        email: user.email || "string",
        display_name: user.displayName || "string",
        photo_url: user.photoURL || "string",
        stsTokenManager: user.stsTokenManager || {}, // 기본적으로 빈 객체
      };

      const res = await fetch("http://1.209.148.143:8883/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // 서버에 보낼 데이터
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status[signUp]: ${res.status}`);
      }

      const data = await res.json();
      console.log("Response Data[signUp]:", data);
    } catch (error) {
      console.error("Error sending user data[signUp]:", error.message);
    }
  };

  const signIn = async (user) => {
    try {
      const payload = {
        uid: user.uid || "string",
        email: user.email || "string",
        display_name: user.displayName || "string",
        photo_url: user.photoURL || "string",
        stsTokenManager: user.stsTokenManager || {}, // 기본적으로 빈 객체
      };

      const res = await fetch("http://1.209.148.143:8883/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // 서버에 보낼 데이터
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status[signIn]: ${res.status}`);
      }

      const data = await res.json();
      console.log("Response Data[signIn]:", data);
      setStatus(res.status);
    } catch (error) {
      console.error("Error sending user data[signIn]:", error.message);
    }
  };

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

  return { user, request, promptAsync, handleLogout, status }; // 필요한 값과 함수 반환
};

export default useGetGoogleAuth;