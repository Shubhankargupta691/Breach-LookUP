import React from "react";
import { tabData } from "../utils";


/**
 * @param {string} InputType - The type of input ('File', 'Hash', or 'IP')
 * @return {Array} Array of tab objects containing id, label, and Component for the selected input type.
 */

export function getTabs(InputType) {
  
  if(typeof InputType !== 'string') {
    throw new Error('Invalid Input Type. InputType must be a string');
  }

  const InputTypesMap={
    'File' : 'FileAndHash',
    'Hash' : 'FileAndHash',
    'IP' : 'IP',
  };


  const type = InputTypesMap[InputType];
  
  if(type && tabData[type]){
    return tabData[type].map(({id, label, Component}) => ({
      id, 
      label, 
      Component,
    }));
  }else{
    throw new Error('Invalid Input Type. InputType must be one of the following: File, Hash, or IP');
  }

}
