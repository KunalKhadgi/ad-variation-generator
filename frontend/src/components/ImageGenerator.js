import React, { useState } from 'react';
import axios from 'axios';

export default function ImageGenerator() {
  const [form, setForm] = useState({ name: '', description: '', audience: '', ratio: '1:1', tone: '', style: '' });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vote, setVote] = useState(null);
  const [voted, setVoted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const generate = async () => {
    setLoading(true);
    const { data } = await axios.post('http://localhost:5000/generate-images', form);
    setImages(data.images);
    setLoading(false);
    setVoted(false);
  };
  const submitPreference = async () => {
    if (vote === null) return alert('Select your favorite variation');
    await axios.post('http://localhost:5000/submit-preference', { ...form, index: vote });
    setVoted(true);
  };

  return (
    <div>
      <h2>Generate Image Ads</h2>
      <input name="name" placeholder="Product Name" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="audience" placeholder="Target Audience" onChange={handleChange} />
      <select name="ratio" onChange={handleChange}>
        <option>1:1</option>
        <option>16:9</option>
        <option>9:16</option>
      </select>
      <input name="tone" placeholder="Tone (e.g. playful)" onChange={handleChange} />
      <input name="style" placeholder="Style (e.g. minimal)" onChange={handleChange} />
      <button onClick={generate} disabled={loading}>{loading ? 'Generating...' : 'Generate'}</button>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        {images.map((url, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <img src={url} alt="ad" style={{ width: 200 }} />
            {!voted && <div>
              <input type="radio" name="vote" value={i} onChange={()=>setVote(i)} /> Pick
            </div>}
          </div>
        ))}
      </div>
      {images.length > 0 && !voted && <button onClick={submitPreference}>Submit Preference</button>}
      {voted && <p>Thanks for voting!</p>}
    </div>
  );
}