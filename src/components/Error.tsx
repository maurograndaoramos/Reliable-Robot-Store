import React from 'react';

interface ErrorPageProps {
  error: string;
}

export default function ErrorPage({ error }: ErrorPageProps): React.ReactElement {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <h1>Something went wrong</h1>
      <p>{error}</p>
      <p>💀</p>
      <p>Please try again later.</p>
    </div>
  );
}