import { imageUpload } from '../../services/imageUpload'
import styles from '../../pages/Campsites/AddCampsite/AddCampsite.module.scss'


export default function ImageUpload(props) {

    async function handleImage(event) {
        props.setImageUp(true)
        try {
            const files = event.target.files

            const images = []

            for(let file of files) {
                const { data } = await imageUpload(file)

                images.push(data.secure_url)
            }

            props.setFormData({...props.formData, [props.fieldName]: images})
            props.setImageUp(false)
        } catch (error) {
            console.log(error);
            console.log('Handle Image isnt working')
        }
    }

    return (
        <div className={styles.image}>
            {props.formData.images.map((image) => {
                return <img key={image} src={image} style={{width: '200px'}}/>
            })}
            <input type='file' name='image' multiple onChange={handleImage} />
        </div>
    )
}