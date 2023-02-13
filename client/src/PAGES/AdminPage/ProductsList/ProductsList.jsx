import React from 'react'

import LayoutA from '../../../LAYOUTS/LayoutA/LayoutA';

// css
import styles from './ProductsList.module.scss';
import 'rsuite/dist/rsuite.min.css';

// rsuite 

import {Avatar, AvatarGroup, Button, ButtonToolbar, IconButton, Input, Stack, Tag} from 'rsuite';

import { Table, Pagination } from 'rsuite';
// import { mockUsers } from './mock';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetItems, deleteProduct } from '../../../ACTIONS/adminActions';
import { flexbox } from '@mui/system';

import { MdOutlineEditCalendar, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const { Column, HeaderCell, Cell } = Table;
// const defaultData = mockUsers(100);

const ProductsList = () => {
  const items = useSelector(state => state.adminStore?.products);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // search products
  //const handSearchTerm = () => setSearchTerm()

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  /* handle deleting a product */
  function handDeleteItem(itemId) {
    //console.log(itemId);
    dispatch(deleteProduct(itemId));
  }

  useEffect(() => {

    if (!items.length) {
      dispatch(adminGetItems());
    }
    
  }, []);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  // run if search term
  useEffect(() => {

    if (items && searchTerm) {
      setFilteredItems(items.filter((item, i) => item.name.includes(searchTerm)));
      setPage(1);
    } else {
      // search term empty
      setFilteredItems(items);
    }
  }, [searchTerm]);
  
  const data = useMemo(() => {
    const data = filteredItems.filter((v, i) => {
      const start = limit * (page - 1);
      const end = start + limit;
      return i >= start && i < end;
    });
    return data;
  }, [filteredItems, page]);

  console.log(items)
  console.log(filteredItems)

  return (
    <LayoutA>
    <div>

      <Stack 
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem',
        width: '100%'
      }}
      spacing={6}>
        جستجو:
        <Input 
          value={searchTerm}
          onChange={setSearchTerm}
        />
        {/* <Button appearance="primary">Submit</Button> */}
      </Stack>
      <Table height={600} data={data}>
        <Column width={100} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="_id" />
        </Column>

        <Column width={300} fixed>
          <HeaderCell>نام محصول</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={100}>
          <HeaderCell>در انبار</HeaderCell>
          <Cell>
            {
              rowData => (
                rowData.inStock ? 'موجود' : 'ناموجود'
              )
            }
          </Cell>
        </Column>

        <Column width={100}>
          <HeaderCell>کارت تبریک</HeaderCell>
          <Cell>
            {
              rowData => (
                rowData.hasCardMsg ? 'دارد' : 'ندارد'
              )
            }
          </Cell>
        </Column>

        <Column width={200}>
          <HeaderCell>قیمت</HeaderCell>
          <Cell dataKey="price" />
        </Column>

        <Column 
          width={300} 
          // flexGrow={1}
          >
          <HeaderCell>دسته بندیها</HeaderCell>
          <Cell
            style={{
              display: 'flex',
              gap: '1rem',
              overflowX: 'scroll'
            }}
          >
            {
              rowData => (
                rowData.categories.map((cat, inx) => 
                <Tag 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={inx}
                >
                  {cat.name}
                </Tag>)
              )
            }
          </Cell>
        </Column>
        <Column 
          width={200}
        >
          <HeaderCell>تصاویر</HeaderCell>

          <Cell
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {
              rowData => {
                return (
                  <AvatarGroup 
                    style={{display: 'flex', gap: '1rem'}}
                  >
                    {
                      rowData.pictures.map((pic, inx) => (<Avatar src={pic} key={inx} size='lg'/>))
                    }
                  </AvatarGroup>
                )
              }
            }
             
          </Cell>  

        </Column>
        <Column 
          width={200}
          flexGrow={1}
        >
          <HeaderCell>عملیاتها</HeaderCell>
          {/* navigate(`/admin/update/product/${rowData._id}`) */}
          <Cell>
            {
              rowData => (
                <ButtonToolbar>
                  <IconButton 
                  style={{padding: 5, display: 'grid', alignContent: 'center'}}
                  onClick={() => window.open(`/admin/edit/product/${rowData.slug}`,'_blank')}>
                    <MdOutlineEditCalendar/>
                  </IconButton>
                  <IconButton 
                  style={{padding: 5, display: 'grid', alignContent: 'center'}}
                  onClick={() => handDeleteItem(rowData._id)}>
                    <MdDelete/>
                  </IconButton>
                </ButtonToolbar>
              )
            }
          </Cell>
        </Column>

      </Table>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={['total', '-', 'limit', '|', 'pager', 'skip']}
          total={items.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </div>
    </LayoutA>
  );
};


export default ProductsList;