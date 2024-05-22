import { apiSlice } from './apiSlice';

export const teamApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsersProjects: builder.query({
            query: (data) => ({
                url: `api/project/getUsersProjects`,
                method: 'GET',
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            providesTags: (result, error) => {
                return [{ type: 'Projects', id: 'All' }];
            },
        }),
        getAdminProjects: builder.query({
            query: (data) => ({
                url: `api/project/getAdminProjects`,
                method: 'GET',
                headers: { Authorization: `Bearer ${data.token}` },
            }),
        }),
        getProjectUserRole: builder.query({
            query: (data) => ({
                url: `api/project/${data.projectId}/getUserRole`,
                method: 'GET',
                headers: { Authorization: `Bearer ${data.token}` },
            }),
        }),
        getProjectUsers: builder.query({
            query: (data) => ({
                url: `api/project/${data.projectId}/getUserS`,
                method: 'GET',
                headers: { Authorization: `Bearer ${data.token}` },
            }),
        }),
        createProject: builder.mutation({
            query: (data) => ({
                url: `api/project`,
                method: 'POST',
                body: data.body,
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            invalidatesTags: (result, error) => {
                return [{ type: 'Projects', id: 'All' }];
            },
        }),
        createSprint: builder.mutation({
            query: (data) => ({
                url: `api/project/addSprint`,
                method: 'POST',
                body: data.body,
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            invalidatesTags: (result, error) => {
                return [{ type: 'Sprints', id: 'All' }];
            },
        }),
        addTask: builder.mutation({
            query: (data) => ({
                url: `api/sprint/addTask`,
                method: 'POST',
                body: data.body,
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            invalidatesTags: (result, error) => {
                return [{ type: 'Sprints', id: 'All' }];
            },
        }),
        getSprints: builder.query({
            query: (data) => ({
                url: `api/project/${data.projectId}/getSprints`,
                method: 'GET',
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            providesTags: (result, error) => {
                return [{ type: 'Sprints', id: 'All' }];
            },
        }),
    }),
});

export const {
    useGetUsersProjectsQuery,
    useGetAdminProjectsQuery,
    useGetProjectUserRoleQuery,
    useGetSprintsQuery,
    useGetProjectUsersQuery,
    useCreateProjectMutation,
    useCreateSprintMutation,
    useAddTaskMutation,
} = teamApiSlice;
