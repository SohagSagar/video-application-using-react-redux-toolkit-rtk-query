import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import DescriptionLoader from "../ui/loaders/DescriptionLoader";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import RelatedVideoLoader from '../ui/loaders/RelatedVideoLoader';

export default function Video() {
    const { id } = useParams();
    const { data: video, isError, isLoading } = useGetVideoQuery(id);


    // decide what to render
    let content = null;
    if (isLoading) content = <>
        <DescriptionLoader />
        <DescriptionLoader />
    </>

    if (!isLoading && isError) content = <Error />
    if (!isLoading && !isError && video.id) content =
        <>
            <Player title={video.title} link={video.link}/>
            <Description video={video}/>
        </>


    return (
        <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
            <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
                <div className="grid grid-cols-3 gap-2 lg:gap-8">
                    <div className="col-span-full w-full space-y-8 lg:col-span-2">
                        {content}
                    </div>
                    {video?.id ? <RelatedVideos title={video.title} id={id} /> : isLoading ? <RelatedVideoLoader /> : <Error />}

                </div>
            </div>
        </section>
    );
}
