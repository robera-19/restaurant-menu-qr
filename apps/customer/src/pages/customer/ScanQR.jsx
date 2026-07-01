import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

const ScanQR = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      fps: 10,
      qrbox: 250,
    });

    let scanned = false;

    scanner.render(
      (decodedText) => {
        if (scanned) return;
        scanned = true;

        scanner.clear();

        const url = new URL(decodedText);
        const shortId = url.pathname.split('/').pop();

        navigate(`/menu/qr/${shortId}`);
      },
      (error) => {},
    );
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Scan QR</h2>
      <div id="reader"></div>
    </div>
  );
};

export default ScanQR;
