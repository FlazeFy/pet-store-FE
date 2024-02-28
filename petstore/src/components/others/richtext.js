import { ucFirstChar } from '@/modules/helpers/converter';
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function GetRichTextEditor({title, val}) {
    const [value, setValue] = useState('');

    return (
        <div className='my-2'>
            <h5 className='text-secondary'>{ucFirstChar(title)}</h5>
            <ReactQuill theme="snow" value={val} onChange={setValue}/>
        </div>
    );
}
