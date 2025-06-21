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
