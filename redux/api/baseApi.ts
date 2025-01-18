
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/",
  baseUrl: "https://electon-server-three.vercel.app/",
  //below the line set the cookies on browser
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken:BaseQueryFn<FetchArgs,BaseQueryApi,DefinitionType> = async (arg, api,extraOptions
):Promise<any> => {
  let result:any = await baseQuery(arg, api, extraOptions);

  if (result?.error?.status === 404) {
    toast.error(result?.error?.data.massage)
   }

  if (result?.error?.status === 401) {
    // const res = await fetch("http://localhost:5000/auth/refresh-token", {
    const res = await fetch("https://electon-server-three.vercel.app/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setUser({
          user: user,
          token: data.data.accessToken,
        })
      );
      result = await baseQuery(arg, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes:["auth2","products","users","bookings","payments","subscribe","offers"],
  endpoints: () => ({}),
});
