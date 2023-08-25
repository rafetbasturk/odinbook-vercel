/* eslint-disable no-case-declarations */
import { initialState } from "../post-context";
import {
  GET_POSTS_BEGIN,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  CREATE_POST_BEGIN,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  CHANGE_PAGE,
  CHANGE_USER_PAGE,
  LIKE_POST,
  GET_USER_POSTS_BEGIN,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_ERROR,
  SET_INITIAL_STATE,
  CREATE_COMMENT_BEGIN,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  DELETE_COMMENT_BEGIN,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  SET_COMMENT_EDIT_MODE,
  RESET_COMMENT_EDIT_MODE,
  EDIT_COMMENT_BEGIN,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_ERROR,
} from "./actions";

export const postReducer = (state, action) => {
  switch (action.type) {
    case SET_COMMENT_EDIT_MODE:
      return {
        ...state,
        isCommentEditing: true,
        ...action.payload
      };
    case RESET_COMMENT_EDIT_MODE:
      return {
        ...state,
        isCommentEditing: false,
        comment: null,
      };
    case EDIT_COMMENT_BEGIN:
      return {
        ...state,
        isCommentLoading: true,
        comment: null,
        ...action.payload
      };
    case EDIT_COMMENT_SUCCESS:
      console.log("payload", action.payload);
      return {
        ...state,
        isCommentLoading: false,
        isCommentEditing: false,
        posts: state.posts.map(post => {
          if (post._id === action.payload.postId) {
            post.comments.map(comment => {
              if (comment._id === action.payload.comment._id) {
                comment.content = action.payload.comment.content
                return comment
              }
              return comment
            })
            return post
          }
          return post
        }),
        userPosts: state.userPosts.map(post => {
          if (post._id === action.payload.postId) {
            post.comments.map(comment => {
              if (comment._id === action.payload.comment._id) {
                comment.content = action.payload.comment.content
                return comment
              }
              return comment
            })
            return post
          }
          return post
        }),
        postId: "",

      };
    case EDIT_COMMENT_ERROR:
      return {
        ...state,
        isCommentLoading: false,
        isCommentEditing: false,
        comment: null
      };
    case DELETE_COMMENT_BEGIN:
      return {
        ...state,
        isCommentLoading: true,
        ...action.payload
      };
    case DELETE_COMMENT_SUCCESS:
      const { commentId, postId } = action.payload
      return {
        ...state,
        isCommentLoading: false,
        postId: "",
        posts: state.posts.map(post => {
          if (post._id === postId) {
            post.comments = post.comments.filter(comment => comment._id !== commentId)
          }
          return post
        }),
        userPosts: state.userPosts.map(post => {
          if (post._id === postId) {
            post.comments = post.comments.filter(comment => comment._id !== commentId)
          }
          return post
        }),
      };
    case DELETE_COMMENT_ERROR:
      return {
        ...state,
        isCommentLoading: false,
        postId: "",
      };
    case CREATE_COMMENT_BEGIN:
      return {
        ...state,
        isCommentLoading: true,
        ...action.payload
      };
    case CREATE_COMMENT_SUCCESS:
      const { post: updatedPost } = action.payload
      return {
        ...state,
        isCommentLoading: false,
        postId: "",
        posts: state.posts.map(post => {
          if (post._id === updatedPost._id) {
            return updatedPost
          }
          return post
        }),
        userPosts: state.userPosts.map(post => {
          if (post._id === updatedPost._id) {
            return updatedPost
          }
          return post
        })
      };
    case CREATE_COMMENT_ERROR:
      return {
        ...state,
        isCommentLoading: false,
        postId: "",
      };
    case SET_INITIAL_STATE:
      return initialState;
    case LIKE_POST:
      const { id, userId } = action.payload
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === id) {
            if (post.likes.includes(userId)) {
              post.likes = post.likes.filter(like => like !== userId)
            }
            else {
              post.likes.push(userId)
            }
            return post
          }
          return post
        }),
        userPosts: state.userPosts.map(post => {
          if (post._id === id) {
            if (post.likes.includes(userId)) {
              post.likes = post.likes.filter(like => like !== userId)
            }
            else {
              post.likes.push(userId)
            }
            return post
          }
          return post
        }),
      };
    case CHANGE_PAGE:
      return {
        ...state,
        ...action.payload
      };
    case CHANGE_USER_PAGE:
      return {
        ...state,
        ...action.payload
      };
    case GET_USER_POSTS_BEGIN:
      const { userId: authorId } = action.payload
      return {
        ...state,
        posts: [],
        page: 1,
        isLoading: true,
        userPosts: state.userId === authorId ? state.userPosts : [],
        userPage: state.userId === authorId ? state.userPage : 1,
        userId: authorId,
      };
    case GET_USER_POSTS_SUCCESS:
      const {
        posts: userPosts,
        numOfPages: numOfUserPages,
        numOfPosts: numOfUserPosts,
      } = action.payload
      return {
        ...state,
        isLoading: false,
        hasMoreUserPages: state.userPage !== numOfUserPages,
        numOfUserPages,
        numOfUserPosts,
        userPosts: [...state.userPosts, ...userPosts],
      };
    case GET_USER_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
        userId: "",
        userPosts: [],
        userPage: 1,
        numOfUserPages: 1,
        numOfUserPosts: 0,
        hasMoreUserPages: false,
      };
    case GET_POSTS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POSTS_SUCCESS:
      const { numOfPosts, numOfPages, posts } = action.payload
      return {
        ...state,
        isLoading: false,
        hasMorePages: state.page !== numOfPages,
        numOfPages,
        numOfPosts,
        posts: [...state.posts, ...posts]
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case CREATE_POST_BEGIN:
      return {
        ...state,
        isLoading: false,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        page: 1,
        posts: [],
        post: action.payload.post
      };
    case CREATE_POST_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      throw new Error(`No action matching ${action.type}`)
  }
}