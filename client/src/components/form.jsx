import { useState } from "react"
import Select from 'react-select'

const Form = () => {

    const [usrInput, setUsrInput] = useState('')
    const [inputType, setInputType] = useState('public')
    const [inputTypeLabel, setInputTypeLabel] = useState('Public Key')
    const [image, setImage] = useState(null)
    const [imageType, setImageType] = useState('qr')
    const [error, setError] = useState(false)
    
    const typeOptions = [
        {value: 'public', label: 'Public Key'},
        {value: 'private', label: 'Private Key'},
        {value: 'wallet', label: 'Wallet Address'},
        {value: 'image', label: 'Image'}
    ] 

    const imageOptions = [
        {value: 'qr', label: 'QR Code'},
        {value: 'steg', label: 'Steg Decoder'}
    ]

    const handleSubmit = e => {
        setError(false)
        e.preventDefault()
        
        let request_body = {'type': inputType, 'key': usrInput}

        fetch('http://localhost:5000/search', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(request_body),
            mode: 'cors'
        }).then((response) => {
            response.json().then((body) => {
                console.log(body)
            })
        }) 
    }

    const handleImage = (e) => {
        e.preventDefault()
        setError(false)

        if(!image){
            setError(true)
        }

        fetch('http://api.qrserver.com/v1/read-qr-code/', {
            method:'POST', 
            body: new FormData(e.target)}
        ).then((response) => {
            response.json().then((body) => {
                let output = body[0].symbol[0].data.split(':')
                let request_body = {'type': 'image', 'key' :output[1], 'currency': output[0]}
                console.log(request_body)
                fetch('http://localhost:5000/search', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(request_body),
                    mode: 'cors'
                }).then((response) => {
                    response.json().then((body) => {
                        console.log(body)
                    })
                }) 
            })
        })
    }

    const handleType = selectedOption => {
        setInputType(selectedOption.value)
        setInputTypeLabel(selectedOption.label)
    }

    return (
        <div>
            <form onSubmit={inputType == 'image' ? handleImage : handleSubmit} encType={inputType == 'image' ? 'multipart/form-data' : 'application/x-www-form-urlencoded'}>
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
                    <div className="form-image">
                        <div>
                        <Select
                            options={imageOptions}
                            onChange={handleType}
                            required
                            defaultValue={{value: 'qr', label: 'QR Code'}}
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
                        <div className='image-upload'>
                            <label className='image-upload-label'>
                            <p>Select Image</p>
                            <input 
                                name='file'
                                type='file'
                                onChange = {(e)=>{
                                    if(e.target.files[0] && (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg')){
                                        setImage(e.target.files[0]);
                                    }
                                    else{
                                        setImage(null);
                                    }
                                }}
                                accept= 'image/png, image/jpeg'
                            ></input>
                            </label>
                        </div>
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

