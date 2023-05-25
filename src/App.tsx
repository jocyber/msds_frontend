import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const server = 'http://localhost:9988/pdf';

function App() {
    const [isSent, setIsSent] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const inputFile = useRef<HTMLInputElement | null>(null);

    const onSubmit = () => {
        const actualFiles = inputFile.current?.files;
        let filesArr = [];

        console.log(inputFile.current?.files);

        if (actualFiles !== undefined) {
            for (let i = 0; i < actualFiles!.length; i++) {
                filesArr.push(actualFiles![i]);
            }
        }

        setFiles(filesArr);
    };

    useEffect(() => {
        const controller = new AbortController();
        setIsSent(false);

        console.log(files.length);

        if (files.length > 0) {
            const reader = new FileReader();
            console.log(files[0]);
            reader.readAsDataURL(files[0]);

            reader.onload = () => {
                console.log(reader.result);

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
        }

        return () => controller.abort();
    }, [files]);

    return (
        <>
            <form>
                <fieldset>
                    <label>
                        <p>Submit an MSDS pdf</p>
                        <input name="name" type='file' id='file' ref={inputFile}/>
                    </label>
                </fieldset>
                <button type="button" onClick={onSubmit}>Submit</button>
            </form>
            {isSent &&
                `\n{ ${inputFile} } has been sent to the server.\n`}
        </>
    );
}
export default App;
