export default function ({ store, redirect }) {
    // If the user is authenticated redirect to home page
    if (store.state.auth.authUser) {
      console.log('----------redirect to home');
      return redirect('/')
    }
  }