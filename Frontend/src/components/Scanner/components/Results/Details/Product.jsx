import React from 'react';
import SectionWrapper from '../../Shared/SectionWrapper';
import { extractAllData } from '../../../utils';

const Product = ({ jsonData }) => {
  const productData = extractAllData(jsonData).product; 

  if (productData.length === 0) {
    return null;
  }

  return (
    <SectionWrapper>
      {productData.map((item, index) => (
        <p key={index} className="text-gray-200">{item}</p>
      ))}
    </SectionWrapper>
  );
};

export default Product;
