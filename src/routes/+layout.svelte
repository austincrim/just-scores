<script>
  import Logo from '$lib/components/Logo.svelte'
  import '../app.css'
</script>

<nav class="flex items-center justify-between gap-4 px-4 mt-4 text-xl">
  <a href="/" class="text-4xl !no-underline">
    <Logo type="initial" />
  </a>
  <span class="flex gap-2">
    <a href="/ncaaf">Football</a>
    <a href="/ncaab">Basketball</a>
  </span>
</nav>
<slot />
