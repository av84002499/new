import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

function YourComponent(props) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                const response = await QRCode.toDataURL('https://new-sage-nine.vercel.app/Menu/' + encodeURIComponent(props.userLogged().userID));
                setImageUrl(response);
            } catch (error) {
                console.log(error);
            }
        };

        generateQRCode();
    }, [props]);

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
            <div className="modal fade" id="qrModal" tabIndex="-1" aria-labelledby="qrModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="qrModalLabel">QR Code</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            <img src={imageUrl} alt="QR Code" />
                            <button onClick={handleDownload}>Download QR Code</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YourComponent;
