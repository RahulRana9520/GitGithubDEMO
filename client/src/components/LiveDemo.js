import React, { useState } from 'react';
import './LiveDemo.css';

export default function LiveDemo() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/git-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });
      const data = await res.json();
      setOutput(data.output);
    } catch (e) {
      setOutput('Error running command.');
    }
    setLoading(false);
  };

  return (
    <div className="live-demo">
      <h2>⚙️ Live Git Command Demo</h2>
      <input
        type="text"
        value={command}
        onChange={e => setCommand(e.target.value)}
        placeholder="Type a git command (e.g., git status)"
        className="demo-input"
      />
      <button onClick={handleRun} disabled={loading || !command} className="demo-btn">
        {loading ? 'Running...' : 'Run'}
      </button>
      {output && (
        <pre className="demo-output">{output}</pre>
      )}
    </div>
  );
}
