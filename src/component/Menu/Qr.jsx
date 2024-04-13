import React, { useRef } from 'react';
import QRCode from 'qrcode.react';

function QRCodeComponent(props) {
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
      <QRCode
        value={`https://api.mimfa.net/qrcode?value=https://new-sage-nine.vercel.app/Menu/${encodeURIComponent(props.userLogged().userID)}&as=value`}
        size={250}
        level={"H"}
        includeMargin={true}
        renderAs={"svg"}
        ref={qrCodeRef}
      />
      <button onClick={downloadQRCode}>Download QR Code</button>
    </div>
  );
}

export default QRCodeComponent;
