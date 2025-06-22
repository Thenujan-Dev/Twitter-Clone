export type authUserType = {
  id: string;
  username: string;
  email: string;
  bio: string;
  link: string;
  followers: string[];
  following: string[];
  createdAt: string;
  updatedAt: string;
};
export interface UserType {
  id: string;
  username: string;
}

export interface CommentType {
  text: string;
  user: UserType;
}

export interface LikeType {
  user: UserType;
}

export interface PostType {
  id: string;
  title: string;
  body: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
  };
  Comment: CommentType[];
  Like: LikeType[];
}
export interface SuggestedUserType {
  id: string;
  username: string;
  email: string;
  password: string;
  followers: string[];
  following: string[];
  bio: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}
export type NotificationType = {
  id: string;
  message: string;
  createdAt: string;
};
export interface UserBasic {
  id: string;
  username: string;
}

export interface UserDetail {
  id: string;
  username: string;
  email: string;
  password: string;
  followers: string[];
  following: string[];
  bio: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

export interface RequestUserData {
  currentUser: UserDetail;
  followers: UserBasic[];
  following: UserBasic[];
}
export interface EditProfileFormType {
  newUsername: string;
  newEmail: string;
  newPassword: string;
  currentPassword: string;
  newBio: string;
  newLink: string;
}
