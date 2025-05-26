import React, { useState } from 'react';
import axios from 'axios';

export default function VideoGenerator() {
  const [form, setForm] = useState({ name: '', description: '', audience: '', tone: '', style: '', length: 10 });
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const generate = async () => {
    setLoading(true);
    const { data } = await axios.post('http://localhost:5000/generate-video', form);
    setVideoUrl(data.video);
    setLoading(false);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Generate Video Ad</h2>
      <input name="name" placeholder="Product Name" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="audience" placeholder="Target Audience" onChange={handleChange} />
      <input name="tone" placeholder="Tone (e.g. dynamic)" onChange={handleChange} />
      <input name="style" placeholder="Style (e.g. cinematic)" onChange={handleChange} />
      <input name="length" type="number" min="5" max="15" onChange={handleChange} />
      <button onClick={generate} disabled={loading}>{loading ? 'Generating...' : 'Generate Video'}</button>
      {videoUrl && (
        <div style={{ marginTop: '1rem' }}>
          <video src={videoUrl} controls width={400} />
          <a href={videoUrl} download>Download Video</a>
        </div>
      )}
    </div>
  );
}