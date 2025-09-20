import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const API_KEY = process.env.VITE_REACT_API_KEY;

if (!API_KEY) {
  console.error("YouTube API key missing in .env!");
  process.exit(1);
}

const allowedOrigins = [
  "http://localhost:5173",
  "https://youtube-clone-one-eosin-36.vercel.app/",
];
// app.use(cors);
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

// ==================== Fetch list of videos ====================
app.get("/api/videos", async (req, res) => {
  const { q, pageToken } = req.query;
  const query = q?.trim() || "New";

  try {
    const response = await axios.get(`${YOUTUBE_BASE_URL}/search`, {
      params: {
        part: "snippet",
        maxResults: 50,
        q: query,
        pageToken,
        key: API_KEY,
        type: "video",
      },
    });

    res.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || error.message;
    res.status(status).json({ error: message });
  }
});

// ==================== Fetch single video details ====================
app.get("/api/video/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "Video ID is required" });

  try {
    const response = await axios.get(`${YOUTUBE_BASE_URL}/videos`, {
      params: {
        part: "snippet,statistics",
        id,
        key: API_KEY,
      },
    });

    if (!response.data.items || response.data.items.length === 0) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Return single video object directly
    res.json(response.data.items[0]);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || error.message;
    res.status(status).json({ error: message });
  }
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`✅ Server running locally on http://localhost:${port}`);
  });
}

export default app;
