export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
}

export interface AllPosts {
  total: number;
  data: Post[];
}

export interface PostState {
  getPostIsLoading: boolean;
  getPostIsSuccess: boolean;
  getPostError: { hasError: boolean; description: string };
  Post: Post | undefined;
  getAllPostIsLoading: boolean;
  getAllPostIsSuccess: boolean;
  getAllPostError: { hasError: boolean; description: string };
  allPosts: AllPosts;
  addPostIsLoading: boolean;
  addPostIsSuccess: boolean;
  addPostError: { hasError: boolean; description: string };
  updatePostIsLoading: boolean;
  updatePostIsSuccess: boolean;
  updatePostError: { hasError: boolean; description: string };
  deletePostIsLoading: boolean;
  deletePostIsSuccess: boolean;
  deletePostError: { hasError: boolean; description: string };
}
