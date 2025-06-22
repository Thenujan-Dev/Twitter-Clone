"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import useGetProfileData from "../hooks/useGetProfileData";
import useGetUpdateUser from "../hooks/useGetUpdateUser";

const EditProfile = ({
  cancelUpdate,
  setPop,
}: {
  cancelUpdate: () => void;
  setPop: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: profileData } = useGetProfileData();
  const [username, setUsername] = useState("");
  const [email, Setemail] = useState("");
  const [currentPassword, setCurrentPaqssword] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { isPending: UpdateUserLoading, mutate: UpdateUser } = useGetUpdateUser(
    { setPop }
  );
  useEffect(() => {
    if (profileData) {
      setUsername(profileData.currentUser.username);
      Setemail(profileData.currentUser.email);
      setCurrentPaqssword(profileData.currentUser.password);
      setBio(profileData.currentUser.bio);
      setLink(profileData.currentUser.link);
    }
  }, [profileData]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        bgcolor: "#1e1e1e",
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
        color: "white",
        maxHeight: "90vh",
        overflowY: "auto",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Edit Profile
      </Typography>

      <TextField
        label="New Username"
        fullWidth
        margin="dense"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        InputLabelProps={{ style: { color: "#ccc" } }}
        InputProps={{ style: { color: "white" } }}
        sx={{ border: "solid 1px white", borderRadius: "5px" }}
      />

      <TextField
        label="Email"
        fullWidth
        margin="dense"
        value={email}
        onChange={(e) => Setemail(e.target.value)}
        sx={{ border: "solid 1px white", borderRadius: "5px" }}
        InputLabelProps={{ style: { color: "#ccc" } }}
        InputProps={{ style: { color: "white" } }}
      />

      <TextField
        label="New Password"
        type="password"
        fullWidth
        margin="dense"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        InputLabelProps={{ style: { color: "#ccc" } }}
        InputProps={{ style: { color: "white" } }}
        sx={{ border: "solid 1px white", borderRadius: "5px" }}
      />

      <TextField
        label="Current Password"
        type="password"
        fullWidth
        margin="dense"
        value={currentPassword}
        onChange={(e) => setCurrentPaqssword(e.target.value)}
        InputLabelProps={{ style: { color: "#ccc" } }}
        InputProps={{ style: { color: "white" } }}
        sx={{ border: "solid 1px white", borderRadius: "5px" }}
      />

      <TextField
        label="Bio"
        fullWidth
        margin="dense"
        multiline
        rows={2}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        InputLabelProps={{ style: { color: "#ccc" } }}
        InputProps={{ style: { color: "white" } }}
        sx={{ border: "solid 1px white", borderRadius: "5px" }}
      />

      <TextField
        label="Link"
        fullWidth
        margin="dense"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        InputLabelProps={{ style: { color: "#ccc" } }}
        InputProps={{ style: { color: "white" } }}
        sx={{ border: "solid 1px white", borderRadius: "5px" }}
      />

      <Box mt={3} display="flex" justifyContent="space-between">
        <Button
          onClick={() =>
            UpdateUser({
              UpdateData: {
                currentPassword: currentPassword,
                newBio: bio,
                newEmail: email,
                newLink: link,
                newPassword: newPassword,
                newUsername: username,
              },
            })
          }
          variant="contained"
          sx={{
            bgcolor: "#1d9bf0",
            px: 4,
            textTransform: "none",
            ":hover": { bgcolor: "#1a8cd8" },
          }}
        >
          {UpdateUserLoading ? "Updating..." : "Update"}
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{
            borderColor: "#888",
            color: "white",
            px: 4,

            textTransform: "none",
            ":hover": {
              borderColor: "#aaa",
              color: "#aaa",
              background: "rgba(255,255,255,0.05)",
            },
          }}
          onClick={() => cancelUpdate()}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfile;
