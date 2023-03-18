import { useState } from "react"
import Select from 'react-select'

const Form = () => {

    const [usrInput, setUsrInput] = useState('')
    const [inputType, setInputType] = useState('public')
    const [image, setImage] = useState(null)
    const [isImage, setIsImage] = useState(true)
    
    const typeOptions = [
        {value: 'public', label: 'Public Key'},
        {value: 'private', label: 'Private Key'},
        {value: 'wallet', label: 'Wallet Address'},
        {value: 'image', label: 'Image'}
    ] 

    const handleSubmit = e => {
        e.preventDefault()
        if(inputType != 'image'){
            let request_body = {'type': inputType, 'key': usrInput}
            console.log(request_body)

            fetch('http://localhost:5000/search', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(request_body)
            }).then((response) => {
                response.json().then((body) => {
                    console.log(body)
                })
            }) 
        }
    }

    const handleType = selectedOption => {
        setInputType(selectedOption.value)
        console.log(selectedOption.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Select
                        options={typeOptions}
                        onChange={handleType}
                        required
                        defaultValue={{value: 'public', label: 'Public Key'}}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 10,
                            colors: {
                              ...theme.colors,
                              primary25: '#94C595',
                              primary: 'black',
                            },
                          })}
                    
                    ></Select>
                </div>

                {inputType != 'image' && (
                    <input
                        type="text"
                        required
                        value={usrInput}
                        onChange = {(e) => setUsrInput(e.target.value)}
                    ></input>
                )}

                {inputType == 'image' && (
                    <label className='image-upload-label'>
                    <p>Select Image</p>
                    <input 
                        className='event_img'
                        name='event_img'
                        type='file'
                        onChange = {(e)=>{
                            if(e.target.files[0] && (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg')){
                                setImage(e.target.files[0]);
                                setIsImage(true);
                            }
                            else{
                                setImage(null);
                            }
                        }}
                        accept= 'image/png, image/jpeg'
                    ></input>
                    </label>
                )}

                <button
                    type="submit"
                >Submit</button>
            </form>
        </div>
    );
}
 
export default Form;