<script lang="ts">
  import { page } from '$app/stores'
  // import { goto } from '$app/navigation'
  // import { onMount } from 'svelte'
  import Logo from '$lib/components/Logo.svelte'
  import '../app.css'

  $: route = $page.url.pathname

  // let previous: Touch
  // let overscrollStart: Touch
  // let state: 'idle' | 'overscrolling' | 'refreshing' = 'idle'
  // function pullToRefresh(e) {
  //   const touch = e.touches[0]
  //   if (!previous) {
  //     previous = touch
  //     return
  //   }
  //   if (window.scrollY === 0 && previous.clientY < touch.clientY) {
  //     if (state === 'idle') {
  //       state = 'overscrolling'
  //       overscrollStart = touch
  //     } else if (touch.clientY - overscrollStart.clientY > 100) {
  //       if (state !== 'refreshing') {
  //         goto($page.url, {
  //           invalidateAll: true,
  //         }).then(() => (state = 'idle'))
  //       }
  //       state = 'refreshing'
  //     }
  //   } else if (state === 'overscrolling') {
  //     state = 'idle'
  //   }

  //   previous = touch
  // }

  // onMount(() => {
  //   window.addEventListener('touchmove', pullToRefresh)
  //   window.removeEventListener('touchmove', pullToRefresh)
  // })
</script>

<header class="flex items-center justify-center gap-4 px-4 mt-8 text-xl">
  <a href="/" class="text-6xl !no-underline">
    <Logo type="initial" />
  </a>
</header>
<div class="max-w-xl pb-24 mx-auto">
  <slot />
</div>
<nav
  class="fixed bottom-0 grid w-full grid-cols-3 px-6 pt-6 border-y bg-stone-300/50 text-stone-900 backdrop-blur"
>
  <a class="text-center" class:active={route.includes('/nfl')} href="/nfl">
    NFL
  </a>
  <a class="text-center" class:active={route.includes('/ncaaf')} href="/ncaaf">
    NCAA FB
  </a>
  <a class="text-center" class:active={route.includes('/ncaab')} href="/ncaab">
    NCAA BB
  </a>
</nav>

<style>
  nav {
    padding-bottom: max(env(safe-area-inset-bottom), 1.5rem);
  }
  .active {
    font-weight: theme('fontWeight.bold');
  }
</style>
