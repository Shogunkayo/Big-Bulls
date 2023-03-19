import { useEffect } from "react"
import { useState } from "react"
import Select from 'react-select'
import ProgressBar from "./progressBar"
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../redux/inputSlice";
import { store } from '../redux/store';

const Form = ({colors}) => {

    const navigate = useNavigate()
    const {data} = useSelector(state => state.data)
    const dispatch = useDispatch()

    const [usrInput, setUsrInput] = useState('')
    const [inputType, setInputType] = useState('public')
    const [inputTypeLabel, setInputTypeLabel] = useState('Public Key')
    const [image, setImage] = useState(null)
    const [imageType, setImageType] = useState('qr')
    const [submitted, setSubmitted] = useState(false)
    const [progress, setProgress] = useState({})
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

    const progressOptions = [
        {value: 0, label: 'Collecting Input'},
        {value: 25, label: 'Extracting from Image'},
        {value: 50, label: 'Fetching from APIs'},
        {value: 100, label: 'Displaying Data'}
    ]

    const handleSubmit = e => {
        setSubmitted(progressOptions[0])
        setError(false)
        e.preventDefault()
        
        let request_body = {'type': inputType, 'key': usrInput}

        setSubmitted(progressOptions[2])
        fetch('http://localhost:5000/search', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(request_body),
            mode: 'cors'
        }).then((response) => {
            setSubmitted(progressOptions[3])
            response.json().then((body) => {
                let output_array = body.wallet
                    let parsed_output = {
                            'wallet' :  [],
                            'currencies' : [],
                            'hashes':{}
                        }

                        for(let i=0; i < output_array.length; i++) {
                            parsed_output.currencies.push(output_array[i].name)
                            parsed_output.wallet.push(output_array[i].wal_addr)
                            parsed_output.hashes[output_array[i].name] =output_array[i].transactions
                        }
                        console.log(parsed_output)
                dispatch(setData(parsed_output))
                setSubmitted({})
                console.log(store.getState().data)
                navigate('/dashboard')
            })
        }) 
    }

    const handleImage = (e) => {
        e.preventDefault()
        setSubmitted(progressOptions[0])
        setError(false)

        if(!image){
            setError(true)
        }

        setSubmitted(progressOptions[1])
        fetch('http://api.qrserver.com/v1/read-qr-code/', {
            method:'POST', 
            body: new FormData(e.target)}
        ).then((response) => {
            response.json().then((body) => {
                let output = body[0].symbol[0].data.split(':')
                let request_body = {'type': 'image', 'key' :output[1], 'currency': output[0]}
                console.log(request_body)
                let parsed_output = {
                    'wallet' :  [request_body.key],
                    'currencies' : [request_body.currency]
                }
                console.log(parsed_output)
                        dispatch(setData(parsed_output))
                        setSubmitted({})
                        navigate('/dashboard')
                setSubmitted(progressOptions[2])
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
                              primary25: colors[0],
                              primary: colors[1],
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
                                primary25: colors[0],
                                primary: colors[1],
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

