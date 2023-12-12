<script>
	import { authStore } from './../stores/authStore.js';
	import { auth } from '../lib/firebase.client';
	import { onMount } from 'svelte';
    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log(user)
            authStore.update((curr) => {
                return {...curr, isLoading: false, currentUser:user };
            })
        })
        if (browser && !$authStore?.currentUser && !$authStore.isLoading && window.location.pathname !== '/'){
            window.location.href = './'
        }
        return unsubscribe;
    })
    
</script>

<main>
    <slot />
</main>