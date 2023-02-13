import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const MyEditor = ({
  value,
  setValue
}) => {
  //const [value, setValue] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }], // this is rtl support
      [{ 'align': 'right' }]
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
    <>
    <ReactQuill 
      theme="snow" 
      value={value} 
      onChange={setValue} 
      modules={modules}
      formats={formats}
    />
    
    </>
  )
  
 
}

export default MyEditor