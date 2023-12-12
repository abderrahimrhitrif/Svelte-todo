<script>
  import { authHandlers } from "../stores/authStore";
  

  async function handleSubmit() {
    try {
      await authHandlers.signInWithGoogle();
      window.location.href = './dashboard';
    } catch (err) {
      console.log(err);
    }
  }
</script>

<div class="flex h-screen justify-center items-center bg-gradient-to-br from-indigo-900 to-black">
  <div class="w-full max-w-md bg-gray-800 rounded-lg shadow-md px-8 py-12">
    <h1 class="text-2xl font-bold text-center mb-8 text-gray-200">Welcome Back!</h1>
    <p class="text-center text-gray-400 mb-4">
      Sign in to get started with your to-do list and manage your tasks easily.
    </p>
    <form on:submit|preventDefault={handleSubmit}>
      <button type="submit" class="w-full flex justify-center items-center bg-gray-700 text-white py-3 px-4 rounded-md shadow-md hover:bg-gray-600">
        <i class="fab fa-google mr-2 text-lg"></i>
        Sign In with Google
      </button>
    </form>
  </div>
</div>
