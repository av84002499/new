import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';

const Qrcode = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (data !== null) {
      window.open(data, '_blank');
      navigate('/')
      window.location.reload();
    }
  }, [data, navigate]);

  return (
    <div className='container vw-100 d-flex flex-column justify-content-center align-items-center'>
      <div className='container-sm w-50'>
      <h1 className='text-center my-3'>
        Scan QR
      </h1>
      <hr />
          <div className='m-auto border border-3 border-danger rounded bg-dark'>
            <QrReader
              onResult={(result, error) => {
                if (result) {
                  setData(result?.text); // Set scanned data
                }
                if (error) {
                  console.error(error); // Log any errors
                }
              }}
              constraints={{ facingMode: 'environment' }} // Use back camera
              style={{ width: '100%' }}
            />
          </div>
        {/* <h5>Scanned Data: {data}</h5> */}
      </div>
    </div>
  );
};

export default Qrcode;
