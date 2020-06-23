<script>
  import Modal from "./Modal.svelte";

  export let text;
  export let num = 0;
  export let urlData = "";
</script>

<div class="Followers">
  <p>{text}:{num}</p>
  <Modal {urlData} />
</div>
