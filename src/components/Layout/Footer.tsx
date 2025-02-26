import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{ left: 0, bottom: 0, width: '100%', padding: '1rem', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <p>&copy; {new Date().getFullYear()} Just a mockfooter.</p>
        </footer>
    );
};

export default Footer;