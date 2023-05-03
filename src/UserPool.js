import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const userPoolData = {
  UserPoolId: process.env.REACT_APP_USERPOOL_ID,
  ClientId: process.env.REACT_APP_CLIENT_ID,
};
const UserPool = new CognitoUserPool(userPoolData);

export const signUp = (email, username, password) => {
  UserPool.signUp(
    username,
    password,
    [
      {
        Name: 'email',
        Value: email,
      },
    ],
    null,
    (err, data) => {
      if (err) console.error(err);
    }
  );
};

export const getSession = async () =>
  await new Promise((resolve, reject) => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (err) {
          reject();
        } else {
          resolve(session);
          // setuser()
          // setsession()
          console.log(session);
        }
      });
    } else {
      reject();
    }
  });

export const getUser = async () =>
  await new Promise((resolve, reject) => {
    const user = UserPool.getCurrentUser();
    if (user) {
      resolve(user);
    } else {
      reject();
    }
  });

export const authenticate = async (username, password) =>
  await new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });
    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        resolve(data);
      },

      onFailure: (err) => {
        console.error('onFailure:', err);
        reject(err);
      },

      newPasswordRequired: (data) => {
        resolve(data);
      },
    });
  });

export const verify = (code, username) => {
  let user = new CognitoUser({ Username: username, Pool: UserPool });

  user.confirmRegistration(code, true, (err, data) => {
    if (err) console.error(err);
  });
};

export const logout = () => {
  const user = UserPool.getCurrentUser();
  if (user) {
    user.signOut();
  }
};

export default UserPool;
