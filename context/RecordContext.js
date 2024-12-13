import React, { createContext, useRef, useState } from "react";

export const RecordContext = createContext();

export const RecordProvider = ({ children }) => {
  const [records, setRecords] = useState([]); // 기록 상태
  const refreshRecords = useRef(null);

  // 서버에서 기록 데이터 가져오기
  const fetchRecordsFromServer = async (email) => {
    try {
      const res = await fetch(`http://1.209.148.143:8883/api/logs/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 500) {
          // 로그가 없는 경우 빈 배열로 처리
          setRecords([]);
          return;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const fetchedRecords = await res.json();
      // logs가 없거나 빈 배열인 경우 처리
      const logs = (fetchedRecords.logs || []).map((record) => ({
        email: record.email,
        image: record.image,
        imageUrl: `http://1.209.148.143:8883/api/logs/image/${record.image}`,
        result: record.result,
        date: record.date,
        description: record.description,
      }));

      setRecords(logs);
    } catch (error) {
      console.error("Error fetching records:", error.message);
      setRecords([]);
    }
  };

  // Refresh function
  refreshRecords.current = async (email) => {
    await fetchRecordsFromServer(email);
  };
  
  const value = {
    records,
    setRecords,
    refreshRecords,  
  };

  return (
    <RecordContext.Provider value={value}>
      {children}
    </RecordContext.Provider>
  );
};