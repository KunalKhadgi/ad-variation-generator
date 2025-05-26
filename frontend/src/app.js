import React from 'react';
import ImageGenerator from './components/ImageGenerator';
import VideoGenerator from './components/VideoGenerator';
import AnalyticsDashboard from './components/AnalyticsDashboard';
export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Ad Variation Generator</h1>
      <ImageGenerator />
      <VideoGenerator />
      <AnalyticsDashboard />
    </div>
  );
}