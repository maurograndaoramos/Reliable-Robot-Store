import React from 'react';

export default function ErrorPage(): React.ReactElement {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h1>Something went wrong</h1>
            <p>Please try again later.</p>
        </div>
    );
}