import React from 'react';

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen font_1 mx-5">
      <h1 className="text-4xl font-bold text-[#2092a4] mb-4">Oops!</h1>
      <p className="text-lg text-gray-800 text-center mb-10">We're sorry, but there seems to be a problem. Please try again later.</p>
      <a href="/">
              <span className="text-[#2092a4] font_2 text-5xl font-bold">H</span>
              <span>ome</span>
            </a>
    </div>
  );
}

export default ErrorPage;

