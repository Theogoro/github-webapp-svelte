<script>
  import Followers from "./Followers.svelte";
  import Repos from "./Repos.svelte";
  import { writable } from "svelte/store";

  import { data } from "../data/stores.js";
  import { onDestroy } from "svelte";

  let data_value;
  let urlData = writable("");

  const unsubscribe = data.subscribe(data => {
    data_value = data;
    urlData.update(() => data_value.repos_url);
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<style>
  .User-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 5px;
  }
  .User {
    box-sizing: border-box;
    padding: 5px;
    border: 2px solid lightgray;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 0.5fr auto 3fr 1fr;
    height: 400px;
    grid-column-gap: 10px;
    grid-template-areas:
      "img soc"
      "img nam"
      "img bio"
      "img mtr";
    border-radius: 5px;
  }
  .User figure {
    grid-area: img;
    display: flex;
    align-items: center;
  }
  .User figure img {
    margin: auto 0;
    border-radius: 5px;
    overflow: hidden;
    width: 100%;
  }
  .User-name {
    grid-area: nam;
    font-size: 25px;
    display: flex;
    align-items: center;
  }
  .User-bio {
    grid-area: bio;
  }
  .User-social {
    grid-area: soc;
    font-size: 12px;
    display: flex;
    align-items: center;
  }
  .User-metric {
    display: flex;
    justify-content: space-evenly;
  }
  [class^="User-"] li {
    list-style: none;
    display: inline;
    margin-right: 5px;
  }
  @media (max-width: 600px) {
    .User {
      grid-template-columns: 1fr;
      grid-template-rows: auto 0.5fr auto auto 1fr;
      grid-template-areas:
        "img"
        "soc"
        "nam"
        "bio"
        "mtr";
      height: auto;
    }
  }
</style>

<div class="User-container">
  {#if data_value.id}
    <div class="User">
      <figure>
        <img src={data_value.avatar_url} alt="" />
      </figure>
      <div class="User-name">
        <h2>{data_value.login}</h2>
      </div>
      <div class="User-bio">
        <p>{data_value.bio}</p>
        {#if data_value.location}
          <p>{data_value.location}</p>
        {/if}
      </div>
      <div class="User-social">
        <ul>
          {#if data_value.html_url}
            <li>
              <a href={data_value.html_url} target="_blank">🗂GitHub Profile</a>
            </li>
          {/if}
          {#if data_value.blog}
            <li>
              <a href={data_value.blog} target="_blank">📧{data_value.blog}</a>
            </li>
          {/if}
          {#if data_value.email}
            <li>💻{data_value.email}</li>
          {/if}
          {#if data_value.twitter_username}
            <li>
              <a
                href={`https://twitter.com/${data_value.twitter_username}`}
                target="_blank">
                🐦@{data_value.twitter_username}
              </a>
            </li>
          {/if}
        </ul>
      </div>
      <div class="User-metric">
        <Followers
          text="👥Followers"
          num={data_value.followers}
          urlData={data_value.followers_url} />
        <Followers
          text="👤Following"
          num={data_value.following}
          urlData={data_value.following_url.replace('{/other_user}', '')} />
      </div>
    </div>
    <div class="User-repos">
      <Repos {urlData} />
    </div>
  {/if}
</div>
