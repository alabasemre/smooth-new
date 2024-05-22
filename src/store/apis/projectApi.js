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
                url: `api/project/${data.projectId}/getUsers`,
                method: 'GET',
                headers: { Authorization: `Bearer ${data.token}` },
            }),
        }),
        getTeamUsersWithProjectId: builder.query({
            query: (data) => ({
                url: `api/team/${data.projectId}/getTeamUsers`,
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
        updateTask: builder.mutation({
            query: (data) => ({
                url: `api/sprint/${data.body.taskId}/updateTask`,
                method: 'PUT',
                body: data.body,
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            invalidatesTags: (result, error, data) => {
                return [
                    { type: 'Sprints', id: 'All' },
                    { type: 'Task', id: data.body.taskId },
                ];
            },
        }),
        getTaskDetail: builder.query({
            query: (data) => ({
                url: `api/sprint/${data.taskId}/getTaskData`,
                method: 'GET',
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            providesTags: (result, error, data) => {
                return [{ type: 'Task', id: data.taskId }];
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
        updateSprint: builder.mutation({
            query: (data) => ({
                url: `api/sprint/${data.sprintId}`,
                method: 'PUT',
                body: data.body,
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            invalidatesTags: (result, error, data) => {
                return [
                    { type: 'Sprint', id: data.sprintId },
                    { type: 'Sprints', id: 'All' },
                ];
            },
        }),
        startSprint: builder.mutation({
            query: (data) => ({
                url: `api/sprint/startSprint`,
                method: 'PUT',
                body: data.body,
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            invalidatesTags: (result, error, data) => {
                return [{ type: 'Sprints', id: 'All' }];
            },
        }),
        getSprintData: builder.query({
            query: (data) => ({
                url: `api/sprint/${data.sprintId}`,
                method: 'GET',
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            providesTags: (result, error, data) => {
                return [{ type: 'Sprint', id: data.sprintId }];
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
    useGetTaskDetailQuery,
    useCreateProjectMutation,
    useCreateSprintMutation,
    useAddTaskMutation,
    useGetTeamUsersWithProjectIdQuery,
    useUpdateTaskMutation,
    useGetSprintDataQuery,
    useUpdateSprintMutation,
    useStartSprintMutation,
} = teamApiSlice;
