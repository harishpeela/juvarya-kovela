import React, {useState} from 'react';
import {allTexts} from '../../common';
import ApplicationContext from './Context';

const ContextProvider = ({children}) => {
  const [frequentCategoryList, setFrequentCategoryList] = useState([]);
  const [loginDetails, setLoginDetails] = useState(null);

  return (
    <ApplicationContext.Provider
      value={{
        frequentCategoryList,
        setFrequentCategoryList,
        loginDetails,
        setLoginDetails,
      }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ContextProvider;
