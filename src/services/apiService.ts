import axios from 'axios';

const BASE_URL = `http://localhost:3001/api/v1`;

type UserLoginData = {
  email: string;
  password: string;
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const loginUser = async ({
  userLoginData,
}: {
  userLoginData: UserLoginData;
}) => {
  try {
    const { status, data } = await axios.post(
      `${BASE_URL}/user/login`,
      userLoginData,
      {
        headers,
      }
    );
    return { data, status };
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async (token: string) => {
  try {
    const { status, data } = await axios.post(
      `${BASE_URL}/user/profile`,
      {},
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log({ status, data });
    return { status, data };
  } catch (error) {
    console.log(error);
  }
};

type UserName = {
  firstName: string;
  lastName: string;
};

export const updateUserName = async (data: UserName, token: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/user/profile`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
