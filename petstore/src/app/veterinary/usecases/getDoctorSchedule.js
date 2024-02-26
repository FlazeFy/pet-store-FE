import GetMsgText from '@/components/messages/msg_text'
import React from 'react'
import { useState, useEffect } from "react"

// Modules
import { getLocal } from '../../../modules/storages/local'

export default function GetDoctorSchedule({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/doctor/schedule`)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItems(result.data)        
            },
            (error) => {
                if(getLocal(ctx + "_sess") !== undefined){
                    setIsLoaded(true)
                    setItems(JSON.parse(getLocal(ctx + "_sess")))
                } else {
                    setIsLoaded(true)
                    setError(error)
                }
            }
        )
    },[])

    function getReadyColor(val){
        if(val == 1){
            return 'bg-success'
        } else {
            return 'bg-danger text-white'
        }
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const hour = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00']

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Day / Time</th>
                            {
                                days.map((data, i, idx) => {
                                    return <th scope="col">{data}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items != null ?
                                hour.map((hr, i, idx) => {
                                    let totalItem = 0
                                    return <tr>
                                        <th scope="row">{hr}</th>
                                        {
                                            days.map((dy, j, jdx) => {
                                                return <>
                                                {
                                                    items.map((item, k, kdx) => {
                                                        if(item['schedule_hour'] == hr && item['schedule_day'] == dy){
                                                            totalItem++
                                                            return <>
                                                                <td><button className={'btn '+getReadyColor(item['is_ready'])} title='Book at this schedule'>{item['doctors_name']}</button></td>
                                                            </>
                                                        } else {
                                                            return <td>-</td>
                                                        }
                                                    })
                                                }
                                                </>
                                            })

                                        }
                                    </tr>
                                })
                            :
                                <GetMsgText ctx="No Data Found" url={'/assets/no_data.png'}/>
                        }
                        
                    </tbody>
                </table>
            </>
        )
    }
}
  