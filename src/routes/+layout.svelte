<script lang="ts">
  import { browser } from '$app/environment'
  import { navigating, page } from '$app/stores'
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

<header
  class="relative flex flex-col items-center justify-center gap-4 px-4 mt-8 text-xl"
>
  <a href="/" class="text-7xl !no-underline" class:animate-pulse={$navigating}>
    <Logo type="initial" />
  </a>
</header>
<div class="max-w-xl pb-24 mx-auto">
  <slot />
</div>
<nav
  class="fixed grid w-[min(95vw,400px)] grid-cols-3 gap-8 px-6 py-3 text-xl -translate-x-1/2 border shadow-2xl rounded-2xl bottom-4 left-1/2 bg-white/40 text-stone-900 backdrop-blur"
>
  <a
    class="text-center !no-underline whitespace-nowrap"
    class:active-nav={route.includes('/nfl')}
    href="/nfl"
  >
    NFL
  </a>
  <a
    class="text-center !no-underline whitespace-nowrap"
    class:active-nav={route.includes('/ncaaf')}
    href="/ncaaf?c=Top+25"
  >
    NCAA FB
  </a>
  <a
    class="text-center !no-underline whitespace-nowrap"
    class:active-nav={route.includes('/ncaab')}
    href="/ncaab?c=Top+25"
  >
    NCAA BB
  </a>
</nav>

<style>
  .active-nav {
    font-weight: theme('fontWeight.bold');
  }
</style>
