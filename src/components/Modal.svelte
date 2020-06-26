<script>
  export let isOpen;
  export let title;
  let style = "";

  const handleClick = () => {
    style = "opacity: 0 !important;";
    setTimeout(() => {
      isOpen.update(() => false);
    }, 500);
  };
</script>

<style>
  .Modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
  }
  .Modal-overlay {
    transition: 0.5s;
    animation: fadeIn 0.5s;
    height: inherit;
    width: inherit;
    background-color: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Modal-container {
    height: auto;
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    max-width: 400px;
    min-width: 300px;
    margin: 10px;
  }
  .Modal-header {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  .Modal-header-close {
    margin-left: auto;
    cursor: pointer;
    color: lightgray;
  }
  .Modal-content {
    width: 100%;
    max-height: 300px;
    min-width: 300px;
    overflow: auto;
    padding: 5px 0;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<div class="Modal">
  <div class="Modal-overlay" on:click={handleClick} style={`${style}`}>
    <div class="Modal-container">
      <header class="Modal-header">
        <p>{title}</p>
        <div class="Modal-header-close" on:click={handleClick}>x</div>
      </header>
      <div class="Modal-content">
        <slot />
      </div>
      <footer class="Modal-footer" />
    </div>
  </div>
</div>
