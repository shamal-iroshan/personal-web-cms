export interface Post {
  id?: string;
  title: string;
  published: boolean;
  description: string;
  content: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
  author: string;
  slug: string;
}

export interface Author {
  id?: string;
  name: string;
  image: string;
}

export interface Category {
  id?: string;
  name: string;
}

export interface AllPosts {
  total: number;
  data: Post[];
}

export interface PostState {
  getPostIsLoading: boolean;
  getPostIsSuccess: boolean;
  getPostError: { hasError: boolean; description: string };
  post: Post | undefined;
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
  getAllCategoryIsLoading: boolean;
  getAllCategoryIsSuccess: boolean;
  getAllCategoryError: { hasError: boolean; description: string };
  allCategories: Category[];
  addCategoryIsLoading: boolean;
  addCategoryIsSuccess: boolean;
  addCategoryError: { hasError: boolean; description: string };
  getAllAuthorsIsLoading: boolean;
  getAllAuthorsIsSuccess: boolean;
  getAllAuthorsError: { hasError: boolean; description: string };
  allAuthors: Author[];
  addAuthorIsLoading: boolean;
  addAuthorIsSuccess: boolean;
  addAuthorError: { hasError: boolean; description: string };
}
