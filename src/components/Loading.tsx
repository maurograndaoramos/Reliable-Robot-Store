//Deprecated
// In the end, I decided (upon suggestion by a third party) to use mostly server-side rendering instead of client-side.

import React from 'react';

export default function LoadingPage(): React.ReactElement {
    return (
        <div className="flex flex-row gap-2 justify-center items-center h-screen">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
    );
}