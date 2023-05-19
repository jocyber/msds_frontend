import React, { useEffect } from 'react'
import axios from "axios"

const backendUrl = "http://10.144.8.77:9988";

interface Props {
    fileBuffer: ArrayBuffer;
    setMessage: (message: string) => void;
    successResponse: string;
    failureResponse: string;
}

export const PdfSender = ({ fileBuffer, setMessage, successResponse, failureResponse }: Props) => {
    useEffect(() => {
        axios.post<{ byteArray: string }>(backendUrl, { pdfContent: atob(fileBuffer?.toString()) })
            .then(() => setMessage(successResponse))
            .catch(() => setMessage(failureResponse));
    });
};