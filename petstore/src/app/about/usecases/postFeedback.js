import React, { useEffect, useState } from "react"
import Axios from 'axios'
import GetFormTemplate from "@/components/containers/form"
import GetBreakLine from "@/components/others/breakLine"

// Components

export default function PostFeedback({ctx}) {
    //Initial variable
    const [feedbackRate, setFeedbackRate] = useState(0)
    const [feedbackDesc, setFeedbackDesc] = useState("")

    const [resMsgFeedbackRate, setResMsgFeedbackRate] = useState("")
    const [resMsgFeedbackDesc, setResMsgFeedbackDesc] = useState("")
    const [resMsgAll, setResMsgAll] = useState("")

    const builder = [
        {
            type: 'range',
            class: 'form-control',
            label: 'Rate',
            placeholder: 'Choose feedback rate',
            is_required: true,
            max: 10,
            min: 1,
            handleChange: (event) => {
                setFeedbackRate(event.target.value)
            },
            errorMsg: resMsgFeedbackRate
        },
        {
            type: 'textarea',
            class: 'form-control',
            label: 'Description',
            placeholder: 'Type feedback description',
            is_required: true,
            is_obsecure: false,
            line: 4,
            maxLength: 500,
            handleChange: (event) => {
                setFeedbackDesc(event.target.value)
            },
            errorMsg: resMsgFeedbackDesc
        },
        {
            type: 'submit',
            class: 'btn btn-success rounded-pill',
            label: 'Submit',
            placeholder: null,
            toogle_disabled: false,
            handleClick: (event) => {
                handleSubmit(event)
            },
            errorMsg: resMsgAll
        }
    ]

    // Services
    const handleSubmit = async (e) => {
        try {
            const data = new FormData();
            data.append('feedbacks_rate', feedbackRate);
            data.append('feedbacks_desc', feedbackDesc);
            
            const response = await Axios.post("http://127.0.0.1:1323/api/v1/feedbacks", data, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            window.location.reload(false)

            if(response.data.status != 200){
                return response.data.message
            } else {
                return ""
            }
        } catch (error) {
            setResMsgAll(error)
        }
    }

    return (
        <>
            <GetBreakLine length={3}/>
            <div className='mt-4 text-center row' id={ctx}>
                <div className='col-lgl-6 col-md-6 col-sm-12'>
                    <GetBreakLine length={5}/>
                    <h1 style={{fontSize:"var(--textXJumbo)"}}>SEND FEEDBACK</h1>
                    <GetBreakLine length={1}/>
                    <h6 className="text-white" style={{fontSize:"var(--textJumbo)"}}>This app is still at development, so your feedback will be very helpfull</h6>
                </div> 
                <div className='col-lgl-6 col-md-6 col-sm-12'>
                    <GetBreakLine length={3}/>
                    <div className='container-form'>
                        <GetFormTemplate type={"single-line"} props={builder} />
                    </div>
                </div> 
            </div>
            <GetBreakLine length={5}/>
        </>
    )
}