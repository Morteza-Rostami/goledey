import React from "react";
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import LayoutA from "../../../LAYOUTS/LayoutA/LayoutA";
// store.state & store.dispatch
import { useDispatch, useSelector } from "react-redux";
// import actions
import { createProduct } from "../../../ACTIONS/productActions";
import { stringify } from "querystring";
import { readCategories } from '../../../ACTIONS/categoriesActions';

// css 
import styles from './CreateProductPage.module.scss';
import { Button, Checkbox, TagInput, TagPicker } from "rsuite";
import Editor from "../../../COMPONENTS/Editor/MyEditor";
import MyEditor from "../../../COMPONENTS/Editor/MyEditor";
import { FormGroup } from "@mui/material";
import { useMemo } from "react";

const CreateProduct = () => {
  let firstRender = true;
  const shortDesc = 'shortDesc';
  const longDesc = 'longDesc';
  const tags = 'tags';
  // const [images, setImages] = useState([]);
  const [formInputs, setFormInputs] = useState({
    name: '',
    shortDesc: '',
    inStock: true,
    hasCardMsg: false,
    price: '',
    files: [],
    //categories: [],
    tags: [],
  });
  // state of all checkboxes:
  
  // category
  const categories = useSelector(state => state.categoriesStore.categories);
  
  // categories tagPicker
  const [boxChecked, setBoxChecked] = useState([]);

  // reference to DOM file input
  const fileInputRef = useRef(null);

  // const product = useSelector(state => state.productsStore.product);
  const dispatch = useDispatch();

  // handle form submit:
  function handleCreateProduct(e) {
    e.preventDefault();
    let searchTags = '';
    if (formInputs?.tags?.length) {
      searchTags = formInputs.tags.join(' ');
    }
    let formData = new FormData();
    formData.append('name', formInputs.name);
    formData.append('shortDesc', formInputs.shortDesc);
    formData.append('longDesc', formInputs.longDesc);
    formData.append('inStock', formInputs.inStock);
    formData.append('hasCardMsg', formInputs.hasCardMsg);
    formData.append('price', Number(formInputs.price));

    console.log('________________________', formInputs.categories)
    formData.append('categories', boxChecked);
    formData.append('tags', searchTags);
    formInputs.files
      .forEach((file, inx)=> formData.append(`photos[${inx}]`, file) )

    // const value = Object.fromEntries(data.entries());
    formData = Object.fromEntries(formData.entries());
    dispatch(createProduct(formData));

    //clear 
    
    setFormInputs({ 
      name: '',
      shortDesc: '',
      longDesc: '',
      price: '',
      inStock: true,
      hasCardMsg: false,
      files: [],
      tags: []
    });

    // reset file input
    fileInputRef.current.value = '';

    setBoxChecked([]);

    // clear checkbox:
   /*  setBoxChecked(current => {
      return current.map(() => false);
    }); */
    
  }

  function handleChange(e) {
    let value = e.target.value;
    setFormInputs(current => ({ ...current, [e.target.name]: value }));
  }

  // handle categories tag picker
  const handCatPicker = (vl) => {
    console.log(vl);
    setBoxChecked(vl);
  }

  // has csrd msg 
  const handCheckHasCardMsg = 
    () => setFormInputs(c => ({...c, hasCardMsg: !c.hasCardMsg}))

  // handle change value of a checkbox
  /* function handleCheckbox (e, index) {
    setFormInputs(current => {
      const cats = current?.categories ? [...current.categories] : null;

      if (cats) {
        return {...current, categories: [...cats, e.target.value]};
      } else {
        return {...current,  categories: [e.target.value]}
      }
    })

    
    
    // checked and unchecked
    setBoxChecked(current => {
      return current.map((val, inx) => inx === index ? !val : val);
    });
    
  } */

  // handle image input change:
  function handleFileInput(e) {
    setFormInputs(
      current => ({...current, files: [...current.files, e.target.files[0]]}))
  }

  /* get short description from editor */
  const setShortDesc = (content) => {
    setFormInputs(current => ({ ...current, [shortDesc]: content }));
  }

  const setLongDesc = (content) => {
    setFormInputs(current => ({ ...current, [longDesc]: content }));
  }

  // tags
  const setTags = (vl) => {
    setFormInputs(current => ({ ...current, [tags]: vl }));
  }

  // dispatch: to get all categories upon page load:
  useEffect(() => {
    //if (firstRender) 
    dispatch(readCategories());

    // set checked for number of checkboxes
    //firstRender = false;
  }, []);

  // if: categories updated run:
  /* useEffect(() => {
    let arr = [];
    if (categories.length) 
      categories.forEach(() => arr.push(false));
      setBoxChecked(arr);

  }, [categories]); */

  // useEffect(() => {
  //   console.log(boxChecked);
  // }, [boxChecked]);

  // this is categories shown in tag picker:
  const catTags = useMemo(() => {
    if (categories?.length)
      return categories.map((vl, i) => ({ label: vl.name, value: vl.slug, key: i}))
    return [];
  }, [categories]);

  return (


    <LayoutA>
      <div 
        className={`${styles.create_product}`}
      >
      <h2
        style={{textAlign: 'center', fontSize: '14px'}}
      >اضافه کردن محصول
      </h2>
      <div
        className={`${styles.inner}`}

      >
      <Form 
        id="Form"
        className={`${styles.form} form`}
        onSubmit={handleCreateProduct}
      >
        <FormGroup
          className={`${styles.group}`}
        >
          <label htmlFor="name">اسم:</label>
          <input 
            id="name"
            type="text" 
            name="name"  
            value={formInputs.name}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup
        className={`${styles.group}`}
        >
          <label htmlFor="shortDesc">توضیح کوتاه:</label>
          <MyEditor
            value={formInputs.shortDesc} 
            setValue={(content) => setShortDesc(content)}
          />
        </FormGroup>
        {/* <textarea 
          id="shortDesc"
          type="text" 
          name="shortDesc" 
          value={formInputs.shortDesc}
          onChange={handleChange}
        >
        </textarea> */}

        <FormGroup
        className={`${styles.group}`}
        >
          <label htmlFor="hasCardMsg">کارت پستال</label>
          <Checkbox 
            checked={ formInputs.hasCardMsg }
            onChange={handCheckHasCardMsg}
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          > 
          </Checkbox>
        </FormGroup>

        <FormGroup
        className={`${styles.group}`}
        >
          <label htmlFor="longDesc">توضیح بلند:</label>
          <MyEditor
            value={formInputs.longDesc} 
            setValue={(content) => setLongDesc(content)}
          />
        </FormGroup>

        <FormGroup
        className={`${styles.group}`}
        >
          <label htmlFor="longDesc">کلمات جستو جو</label>
          <TagInput 
            style={{ width: '100%' }} 
            value={formInputs.tags}
            onChange={(vl, e) => setTags(vl)}
          />
        </FormGroup>

        <FormGroup
          className={`${styles.group}`}
        >
          <label htmlFor="price">قیمت:</label>
          <input 
            id="price"
            type="number" 
            name="price"  
            value={formInputs.price}
            onChange={handleChange}
          />
        </FormGroup>

        {/* image upload */}
        <FormGroup
          className={`${styles.group}`}
        >
          <label htmlFor="imgsUpload">آپلود تصاویر:</label>
          <input 
            id="imgsUpload"
            className="image-upload"
            type="file" 
            multiple 
            accept="image/*"
            name="imgsUpload" 
            onChange={handleFileInput}
            ref={fileInputRef}
          />
        </FormGroup>

        <div 
          id='uploadedFiles' 
          className="uploaded-files">
            { formInputs.files.length ? 
                formInputs.files.map((file, inx) => <p key={inx}>{ file.name }</p>) : ''}
        </div>
        
        <FormGroup
          className={`${styles.group}`}
        >
          <label htmlFor="">انتخاب دسته بندی:</label>
          <TagPicker 
            data={catTags} 
            value={boxChecked}
            valueKey={'value'}
            onChange={(vl, e) => handCatPicker(vl)}
            style={{ width: '100%' }} 
            placement="topStart"
          />
        </FormGroup>

        {/* <Container >
          {
            categories.length
              ? categories.map((cat, inx) => (
                  <Checkbox 
                    cat={cat} 
                    handleCheckbox={handleCheckbox} 
                    index={inx}
                    boxChecked={boxChecked}
                    key={cat._id} 
                  />
                ))
              : ''
          }
        </Container> */}

        <Button 
        type="submit"
        color="orange"
        >
          اضافه کردن محصول
        </Button>
      </Form>
      </div> {/* inner */}
      </div>
    </LayoutA>
  )
}

export default CreateProduct;

// components:

/* const Checkbox = ({ cat, handleCheckbox, index, boxChecked }) => {

  return (
    <div className="radio-group">
      <input 
        id={index}
        type="checkbox"  
        name="categories" 
        value={cat.slug}
        checked={boxChecked.length ? boxChecked[index] : false}
        onChange={(e) => handleCheckbox(e, index) }
      />
      <label htmlFor={cat._id}>{cat.name}</label><br></br>
    </div>
  )
} */

// ============================================================

// style:

const Container = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 5px;
  width: 600px;
`;
