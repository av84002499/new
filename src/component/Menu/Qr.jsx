import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

function YourComponent(props) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                // Generate QR code with the provided URL
                const response = await QRCode.toDataURL(`https://new-sage-nine.vercel.app/Menu/${encodeURIComponent(props.userLogged().userID)}`);
                setImageUrl(response);
            } catch (error) {
                console.log(error);
            }
        };

        generateQRCode();
    }, [props.userLogged]);

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
            {/* Optionally include the provided iframe */}
            <iframe title='ShopQR' id="qrcode" src={`https://api.mimfa.net/qrcode?value=https://new-sage-nine.vercel.app/Menu/${encodeURIComponent(props.userLogged().userID)}&as=value`} width="250" height="250"></iframe>
        </div>
    );
}

export default YourComponent;
