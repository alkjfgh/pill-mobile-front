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
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const fetchedRecords = await res.json();
      const logs = fetchedRecords.logs.map((record) => ({
        email: record.email,
        image: record.image,
        imageUrl: `http://1.209.148.143:8883/api/logs/image/${record.image}`,
        result: record.result,
        date: record.date,
      }));

      setRecords(logs);
    } catch (error) {
      console.error("Error fetching records:", error.message);
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