export type authUserType = {
  id: string;
  username: string;
  email: string;
  bio: string;
  link: string;
  followers: string[]; // array of userIds
  following: string[]; // array of userIds
  createdAt: string;
  updatedAt: string;
};
