<script>
	import { authHandlers } from './../../stores/authStore.js';
  import {
    collection,
    addDoc,
    onSnapshot,
    query,
    where,
    orderBy,
    doc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
  import { authStore } from "../../stores/authStore";
  import { db } from "../../lib/firebase.client";
  import { onDestroy, onMount } from "svelte";
    import { getRedirectResult } from 'firebase/auth';
 

  let newTodo;
  let currentUser;
  let isLoading = true;
  let displayName;
  let userId;
  let todos = [];

  


  authStore.subscribe((curr) => {
    currentUser = curr?.currentUser;
    userId = curr?.currentUser?.uid;
    displayName = curr?.currentUser?.displayName;
    isLoading = curr?.isLoading;
    if (!isLoading){
      if (!currentUser){
      window.location.href = "/"
    }
    }
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

  async function setCompleted(completed, id) {
    if(!completed){
      const docRef = doc(db, "todos", id);
      const updatedData = {
        completed: true,
      };
      await updateDoc(docRef, updatedData);

    }
  }
  async function deleteTodo(id) {
    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef);
  }
  async function handleLogout(){
    await authHandlers.logout()
    window.location.href = "/";

  }
  function formatTimestamp(timestamp) {

    const date = new Date(timestamp);

    // Get the components of the date
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      date.getDay()
    ];
    const dayOfMonth = date.getDate().toString().padStart(2, "0");
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][date.getMonth()];
    const year = date.getFullYear();

    // Format the date string
    const formattedDate = `${hours}:${minutes} ${dayOfWeek} ${dayOfMonth} ${month} ${year}`;

    return formattedDate;
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
    {:else if !isLoading && !currentUser}
    <div class="text-white">Access denied 303</div>
    {:else}
      <h1 class="text-center text-gray-200 text-xl pb-5">
        Hello {displayName}
        <button class="ms-3" on:click={handleLogout}><i class="fa-solid fa-right-from-bracket"></i></button>
      </h1>
      <div class="">
        <input
          class="p-2 mb-2 rounded min-w-[90%]"
          bind:value={newTodo}
          type="text"
          placeholder="Add a new task"
        />
        <button class="bg-slate-400 p-2 rounded" on:click={addTodo}
          ><i class="fa-solid fa-plus"></i></button
        >
      </div>

      <ul class="max-h-[400px] overflow-y-scroll">
        {#each todos as todo}
          <li
            class="text-slate-50 min-h-[5rem] flex items-center justify-between bg-slate-400 mb-1 rounded px-5"
          >
            <div>
              <span class={todo.completed ? "line-through" : ""}
                >{todo.title}</span
              ><br />
              <span class="text-xs"
                >{formatTimestamp(todo.createdAt)}</span
              >
            </div>
            <div>
              
              <button class="m-4" on:click={setCompleted(todo.completed, todo.id)}
                ><i class="fa-solid fa-check"></i></button
              ><button class="" on:click={deleteTodo(todo.id)}
                ><i class="fa-solid fa-trash"></i></button
              >
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
