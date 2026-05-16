import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <p className="text-xs text-gray-500">© 2024 Ethio Buna Restaurant. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-1">
              <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Privacy Policy</button>
              <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
