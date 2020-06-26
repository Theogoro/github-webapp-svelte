<script>
  import { getData } from "../data/getData.js";
  import { onMount } from "svelte";

  export let urlData;

  let repos = [];

  const getRepos = async url => {
    console.log(url);
    let data = await getData(url);
    repos = data;
    console.log(repos);
  };

  onMount(async () => {
    getRepos(url);
    console.log(repos);
  });

  const unsubscribe = urlData.subscribe(data => {
    getRepos(data);
  });
</script>

<style>
  .Repo {
    margin: 20px 0 30px 0;
  }
  .Repo-container {
    display: grid;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
  .Repo-item {
    padding: 5px;
    border: 2px solid lightgray;
    border-radius: 5px;
    transition: 0.5s;
  }
  .Repo-item:hover {
    background-color: rgb(88, 148, 168);
    border-color: rgb(88, 148, 168);
    color: white;
  }
  h3 {
    font-size: 16px;
  }
  a {
    color: rgb(189, 189, 189);
    transition: 0.5s;
    font-size: 10px;
  }
  .Repo-item-lang {
    font-size: 12px;
    color: rgb(163, 163, 163);
  }
  .Repo-item:hover a {
    color: rgb(250, 194, 247);
  }
  @media (max-width: 800px) {
    .Repo-container {
      grid-template-columns: 1fr;
      grid-gap: 10px;
    }
  }
</style>

<div class="Repo">
  {#if repos}
    <p>Repos:</p>
  {/if}
  <div class="Repo-container">
    {#each repos as repo, index}
      <div class="Repo-item">
        <h3>{repo.full_name}</h3>
        <p class="Repo-item-lang">Language: {repo.language}</p>
        {#if repo.description}
          <p>{repo.description}</p>
        {/if}
        <a href={repo.html_url} target="_blank">Link del repositorio</a>
      </div>
    {:else}
      <p>No public repos</p>
    {/each}
  </div>
</div>
