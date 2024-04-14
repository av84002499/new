import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

function YourComponent() {
    const [imageUrl, setImageUrl] = useState('');

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
    }, []);

    const handleDownload = () => {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'qrcode.png';
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
                    <button onClick={handleDownload}>Download QR Code</button>
                </div>
            )}
        </div>
    );
}

export default YourComponent;
