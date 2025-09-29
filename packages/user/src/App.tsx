import React, { useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [status, setStatus] = useState<string>("");

  // 서버와 통신하는 함수
  const checkEndpoint = async (prefix: string) => {
    const apiUrl =
      import.meta.env.VITE_API_URL && import.meta.env.VITE_API_PORT
        ? `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`
        : "http://localhost:19080";

    const url = `${apiUrl}/api/${prefix}/health`; // 필요에 따라 URL 수정
    setStatus(`Checking ${prefix}...`);

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setStatus(`${prefix} success ✅`);
      } else {
        setStatus(`${prefix} failed ❌`);
      }
    } catch (error: any) {
      setStatus(`${prefix} error ❌: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Spring Server Test</h1>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => checkEndpoint("core")}>Core</button>
        <button onClick={() => checkEndpoint("user")}>User</button>
        <button onClick={() => checkEndpoint("admin")}>Admin</button>
        <button onClick={() => checkEndpoint("subs")}>Subscription</button>
      </div>
      <div>
        <strong>Status:</strong> {status}
      </div>
    </div>
  );
};

export default App;
