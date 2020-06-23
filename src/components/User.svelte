<script>
  import Followers from "./Followers.svelte";

  import { data } from "../data/stores.js";
  import { onDestroy } from "svelte";

  let data_value;

  const unsubscribe = data.subscribe(data => {
    data_value = data;
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
    /* border-bottom: solid 2px lightgray;
    margin-bottom: 5px; */
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
  [class^="User-"] li {
    list-style: none;
    display: inline;
    margin-right: 5px;
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
        <Followers text="👥Followers" num={data_value.followers} />
        <Followers text="👤Following" num={data_value.following} />
        <!-- <li>👥Followers:{data_value.followers}</li>
        <li>👤Following:{data_value.following}</li> -->
      </div>
    </div>
  {/if}
</div>
<!-- {
  "login": "Theogoro",
  "id": 48932981,
  "node_id": "MDQ6VXNlcjQ4OTMyOTgx",
  "avatar_url": "https://avatars2.githubusercontent.com/u/48932981?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/Theogoro",
  "html_url": "https://github.com/Theogoro",
  "followers_url": "https://api.github.com/users/Theogoro/followers",
  "following_url": "https://api.github.com/users/Theogoro/following{/other_user}",
  "gists_url": "https://api.github.com/users/Theogoro/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/Theogoro/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/Theogoro/subscriptions",
  "organizations_url": "https://api.github.com/users/Theogoro/orgs",
  "repos_url": "https://api.github.com/users/Theogoro/repos",
  "events_url": "https://api.github.com/users/Theogoro/events{/privacy}",
  "received_events_url": "https://api.github.com/users/Theogoro/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Theogoro",
  "company": "Sitos's Studio",
  "blog": "",
  "location": "Desde ARG al Mundo",
  "email": null,
  "hireable": null,
  "bio": "Future full stack developer 💪💪",
  "twitter_username": null,
  "public_repos": 8,
  "public_gists": 0,
  "followers": 0,
  "following": 5,
  "created_at": "2019-03-26T00:29:22Z",
  "updated_at": "2020-06-22T23:01:46Z"
} -->
