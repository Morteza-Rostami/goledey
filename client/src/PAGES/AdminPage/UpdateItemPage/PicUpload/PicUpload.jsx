import React, { useMemo } from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOneItemImg } from '../../../../ACTIONS/productActions';
import { Avatar } from 'rsuite';

const PicUpload = ({ 
  url,
  index,
  photo,
  productId,
  productSlug
}) => {
  // const index = 1;
  const [pic, setPic] = useState({
    inx: '',
    file: {},
  }); 
  const dispatch = useDispatch();

  /* file input selected */
  function handFileSelected(e) {
    const file = e.target.files[0];
    setPic({inx: e.target.id, file: file});
  }
  
  // if: pic.file state changes run
  useEffect(() => {
    // only run if state changes and not initial state value
    if (pic.inx !== '') {
      // convert to formData object
      const formData = new FormData();
      formData.append('slug', productSlug);
      formData.append('index', pic.inx);
      formData.append('file', pic.file);

      dispatch(updateOneItemImg(formData, productId));
    }
  }, [pic.file])


  return (
    <div>
      <label htmlFor={index}>
        <Avatar 
          src={photo}
          style={{
            cursor: 'pointer',
          }}
        />
      </label>
      <input 
        id={index}
        type="file" 
        accept=".png, .jpg, .jpeg"
        name="pic"

        onChange={e => handFileSelected(e)}

        style={{
          display: 'none'
        }}
      />
    </div>
  )
}

export default PicUpload