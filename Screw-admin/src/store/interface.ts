export interface PostState {
  posts: any[];
  setPosts: (posts: PostState["posts"]) => void;
  addToFeed: (posts: PostState["posts"]) => void;
  decrementCommentsCount: (id: string) => void;
  clearPosts: () => void;
}

export interface CommentState {
  comments: any[];
  commentsHash: { [key: string]: true };
  setComments: (comments: CommentState["comments"]) => void;
  addToComments: (comments: CommentState["comments"]) => void;
  setReplies: (replies: CommentState["comments"], parent_id: string) => void;
  deleteComment: (id: string) => void;
  clearComments: () => void;
}
