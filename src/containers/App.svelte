<script>
  import Search from "../components/Search.svelte";
  import User from "../components/User.svelte";
  import Footer from "../components/Footer.svelte";
</script>

<style>
  :global(*) {
    font-family: Arial, Helvetica, sans-serif;
    padding: 0;
    margin: 0;
  }
  h1 {
    text-align: center;
    margin-top: 5px;
  }
</style>

<div class="App">
  <h1>GitHub WepApp</h1>
  <Search />
  <User />
  <Footer />
</div>
