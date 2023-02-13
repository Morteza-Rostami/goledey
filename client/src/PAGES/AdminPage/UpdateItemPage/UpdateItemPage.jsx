import React, { useDeferredValue } from 'react'
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from "react-router-dom";

// redux
import { useDispatch, useSelector } from 'react-redux';


//css
import styles from './UpdateItemPage.module.scss';

import LayoutA from '../../../LAYOUTS/LayoutA/LayoutA';
import { readProduct } from '../../../ACTIONS/productActions';
import { readCategories } from '../../../ACTIONS/categoriesActions';

import { 
  Form, 
  ButtonToolbar, 
  Button, 
  Input, 
  InputGroup, 
  InputNumber,
  Checkbox, 
  Uploader

} from 'rsuite';
import { CheckPicker, RadioGroup, Radio } from 'rsuite';
import { useMemo } from 'react';
import { FormControlUnstyledContext } from '@mui/base';
import PicUpload from './PicUpload/PicUpload';

import { updateProduct } from '../../../ACTIONS/productActions';
import MyEditor from '../../../COMPONENTS/Editor/MyEditor';
import { useRef } from 'react';


const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

// only run once
// let firstPhotosSet = true; 


const UpdateItemPage = () => {
  // constants
  const shortDesc = 'shortDesc';
  const longDesc = 'longDesc';
  const tags = 'tags';

  const setCatsOnce = useRef(true);

  const [formD, setFormD] = useState({
    name: '',
    price: 0,
    shortDesc: '',
    longDesc: '',
    tags: [],
    inStock: false,
    hasCardMsg: false,
  });
  const product = useSelector(state => state.productsStore?.product);
  const categories = useSelector(state => state.categoriesStore?.categories);
  const {slug} = useParams(); 
  // categories selected
  const [checkedCats, setCheckedCats] = useState([]);

  const dispatch = useDispatch();

  // handle form submit
  function handSubmit(e) {
    console.log(e)

    console.log(formD)
    console.log(checkedCats)

    const data = {
      ...formD,
      categories: checkedCats,
    }

    // dispatch
    dispatch(updateProduct(data, product?._id));

  }

  // controll form inputs
  function handInputChange(val, e) {
    const name = e.target.name;
    setFormD(c => ({...c, [name]: val}));
  }

  // handle shortDesc
  const setShortDesc = (content) => {
    setFormD(c => ({ ...c, [shortDesc]: content }));
  }
  

  // controll checkbox changed
  function handCheckbox(val, checked, e) {
    const name = e.target.name;
    setFormD(c => ({...c, [name]: !c[name]}));
  }

  // handle categories checkboxes
  function handCatCheckbox(arr) {
    setCheckedCats(arr);
  }

  // run once and get product
  useEffect(() => {
    if (!Object.keys(product).length) 
      dispatch(readProduct(slug));

    if (!categories.length)
      dispatch(readCategories());
  }, []);

  // run when we have product
  useEffect(() => {
    /* check default checkboxes */
    if (Object.keys(product)?.length && setCatsOnce.current) {
      // set checked categories
      setCheckedCats(c => [...product.categories.map(cat => cat._id)]);
      // set other form existing values
      setFormD(c => ({
        name: product.name,
        price: product.price,
        shortDesc: product.shortDesc,
        longDesc: product.longDesc,
        tags: product.tags ? product.tags.split(' ') : [],
        inStock: product.inStock,
        hasCardMsg: product.hasCardMsg,
      }))
      setCatsOnce.current = false;
    }
  }, [product]);

  // run if categories fetched
  const cats = useMemo(() => {
    return categories.map((cat) => {
      return {label: cat.name, value: cat._id}
    })
  }, [categories]);



  return (
    <LayoutA>
      <div
        className={`${styles.item_edit}`}
      >
        <div
          className={`${styles.inner}`}
        >
          <Form 
            onSubmit={(e) => handSubmit(e)}
            fluid
          >

            {/* name */}
            <Form.Group controlId="name-1">
              <Form.ControlLabel>نام کالا</Form.ControlLabel>
              <Form.Control 
                name="name" 
                value={formD.name}
                onChange={(val, e) => handInputChange(val, e)}
                type='text'
              />
              {/* <Form.HelpText>Required</Form.HelpText> */}
            </Form.Group>

            {/* price */}
            <Form.Group controlId="price-1">
              <Form.ControlLabel>قیمت</Form.ControlLabel>
              <Form.Control 
                name="price"
                type="number"
                value={formD.price}
                onChange={(val, e) => handInputChange(val, e)} 
               />
              {/* <Form.HelpText>Required</Form.HelpText> */}
            </Form.Group>

            {/* short discription */}
            <Form.Group controlId="shortDesc-1">
              <Form.ControlLabel>توضیح کوتاه</Form.ControlLabel>
              <MyEditor
                value={formD.shortDesc} 
                setValue={(content) => setShortDesc(content)}
              />
              {/* <Form.Control 
                rows={5} 
                name="shortDesc"
                value={formD.shortDesc}
                onChange={(val, e) => handInputChange(val, e)} 
                accepter={Textarea} 
              /> */}
            </Form.Group>

            {/* inStock */}
            <Form.Group 
              style={{
                display: 'flex',
                gap: '10px'
              }}
              controlId="inStock-1"
            >
              <div
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
              >
                <Form.ControlLabel htmlFor='inStock'>در انبار</Form.ControlLabel>
                <Checkbox 
                  id='inStock' 
                  name='inStock'  
                  value={formD.hasCardMsg}
                  checked={formD.inStock}
                  onChange={(val, checked, e) => handCheckbox(val, checked, e)}
                /> 
              </div>

              <div
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
              >
                <Form.ControlLabel htmlFor='hasCardMsg'>کارت تبریک</Form.ControlLabel>
                <Checkbox 
                  id='hasCardMsg'
                  name='hasCardMsg'
                  value={formD.hasCardMsg}
                  checked={formD.hasCardMsg}
                  onChange={(val, checked, e) => handCheckbox(val, checked, e)}
                /> 
               
              </div>
            </Form.Group>

            {/* hasCardMsg */}
            <Form.Group controlId="hasCardMsg-1">
              
            </Form.Group>
            
            {/* categories */}
            <Form.Group controlId="input-group">
              <Form.ControlLabel>دسته بندیها</Form.ControlLabel>
              <CheckPicker 
                
                placement='topStart'
                value={checkedCats} 
                onChange={handCatCheckbox} 
                data={cats && cats} 
                style={{ width: '100%' }} 

              />
            </Form.Group>

            {/* edit existing images */}
            <Form.Group>
              <Form.ControlLabel>ادیت تصاویر</Form.ControlLabel>
              <span 
                style={{ display: 'flex', gap: '1rem' }}
              >
              {
                product?.pictures
                ? (
                  product.pictures.map((pic, inx) => {
                    return (
                      <PicUpload 
                        index={inx}
                        key={inx}
                        photo={pic}
                        productId={product?._id}
                        productSlug={product?.slug}
                      />
                    )
                  })
                ) : ''
              }
              </span>
            </Form.Group>

            <Form.Group>
              <ButtonToolbar>
                <Button 
                  type='submit'
                  appearance="primary"
                >
                    ارسال
                </Button>
              </ButtonToolbar>
            </Form.Group>
          </Form>
        </div> {/* inner */}
      </div>
    </LayoutA>
  )
}

export default UpdateItemPage