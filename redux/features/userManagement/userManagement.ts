import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    getUser: builder.query({
      query: () => {
      return  {
          url: "/user/getMe",
          method: "GET",
         
        }
      }, providesTags: [{ type: 'users' }]


    }),
    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: "/user/update",
          method: "PUT",
          body: data,
        }
      },
      invalidatesTags:["users"],
    }),
    updateRoleUserToSeller: builder.mutation({
      query: () => ({
        url: "/user/userToSeller",
        method: "PUT",
       
      }),invalidatesTags:["users"]
    }),
  
  }),
});
export const {
  useUpdateRoleUserToSellerMutation,
    useUpdateUserMutation,
    useGetUserQuery
} = userManagementApi;
