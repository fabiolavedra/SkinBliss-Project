import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import HeaderTwo from '@/layout/headers/header-2';
import ShopBreadcrumb from '@/components/breadcrumb/shop-breadcrumb';
import ShopArea from '@/components/shop/shop-area';
import { useGetAllProductsQuery } from '@/redux/features/productApi';
import ErrorMsg from '@/components/common/error-msg';
import Footer from '@/layout/footers/footer';
import ShopRightArea from '@/components/shop/shop-right-area';
import ShopFilterOffCanvas from '@/components/common/shop-filter-offcanvas';
import ShopLoader from '@/components/loader/shop/shop-loader';

const ShopRightSidebarPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const { data: products, isError, isLoading } = useGetAllProductsQuery();
  const [priceValue, setPriceValue] = useState([0, 0]);
  const [selectValue, setSelectValue] = useState('');
  const [currPage, setCurrPage] = useState(1);
  // Load the maximum price once the products have been loaded
  useEffect(() => {
    if (!isLoading && !isError && products?.length > 0) {
      const maxPrice = products?.reduce((max, product) => {
        return product.price > max ? product.price : max;
      }, 0);
      setPriceValue([0, maxPrice]);
    }
  }, [isLoading, isError, products]);

  // handleChanges
  const handleChanges = (val) => {
    setCurrPage(1);
    setPriceValue(val);
  };

  // selectHandleFilter
  const selectHandleFilter = (e) => {
    setSelectValue(e.value);
  };

  // other props
  const otherProps = {
    priceFilterValues: {
      priceValue,
      handleChanges,
    },
    selectHandleFilter,
    currPage,
    setCurrPage,
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopLoader loading={isLoading} shopRight={true} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && products?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && products?.length > 0) {
    // products
    let product_items = products;
    // select short filtering
    if (selectValue) {
      if (selectValue === 'Default Sorting') {
        product_items = products;
      } else if (selectValue === 'Low to High') {
        product_items = products.slice().sort((a, b) => Number(a.price) - Number(b.price));
      } else if (selectValue === 'High to Low') {
        product_items = products.slice().sort((a, b) => Number(b.price) - Number(a.price));
      } else if (selectValue === 'New Added') {
        product_items = products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (selectValue === 'On Sale') {
        product_items = products.filter((p) => p.discount > 0);
      } else {
        product_items = products;
      }
    }
    // price filter
    product_items = product_items.filter((p) => p.price >= priceValue[0] && p.price <= priceValue[1]);

    // status filter
    if (query.get('status')) {
      if (query.get('status') === 'on-sale') {
        product_items = product_items.filter((p) => p.discount > 0);
      } else if (query.get('status') === 'in-stock') {
        product_items = product_items.filter((p) => p.status === 'in-stock');
      }
    }

    // category filter
    if (query.get('category')) {
      product_items = product_items.filter((p) => p.name.toLowerCase().replace('&', '').split(' ').join('-') === query.get('category'));
    }

    // color filter
    if (query.get('color')) {
      product_items = product_items.filter((product) => {
        for (let i = 0; i < product.imageURLs.length; i++) {
          const color = product.imageURLs[i]?.color;
          if (color && color?.name.toLowerCase().replace('&', '').split(' ').join('-') === query.get('color')) {
            return true; // match found, include product in result
          }
        }
        return false; // no match found, exclude product from result
      });
    }

    // brand filter
    if (query.get('brand')) {
      product_items = product_items.filter((p) => p.brand.name.toLowerCase().replace('&', '').split(' ').join('-') === query.get('brand'));
    }

    content = (
      <>
        <ShopRightArea all_products={products} products={product_items} otherProps={otherProps} right_side={true} />
        <ShopFilterOffCanvas all_products={products} otherProps={otherProps} right_side={true} />
      </>
    );
  }
  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb title="Shop Right Sidebar" subtitle="Shop Right Sidebar" />
      {content}
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ShopRightSidebarPage;
