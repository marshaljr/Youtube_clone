import React from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { fetchVideos } from "../utils/fetchFromAPI";
import { Videos, ChannelCard, Loader } from "./";

const ChannelDetail = () => {
  const { id } = useParams();

  // Fetch channel details
  const {
    data: channelData,
    isLoading: loadingChannel,
    error: channelError,
  } = useQuery({
    queryKey: ["channelDetail", id],
    queryFn: () => fetchVideos(`channels?part=snippet&id=${id}`),
    staleTime: 1000 * 60,
  });

  // Fetch videos of the channel
  const {
    data: videosData,
    isLoading: loadingVideos,
    error: videosError,
  } = useQuery({
    queryKey: ["channelVideos", id],
    queryFn: () =>
      fetchVideos(`search?channelId=${id}&part=snippet%2Cid&order=date`),
    staleTime: 1000 * 60,
  });

  if (loadingChannel || loadingVideos) return <Loader />;
  if (channelError || videosError)
    return <Box color="red">Error loading channel data</Box>;

  const channelDetail = channelData?.items[0];
  const videos = videosData?.items || [];

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            height: "300px",
            background:
              "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
            zIndex: 10,
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
      </Box>

      <Box p={2} display="flex">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
