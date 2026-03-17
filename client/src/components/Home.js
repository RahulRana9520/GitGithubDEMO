import React from 'react';
import './Home.css';

import Section from './Section';
import sections from '../data/sections';
import LiveDemo from './LiveDemo';

export default function Home() {
  return (
    <div className="main-container">
      <header className="header">
        <h1>🚀 Git & GitHub Mastery</h1>
        <p>Learn version control, collaboration, and pro tips with interactive guides and live demos!</p>
      </header>
      <LiveDemo />
      {sections.map((section, idx) => (
        <Section key={idx} {...section} />
      ))}
    </div>
  );
}
