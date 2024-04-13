import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

function YourComponent(props) { // Added props parameter here
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                const qrData = `https://api.mimfa.net/qrcode?value=https://new-sage-nine.vercel.app/Menu/${encodeURIComponent(props.userLogged().userID)}&as=value`;
                const response = await QRCode.toDataURL(qrData);
                setImageUrl(response);
            } catch (error) {
                console.log(error);
            }
        };

        generateQRCode();
    }, [props]); // Added props to the dependency array

    const handleDownload = () => {
        if (imageUrl) {
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'qrcode.png';
            // Simulate a click on the link to trigger the download
            document.body.appendChild(link);
            link.click();
            // Clean up by removing the link from the DOM
            document.body.removeChild(link);
        }
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
