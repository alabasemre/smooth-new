/* eslint-disable no-unused-vars */
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
        addUserToProject: builder.mutation({
            query: (data) => ({
                url: `api/project/addUser`,
                method: 'POST',
                body: data.body,
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            invalidatesTags: (result, error, data) => {
                return [{ type: 'Projects', id: data.body.projectId }];
            },
        }),
        getProjectUsers: builder.query({
            query: (data) => ({
                url: `api/project/${data.projectId}/getUsers`,
                method: 'GET',
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            providesTags: (result, error, data) => {
                return [{ type: 'Projects', id: data.projectId }];
            },
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
            invalidatesTags: (result, error, data) => {
                console.log('RESULT: ', result);
                return [
                    { type: 'Projects', id: 'All' },
                    { type: 'Projects', id: data.body.teamId },
                ];
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
            invalidatesTags: (result, error, data) => {
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
        updateTaskStatus: builder.mutation({
            query: (data) => ({
                url: `api/sprint/${data.body.taskId}/updateTask`,
                method: 'PUT',
                body: data.body,
                headers: { Authorization: `Bearer ${data.token}` },
            }),
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
                return [
                    { type: 'Sprints', id: 'All' },
                    { type: 'Sprints', id: 'Actives' },
                ];
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
        getActiveSprints: builder.query({
            query: (data) => ({
                url: `api/project/${data.projectId}/getActiveSprints`,
                method: 'GET',
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            providesTags: (result, error, data) => {
                return [{ type: 'Sprints', id: 'Actives' }];
            },
        }),
        getActiveSprintsTasks: builder.query({
            query: (data) => ({
                url: `api/project/${data.sprintId}/getSprintTasks`,
                method: 'GET',
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            providesTags: (result, error, data) => {
                return [{ type: 'Sprints', id: data.sprintId }];
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
    useGetActiveSprintsQuery,
    useLazyGetActiveSprintsTasksQuery,
    useUpdateTaskStatusMutation,
    useAddUserToProjectMutation,
} = teamApiSlice;
