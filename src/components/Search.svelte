<script>
  import { getData } from "../data/getData.js";
  import { data } from "../data/stores.js";

  let username = "";
  let errorColor;

  const handleSearch = async () => {
    if (username != "") {
      let userData = await getData(`users/${username}`);
      if (userData.message == "Not Found") {
        errorColor = "#ff6659";
        setTimeout(function() {
          errorColor = "";
        }, 2000);
        return;
      }
      data.update(() => {
        return userData;
      });
      username = "";
    }
    console.log($data);
  };

  const changeInputColor = () => {
    document.querySelector(".Search-input").style = errorColor
      ? "border-color:" + errorColor
      : "";
    document.querySelector(
      ".Search-input-left"
    ).style.backgroundColor = errorColor ? errorColor : "";
  };
</script>

<style>
  .Search {
    display: grid;
    grid-template: 40px 15px / 7.5fr 2.5fr;
    grid-auto-flow: row;
    grid-column-gap: 10px;
    grid-row-gap: 4px;
    padding: 5px 5px 0;
    max-width: 800px;
    margin: 0 auto;
  }
  .Search-input {
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .Search-input,
  .Search button {
    transition: 0.3s;
    border-radius: 5px;
    border: 2px solid lightgray;
  }
  .Search-input-left {
    padding: 5px;
    height: 100%;
    background-color: lightgrey;
    display: flex;
    align-items: center;
    width: 20%;
    transition: 0.3s;
  }
  .Search-input-left label {
    line-height: 100%;
    color: white;
  }
  .Search-input input {
    width: 80%;
    height: calc(100%-10px);
    padding: 5px;
    border: none;
  }
  .Search button:hover {
    background-color: rgb(88, 148, 168);
    color: white;
  }
  .Search button:active {
    transform: scale(0.9);
  }

  .Search-input:focus-within {
    border: 2px solid rgb(88, 148, 168);
  }
  .Search-input:focus-within .Search-input-left {
    background-color: rgb(88, 148, 168);
  }

  .Search-notFound {
    grid-column: 1 / -1;
    transition: 0.3s;
    opacity: 0;
  }
  .Search-notFound p {
    text-align: center;
    font-size: 10px;
    color: #ff6659;
  }

  @media (max-width: 768px) {
    .Search {
      grid-template: 40px 40px 15px / 1fr;
    }
  }
  @media (max-width: 600px) {
    .Search {
      grid-template: auto 40px 15px / 1fr;
    }
    .Search-input {
      flex-direction: column;
    }
    .Search-input-left {
      width: 100%;
    }
    .Search-input-left label {
      text-align: center;
      width: 100%;
    }
    .Search-input input {
      width: 95%;
    }
  }
</style>

<form class="Search">
  <div
    class="Search-input"
    style={errorColor ? `border-color:${errorColor} ;` : ''}>
    <div
      class="Search-input-left"
      style={errorColor ? `background-color:${errorColor} ;` : ''}>
      <label for="username-input">👤 Username:</label>
    </div>
    <input
      type="text"
      placeholder="Username..."
      id="username-input"
      bind:value={username} />
  </div>
  <button on:click|preventDefault={handleSearch} type="submit">
    🔎 Search
  </button>
  <div
    class="Search-notFound"
    style={errorColor ? 'opacity:1 !important;' : ''}>
    <p>User {username} Not Fond</p>
  </div>
</form>
