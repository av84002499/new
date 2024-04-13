import React, { useRef } from 'react';
import QRCode from 'qrcode.react';

function QRCodeComponent() {
  const qrCodeRef = useRef(null);

  const downloadQRCode = () => {
    const canvas = qrCodeRef.current.children[0];
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'QRCode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <QRCode ref={qrCodeRef} value="YourDataHere" />
      <button onClick={downloadQRCode}>Download QR Code</button>
    </div>
  );
}

export default QRCodeComponent;
