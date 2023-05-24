    import React, { useState, useRef} from 'react';
    import Button from '@mui/material/Button'
    import axios from 'axios';

    function App() {
        const server = 'http://localhost:9988/pdf';
        const inputFile = useRef<HTMLInputElement | null>(null);
    
        const onButtonClick = () => {
            // `current` points to the mounted file input element
            inputFile.current!.click();
        };


    return (
        <>
            <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
            <button onClick={onButtonClick}>Open file upload window</button>
            <Button
              onClick={() => {
                try {
                    const files = inputFile.current!.files;
                    if (files!.length > 0) {
                        for (let i = 0; i < files!.length; ++i) {
                            const file = files![i];
                            if (file.type === 'application/pdf') {
                                getBase64(server, file);
                            }
                        }
                        
                    }
                } catch (e) {
                    console.log(e);
                }

              }}>
              Send PDF
          </Button>
        </>
    );
    }

    function getBase64(server: string, file: Blob): void {        
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            axios.post(server, {base64: reader.result});
        };
        reader.onerror = function (error) {
            console.log(error);
        };
     }     

    export default App;
