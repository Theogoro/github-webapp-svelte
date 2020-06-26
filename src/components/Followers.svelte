<script>
  import Modal from "./Modal.svelte";
  import { writable } from "svelte/store";
  import { getData } from "../data/getData.js";

  export let text;
  export let num = 0;
  export let urlData = "";

  let items = [];

  const isOpen = writable(false);

  const handleClick = () => {
    isOpen.update(() => true);
    getItems();
  };

  const getItems = async () => {
    let data = await getData(urlData);
    items = data;
  };
</script>

<style>
  .Followers {
    cursor: pointer;
  }
  .Followers-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 35px;
    margin-bottom: 3px;
  }
  .Followers-item figure,
  .Followers-item figure img {
    height: inherit;
  }
  .Followers-item figure img {
    border-radius: 50%;
  }
  .Followers-item-text {
    margin-left: 4px;
  }
</style>

<div class="Followers">
  <p on:click={handleClick}>{text}:{num}</p>
  {#if $isOpen}
    <Modal {urlData} {isOpen} title={text}>
      <ul>
        {#each items as item, index}
          <li class="Followers-list">
            <div class="Followers-item">
              <figure>
                <img
                  class="Followers-item-image"
                  src={item.avatar_url}
                  alt="" />
              </figure>
              <p class="Followers-item-text">{item.login}</p>
            </div>
          </li>
        {:else}
          <p>Nothing here</p>
        {/each}
      </ul>
    </Modal>
  {/if}
</div>
