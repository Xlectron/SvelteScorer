<script>
    // Import the necessary modules
    import { onMount } from 'svelte';
    import csimg from './assets/cslogo.png';
    import ppimg from './assets/pplogo.png'
    import trophyimg from './assets/trophy.png'
    import lockimg from './assets/lock.png'
    import teamsimg from './assets/teamslogo.png'
  
    // Function to handle navigation to different pages
    function navigateTo(location) {
      switch(location) {
        case "PS":
            return
        case "CS":
            window.location.href = "/csscorer";
        case "NS":
            return
        case "L":
            return
        case "MT":
            return
      }
    }
  
    // Function to handle sign out
    function signOut() {
      // Your sign out logic here
      console.log('Signed out');
      window.location.href = "/login";
    }
  
    // Function to handle account button click
    function goToAccount() {
      // Your logic to navigate to account page
      console.log('Navigating to account page');
    }
  
    // Use onMount to run code when the component is mounted
    onMount(() => {
      // Your initialization code here
    });
  </script>
  
  <style>
     /* Style for buttons */
    .button {
      display: inline-block;
      padding: 20px;
      margin: 10px;
      font-size: 24px;
      background-color: white;
      color: black;
      border: none;
      cursor: pointer;
      margin: 20px; 
    }

    .button-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px; /* Add some space between the button rows */
    }

    .button-row {
        display: flex;
        justify-content: center;
        margin-bottom: 10px; /* Add some space between the buttons */
    }

  
    /* Style for sign out and account buttons */
    .bottom-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
    }
    /* Style for account button */
    .account-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
    }
  </style>
  
  <div class="button-container">
    <div class="button-row">
      <button class="button" on:click={() => navigateTo("PS")}>
        <img src={ppimg} alt="" width="250"> <br> Scorer
      </button>
      <button class="button" on:click={() => navigateTo("CS")}>
        <img src={csimg} alt="" width="250"> <br> Scorer
      </button>
      <button class="button" on:click={() => navigateTo("NS")}>
        <img src={lockimg} alt="" width="100"> <br> Scorer
      </button>
    </div>
    <div class="button-row">
      <button class="button" on:click={() => navigateTo("L")}>
        <img src={trophyimg} alt="" width="100"> <br> Leaderboard
      </button>
      <button class="button" on:click={() => navigateTo("MT")}>
        <img src={teamsimg} alt="" width="100"> <br> My Teams
      </button>
    </div>
  </div>
  
  
  <!-- Sign out and account buttons -->
  <div class="bottom-button">
    <button class="button" on:click={signOut}>Sign Out</button>
  </div>

  <div class="account-button">
    <button class="button" on:click={goToAccount}>Account</button>
  </div>
  
  
  