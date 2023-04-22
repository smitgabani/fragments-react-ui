import React, { createContext } from 'react';
import { authenticate, getSession, logout, getUser } from '../../UserPool';

export const AccountContext = createContext();
const Account = (props) => {
  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
        getUser,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default Account;
