import { useGetVideosQuery } from "../../features/api/apiSlice";
import Video from "./Video";
import  VideoLoader  from '../ui/loaders/VideoLoader'
import  Error  from '../ui/Error'

export default function Videos() {
    const { data:videos, isError, isLoading } = useGetVideosQuery(undefined,{
        refetchOnReconnect:true,
    });

    // decide what to render
    let content = null;
    if (isLoading) content = <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
    </>

    if(!isLoading && isError) content = <Error/>
    if(!isLoading && !isError && videos.length===0) content = 'No videos found'
    if(!isLoading && !isError && videos.length>0) content = videos.map(video=><Video key={video.id} video={video}/>)

    return (
        <>
            {content}
        </>
    );
}
