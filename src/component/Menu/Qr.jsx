import React, { useState, useEffect } from 'react';

function YourComponent(props) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                // Fetch the QR code image URL from the API
                const response = await fetch(`https://api.mimfa.net/qrcode?value=https://new-sage-nine.vercel.app/Menu/${encodeURIComponent(props.userLogged().userID)}&as=value`);
                const data = await response.blob();
                const url = window.URL.createObjectURL(data);
                setImageUrl(url);
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
                    <img src={imageUrl} alt="QR Code" width="250" height="250" />
                    {/* Button to download the QR code */}
                    <button onClick={handleDownload}>Download QR Code</button>
                </div>
            )}
        </div>
    );
}

export default YourComponent;
