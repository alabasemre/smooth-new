import { apiSlice } from './apiSlice';

export const teamApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTeam: builder.mutation({
            query: (data) => ({
                url: `/api/team`,
                method: 'POST',
                body: data.body,
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            invalidatesTags: (result, error) => {
                return [{ type: 'Teams', id: 'AllMine' }];
            },
        }),
        addUserToTeam: builder.mutation({
            query: (data) => ({
                url: `/api/team/addUser`,
                method: 'POST',
                body: data.body,
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            invalidatesTags: (result, error, data) => {
                return [{ type: 'Teams', id: data.body.teamId }];
            },
        }),
        getTeamsUsers: builder.query({
            query: (data) => ({
                url: `/api/team/${data.teamId}/getUsers`,
                method: 'GET',
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            providesTags: (result, error, data) => {
                return [{ type: 'Teams', id: data.teamId }];
            },
        }),
        getUsersTeams: builder.query({
            query: (token) => ({
                url: `/api/team/getUsersTeams`,
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: (result, error) => {
                return [{ type: 'Teams', id: 'AllMine' }];
            },
        }),
        getUserRole: builder.query({
            query: (data) => ({
                url: `/api/team/${data.teamId}/getUserRole`,
                method: 'GET',
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            providesTags: (result, error, data) => {
                return [{ type: 'UserRole', id: data.teamId }];
            },
        }),
        getTeamProjects: builder.query({
            query: (data) => ({
                url: `/api/team/${data.teamId}/projects`,
                method: 'GET',
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            providesTags: (result, error, data) => {
                return [{ type: 'Projects', id: data.teamId }];
            },
        }),
    }),
});

export const {
    useGetUsersTeamsQuery,
    useGetUserRoleQuery,
    useGetTeamsUsersQuery,
    useGetTeamProjectsQuery,
    useCreateTeamMutation,
    useAddUserToTeamMutation,
} = teamApiSlice;
