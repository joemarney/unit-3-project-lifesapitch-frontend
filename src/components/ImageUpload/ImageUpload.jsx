import axios from 'axios'
import {useState} from 'react'

export default function ImageUpload() {
    const [selectedFiles, setSelectedFiles] = useState([])

    function handleFileChange() {
        setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)])
    }

    async function handleUpload() {
        const formData = new FormData()
        selectedFiles.forEach((file) => {
            formData.append('file', file)
        })

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${}/upload`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            
            </div>
    )
}