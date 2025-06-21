import React from "react";
import { Skeleton, Box } from "@mui/material";

const PostSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        border: "1px solid #444",
        borderRadius: 2,
        backgroundColor: "#0e0e0e",
        height: "67vh", // Set max height of each post skeleton
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Skeleton
            variant="text"
            width="40%"
            height={20}
            sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
          />
          <Skeleton
            variant="text"
            width="30%"
            height={16}
            sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
          />
        </Box>
      </Box>

      {/* Content */}
      <Skeleton
        variant="text"
        width="100%"
        height={20}
        sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
      />
      <Skeleton
        variant="text"
        width="95%"
        height={20}
        sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
      />
      <Skeleton
        variant="rounded"
        width="100%"
        height={100}
        sx={{ bgcolor: "rgba(255, 255, 255, 0.05)" }}
      />

      {/* Footer */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Skeleton
          variant="text"
          width={50}
          height={20}
          sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
        />
        <Skeleton
          variant="text"
          width={50}
          height={20}
          sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
        />
      </Box>
    </Box>
  );
};

export default PostSkeleton;
