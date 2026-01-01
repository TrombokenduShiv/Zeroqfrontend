import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react'; // npm install qrcode.react
import axios from 'axios';

interface Props {
  queueId: string;
  backendUrl: string;
  authToken: string;
}

const OrgQRGenerator: React.FC<Props> = ({ queueId, backendUrl, authToken }) => {
  const [qrToken, setQrToken] = useState<string>('');

  const refreshQR = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/checkin/generate-qr`,
        { queueId },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setQrToken(data.qrToken);
    } catch (err) {
      console.error("Failed to generate QR");
    }
  };

  // Refresh every 30 seconds
  useEffect(() => {
    refreshQR();
    const interval = setInterval(refreshQR, 30000);
    return () => clearInterval(interval);
  }, [queueId]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Scan to Check-In</h3>
      {qrToken ? (
        <QRCodeSVG 
          value={JSON.stringify({ queueId, token: qrToken })} 
          size={256} 
          level={"H"}
        />
      ) : (
        <div className="animate-pulse w-64 h-64 bg-gray-200 rounded"/>
      )}
      <p className="mt-4 text-sm text-gray-500">Refreshes automatically every 30s</p>
    </div>
  );
};

export default OrgQRGenerator;