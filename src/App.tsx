import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const server = 'http://localhost:9988/pdf';

function App() {
    const [isSent, setIsSent] = useState(false);
    const [filePath, setFilePath] = useState("");
    const inputFile = useRef<HTMLInputElement | null>(null);

    const onSubmit = () => {
        const file = inputFile.current?.value;

        if (file !== undefined) {
            setFilePath(file);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        setIsSent(false);

        const reader = new FileReader();
        reader.readAsDataURL(new Blob([JSON.stringify({ fileName: filePath }, null, 2)],
            { type: "application/pdf", }));

        reader.onload = () => {
            axios.post(server, { base64: reader.result }, { signal: controller.signal })
                .then(response => {
                    setIsSent(true);
                })
                .catch(err => {
                    console.log(err.message);
                });
        };

        reader.onerror = () => {
            console.log(reader.error);
        }

        return () => controller.abort();
    }, [inputFile]);

    return (
        <>
            <form>
                <fieldset>
                    <label>
                        <p>Submit an MSDS pdf</p>
                        <input name="name" type='file' id='file' ref={inputFile}/>
                    </label>
                </fieldset>
                <button type="submit" onClick={onSubmit}>Submit</button>
            </form>

            {isSent &&
                `\n{ ${inputFile} } has been sent to the server.\n`}
        </>
    );
}

export default App;


