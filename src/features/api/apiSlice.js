
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000',
    }),
    tagTypes:['videos'],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
            providesTags:['videos']
        }),

        getVideo: builder.query({
            query: (id) => `/videos/${id}`
        }),

        getRelatedVideos: builder.query({
            query: ({ id, title }) => {
                return '/videos?' + title.split(" ").map(tag => `title_like${tag}`).join('&') + `&_limit=4&id_ne=${id}`
            }
        }),
        postVideo: builder.mutation({
            query: (data) => ({
                url:'/videos',
                method:'POST',
                body:data
            }),
            invalidatesTags:['videos']
        }),
    })
});

export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery,usePostVideoMutation } = apiSlice;