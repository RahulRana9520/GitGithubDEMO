import React from 'react';
import './Section.css';

export default function Section({ title, icon, content, code, steps }) {
  return (
    <section className="section">
      <h2>{icon} {title}</h2>
      <div className="section-content">
        {content && <p>{content}</p>}
        {steps && (
          <ol>
            {steps.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        )}
        {code && (
          <pre className="code-block">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </section>
  );
}
