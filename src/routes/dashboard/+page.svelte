<script>
  import {
    collection,
    addDoc,
    onSnapshot,
    query,
    where,
    orderBy,
    doc,
    updateDoc,
  } from "firebase/firestore";
  import { authStore } from "../../stores/authStore";
  import { db } from "../../lib/firebase.client";
  import { onDestroy, onMount } from "svelte";

  let newTodo;
  let isLoading = true;
  let displayName;
  let userId;
  let todos = [];

  authStore.subscribe((curr) => {
    userId = curr?.currentUser?.uid;
    displayName = curr?.currentUser?.displayName;
    isLoading = curr?.isLoading;
    if (userId) {
      const q = query(
        collection(db, "todos"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        todos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        localStorage.setItem("todos", JSON.stringify(todos));
      });

      onDestroy(() => {
        unsubscribe();
      });
    }
  });

  // Load todos from local storage on component mount
  onMount(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      todos = JSON.parse(storedTodos);
    }
  });

  async function addTodo() {
    if (newTodo) {
      await addDoc(collection(db, "todos"), {
        userId,
        title: newTodo,
        completed: false,
        createdAt: Date.now(),
      });

      newTodo = "";
    }
  }

  async function setCompleted(id) {
    const docRef = doc(db, "todos", id);
    const updatedData = {
      completed: true,
    };
    await updateDoc(docRef, updatedData);
  }
</script>

<div
  class="flex h-screen justify-center items-center bg-gradient-to-br from-indigo-900 to-black"
>
  <div class="w-full max-w-md bg-gray-800 rounded-lg shadow-md px-8 py-12">
    {#if isLoading}
      <div class="flex items-center justify-center space-x-2">
        <div
          class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-200"
        ></div>
        <h1 class="text-center text-gray-400">Loading...</h1>
      </div>
    {:else}
      <h1 class="text-center text-gray-200">Current user: {displayName}</h1>

      <input bind:value={newTodo} type="text" placeholder="Add a new task" />
      <button on:click={addTodo}>Add</button>

      <ul class="max-h-[400px] overflow-y-scroll">
        {#each todos as todo}
          <li
            class="text-slate-50 min-h-[3rem] flex items-center justify-between bg-slate-400 mb-1 rounded px-5"
          >
            <div class="{todo.completed ? 'line-through' : ''}">{todo.title} </div><button class="" on:click={setCompleted(todo.id)}>X</button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
