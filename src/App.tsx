import React, { useState, useRef } from 'react';
import { PdfSender } from './HttpHandler/PdfSender'
import Button from '@mui/material/Button'
import fs from 'fs';

function App() {
  const stringToArrayBuffer = (str: string) => {
    const arrayBuffer = new ArrayBuffer(str.length);
    const arrayBufferView = new Uint8Array(arrayBuffer);

    for (let i = 0; i < str.length; i++) {
      arrayBufferView[i] = str.charCodeAt(i);
    }

    return arrayBuffer;
  }

  const [message, setMessage] = useState("");

  const pdfArrayBuffer =
      stringToArrayBuffer(fs.readFileSync("../public/hand sani msds.pdf", { encoding: 'utf-8' }));

  return (
      <>
          <Button
              onClick={() => {
                  PdfSender({
                      failureResponse: "pdf was not sent",
                      fileBuffer: pdfArrayBuffer,
                      successResponse: "pdf was sent successfully",
                      setMessage: setMessage,
                  });
              }}
          >
              Send PDF
          </Button>

          {message}
      </>
  );
}

export default App;
