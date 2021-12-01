import React from 'react';
import './PageHeading.css'

const PageHeading = ({children}) => {
  return (
    <h1 className='common-page-heading'>{children}</h1>
  );
};

export default PageHeading;
