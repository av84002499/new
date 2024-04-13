import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

function YourComponent(props) {
    const [imageUrl, setImageUrl] = useState('');
    const [iframeUrl, setIframeUrl] = useState('');

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                const response = await QRCode.toDataURL('your_text_here');
                setImageUrl(response);
            } catch (error) {
                console.log(error);
            }
        };

        generateQRCode();

        // Fetch the iframe URL
        const iframe = document.getElementById('qrcode');
        if (iframe) {
            setIframeUrl(iframe.src);
        }
    }, []);

    const handleDownload = (url, fileName) => {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        // Simulate a click on the link to trigger the download
        document.body.appendChild(link);
        link.click();
        // Clean up by removing the link from the DOM
        document.body.removeChild(link);
    };

    return (
        <div>
            {imageUrl && (
                <div>
                    <img src={imageUrl} alt="QR Code" />
                    <button onClick={() => handleDownload(imageUrl, 'qrcode.png')}>
                        Download QR Code
                    </button>
                </div>
            )}
            {iframeUrl && (
                <div>
                    <iframe title='ShopQR' id="qrcode" src={iframeUrl} width="250" height="250"></iframe>
                    <button onClick={() => handleDownload(iframeUrl, 'iframe_qrcode.png')}>
                        Download Iframe QR Code
                    </button>
                </div>
            )}
        </div>
    );
}

export default YourComponent;
