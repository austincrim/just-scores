<script>
  import Logo from '$lib/components/Logo.svelte'
  import '../app.css'
</script>

<nav class="flex items-center justify-between gap-4 px-3 mt-4 text-xl">
  <a href="/" class="text-4xl !no-underline">
    <Logo type="initial" />
  </a>
  <span class="flex gap-3">
    <a href="/nfl">NFL</a>
    <a href="/ncaaf">NCAA FB</a>
    <a href="/ncaab">NCAA BB</a>
  </span>
</nav>
<slot />
<div class="h-12" />
