import { useState } from "react"
import Select from 'react-select'

const Form = () => {

    const [usrInput, setUsrInput] = useState('')
    const [inputType, setInputType] = useState('public')
    const [inputTypeLabel, setInputTypeLabel] = useState('Public Key')
    const [image, setImage] = useState(null)
    const [isImage, setIsImage] = useState(true)
    const [error, setError] = useState(false)
    
    const typeOptions = [
        {value: 'public', label: 'Public Key'},
        {value: 'private', label: 'Private Key'},
        {value: 'wallet', label: 'Wallet Address'},
        {value: 'image', label: 'Image'}
    ] 

    const handleSubmit = e => {
        setError(false)
        e.preventDefault()
        if(inputType != 'image'){
            let request_body = {'type': inputType, 'key': usrInput}
            console.log(request_body)

            fetch('http://localhost:5000/search', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(request_body),
                mode:'cors'
            }).then((response) => {
                response.json().then((body) => {
                    console.log(body)
                })
            }) 
        }
        else if(inputType == 'image'){
            if(!image){
                setError(true)
            }

            const formData = new FormData();
            formData.append('image', image);

            fetch('http://localhost:5000/search-img', {
                method: 'POST',
                body: formData,
                mode: 'cors'
            })
        }
    }

    const handleType = selectedOption => {
        setInputType(selectedOption.value)
        setInputTypeLabel(selectedOption.label)
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
                    <div className='image-upload'>
                        <label className='image-upload-label'>
                        <p>Select Image</p>
                        <input 
                            className='input_img'
                            name='input_img'
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
                    </div>
                )}

                <button
                    type="submit"
                >Submit</button>
            </form>

            {error && (<div className="form-error">
                <h3>The entered input is not a valid {inputTypeLabel}!</h3>
            </div>)}
        </div>
    );
}
 
export default Form;