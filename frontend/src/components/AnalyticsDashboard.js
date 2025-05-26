import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AnalyticsDashboard() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get('http://localhost:5000/get-preferences').then(res => setData(res.data));
  }, []);
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>A/B Test Results</h2>
      <table border="1" cellPadding="8">
        <thead><tr><th>Prompt Hash</th><th>Option 1</th><th>Option 2</th><th>Option 3</th></tr></thead>
        <tbody>
          {Object.entries(data).map(([k, v]) => (
            <tr key={k}><td>{k}</td><td>{v[0]||0}</td><td>{v[1]||0}</td><td>{v[2]||0}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}