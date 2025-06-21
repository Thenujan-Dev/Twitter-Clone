"use client";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { RiSendPlane2Fill } from "react-icons/ri";
import useCreateComment from "../hooks/useCreateComment";
import { PostType } from "../UITypes/types";

const CommentBox = ({
  setOpnCmtBox,
  cmtPostId,
  AllPosts,
}: {
  setOpnCmtBox: Dispatch<SetStateAction<boolean>>;
  cmtPostId: string;
  AllPosts: PostType[] | undefined;
}) => {
  const [text, setText] = useState("");
  const { mutate: postComment, isPending: PostCommentLoading } =
    useCreateComment();

  const handleSubmit = () => {
    postComment({ text, id: cmtPostId });
    setText("");
  };

  const handleCancel = () => {
    setText("");
  };
  let SinglePost;
  if (AllPosts) {
    SinglePost = AllPosts.find((post) => post.id === cmtPostId);
  }
  const allComments = SinglePost?.Comment;

  return (
    <Box className="w-full mt-6 p-5 rounded-xl bg-[#121212] border border-gray-700 space-y-6 relative">
      {/* Write comment */}
      <Box className="flex items-center justify-between gap-3">
        <Box className="flex items-center gap-3 w-full">
          <TextField
            fullWidth
            size="small"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="outlined"
            InputProps={{
              endAdornment: text && (
                <InputAdornment position="end">
                  <IconButton onClick={handleCancel}>
                    <MdCancel className="text-gray-400 hover:text-white" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#1f1f1f",
                borderRadius: "10px",
                "& fieldset": {
                  borderColor: "#444",
                },
                "&:hover fieldset": {
                  borderColor: "#888",
                },
              },
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#1e88e5",
              color: "white",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            {PostCommentLoading ? (
              <CircularProgress size={20} className="text-white font-bold" />
            ) : (
              <RiSendPlane2Fill />
            )}
          </IconButton>
        </Box>
        <IconButton
          onClick={() => setOpnCmtBox(false)}
          className="text-gray-400 hover:text-white"
        >
          <IoMdCloseCircleOutline
            size={24}
            className="text-red-600 text-xl font-bold"
          />
        </IconButton>
      </Box>

      {/* Comment list */}
      {allComments && (
        <Box className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
          {allComments?.length > 0 ? (
            allComments.map((comment, index) => (
              <Box key={index} className="border-b border-gray-700 pb-3">
                <Typography
                  variant="subtitle2"
                  className="text-white font-semibold text-xl"
                >
                  @{comment.user.username}
                </Typography>
                <Typography variant="body2" className="text-gray-500 pl-5">
                  {comment.text}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography className="text-gray-500 text-sm">
              No comments yet.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CommentBox;
