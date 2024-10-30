import { imageUpload } from '../../services/imageUpload'

export default function ImageUpload(props) {

    async function handleImage(event) {
        try {
            const files = event.target.files

            const images = []

            for(let file of files) {
                const { data } = await imageUpload(file)

                images.push(data.secure_url)
            }

            props.setFormData({...props.formData, [props.fieldName]: images})
        } catch (error) {
            console.log(error);
            console.log('Handle Image isnt working')
        }
    }

    return (
        <div>
            {props.formData.images.map((image) => {
                return <img key={image} src={image} style={{width: '200px'}}/>
            })}
            <input type='file' name='image' multiple onChange={handleImage} />
        </div>
    )
}