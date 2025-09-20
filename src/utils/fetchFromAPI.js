const SERVER_URL =
  import.meta.env.VITE_REACT_BACKEND_API_URL || "http://localhost:5000";

// Fetch list of videos
export const fetchVideos = async ({ query = "New", pageToken = "" }) => {
  try {
    if (!SERVER_URL) throw new Error("Backend URL is not in .env");

    const url = `${SERVER_URL}/api/videos?q=${encodeURIComponent(
      query || "New"
    )}${pageToken ? `&pageToken=${pageToken}` : ""}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    return {
      items: data.items || [],
      nextPageToken: data.nextPageToken || null,
    };
  } catch (err) {
    console.error("fetchVideos error:", err.message);
    throw err;
  }
};

// Fetch single video details
export const fetchVideoDetail = async (videoId) => {
  if (!videoId) throw new Error("Missing video ID");

  const url = `${SERVER_URL}/api/video/${videoId}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  return data;
};
