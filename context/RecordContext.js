import React, { createContext, useState } from "react";

export const RecordContext = createContext();

export const RecordProvider = ({ children }) => {
  const [records, setRecords] = useState([]); // 기록 상태

  const addRecord = (newRecord) => {
    setRecords([newRecord, ...records]); // 새로운 기록 추가
  };

  return (
    <RecordContext.Provider value={{ records, addRecord, setRecords }}>
      {children}
    </RecordContext.Provider>
  );
};