import { createSlice } from '@reduxjs/toolkit'

const initialState={
    user:null,
    token:null,
    posts:[],
    comments:[]
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setLogin: (state,action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.user=action.payload.user;
        state.token=action.payload.token;
      },
      setLogout: (state) => {
        state.user=null;
        state.token=null;
      },
      setFriends: (state, action) => {
        if (state.user) {
          state.user.friends = action.payload.friends;
        } else {
          console.error("user friends non-existent :(");
        }
      },
      setPosts: (state, action) => {
        state.posts = action.payload.posts;
      },
      setPost: (state, action) => {
        
        const updatedPosts = state.posts.map((post) => {
          if (post._id === action.payload.post._id) return action.payload.post; //for post updatation
          return post;
        });
        state.posts = updatedPosts;
      },
      setComments:(state,action)=>{

     state.comments=action.payload.comments
      }
    },
  })

  export const {setLogin,setFriends,setLogout,setPost,setPosts,setComments}=authSlice.actions;
  export default authSlice.reducer;