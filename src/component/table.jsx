import React, { useEffect, useState } from "react";

const ImportLogTable = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch logs
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("http://localhost:8000/importlogs");

        if (!res.ok) {
          throw new Error("Failed to fetch logs");
        }

        const data = await res.json();
        setLogs(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Format date
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString();
  };

  if (loading) return <p>Loading logs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Import Logs</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Source URL</th>
            <th>Total</th>
            <th>Inserted</th>
            <th>Updated</th>
            <th>Duplicates</th>
            <th>Failed</th>
            <th>Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.source}</td>
              <td>{log.totalFetched}</td>
              <td>{log.inserted}</td>
              <td>{log.updated}</td>
              <td>{log.duplicateFailed}</td>
              <td>{log.failed}</td>
              <td>{formatDate(log.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Simple CSS-in-JS
const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    background: "#fff",
    border: "1px solid #ccc",
  },
  th: {
    padding: "12px",
    background: "#f8f8f8",
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
};

export default ImportLogTable;
