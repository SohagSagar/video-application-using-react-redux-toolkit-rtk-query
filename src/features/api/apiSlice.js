
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000',
    }),
    tagTypes: ['videos', 'video','relatedVideos'],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
            providesTags: ['videos'],

        }),

        getVideo: builder.query({
            query: (id) => `/videos/${id}`,
            providesTags: (result, error, arg) => [
                { type: 'video', id: arg }
            ]
        }),

        getRelatedVideos: builder.query({
            query: ({ id, title }) => {
                return '/videos?' + title.split(" ").map(tag => `title_like${tag}`).join('&') + `&_limit=4&id_ne=${id}`
            },
            providesTags: (result, error, arg) => [
                { type: 'relatedVideos', id: arg.id }
            ]
        }),
        postVideo: builder.mutation({
            query: (data) => ({
                url: '/videos',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['videos']
        }),
        editVideo: builder.mutation({
            query: ({ id, data }) => ({

                url: `/videos/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [
                "videos",'relatedVideos', {
                    type: 'video', id: arg.id
                }
            ]

        }),

        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => ["videos"]

        }),
    })
});

export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery, usePostVideoMutation, useEditVideoMutation,useDeleteVideoMutation } = apiSlice;