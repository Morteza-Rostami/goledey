import React from "react";
import { useState, useRef } from "react";

//import styled from "styled-components";
// css 
import styles from './Search.module.scss';

// meterial ui
import Paper from "@mui/material/Paper";
import {MdOutlineCancel, MdOutlineSearch} from 'react-icons/md'
import { IconButton, Input, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
// import {IoMdCloseCircleOutline} from 'react-icons/io';

// redux
import { useDispatch } from 'react-redux'; 
// action
import { clearSelectedCats } from "../../../ACTIONS/categoriesActions";
import { addSearchedTerm } from '../../../ACTIONS/searchActions'
import { readProducts, searchProduct } from "../../../ACTIONS/productActions";
import CONST from "../../../CONSTANTS/CONST";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = ({  }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // reference to input:
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  function handleSearchInput(e) {setSearchTerm(e.target.value);}

  function handleClearInput() {
    // clear
    setSearchTerm('');
    // focus input:
    inputRef.current.focus();
  }

  function searchSubmit() {
    console.log(searchTerm);

    // searchParams.set(CONST.TERM, searchTerm);
    // setSearchParams(searchParams);

    if (searchTerm.length && /\S/.test(searchTerm)) {
      navigate({
        pathname: '/shop',
        search: `?term=${searchTerm}&page=1`,
      });

    }

    // clear cats chips
    //dispatch(clearSelectedCats());

    // dispatch: add search term to chips
    //dispatch(addSearchedTerm(searchTerm));

    // dispatch: request: filter products by search term
    //dispatch(searchProduct(1, searchTerm));
    //dispatch(readProducts(1, [], searchTerm));
  }

  // when search button clicked or enter
  const handleSearchIconClicked = 
    () => searchSubmit();

  const handleEnterPressed =
    (e) => e.keyCode === 13 && searchSubmit();

  return (
    <div 
      className={`${styles.search}`}
    >
      {
        searchTerm
          ? (
            <div className={`${styles.close_icon}`}>
              <IconButton
                onClick={handleClearInput}
              >
                <MdOutlineCancel
                  className={`${styles.ico}`}
                />
              </IconButton>
            </div>
          )
          : ''
      }
      <div
        className={`${styles.btn_box}`}
      >
        <IconButton 
          className={`${styles.search_icon}`}
          color={"primary"}
          onClick={handleSearchIconClicked}
        >
          <MdOutlineSearch className={`${styles.ico}`}/>
        </IconButton>
      </div> {/* btn_box */}
      <input 
        className={`${styles.input}`}
        type="text" 
        ref={inputRef}
        value={searchTerm}
        onChange={handleSearchInput}
        onKeyDown={handleEnterPressed}
        placeholder='جستجو'
      />
      
    </div> /* search */
  )
}

export default Search;

