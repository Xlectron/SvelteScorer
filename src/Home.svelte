<script>
    // Import the necessary modules
    import { onMount } from 'svelte';
    import csimg from './assets/cslogo.png';
  
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
      background-color: #007bff;
      color: #fff;
      border: none;
      cursor: pointer;
    }
  
    /* Style for sign out and account buttons */
    .bottom-buttons {
      position: fixed;
      bottom: 20px;
      left: 20px;
    }
    /* Style for account button */
    .account-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 10px;
      font-size: 18px;
      background-color: #28a745;
      color: #fff;
      border: none;
      cursor: pointer;
    }
  </style>
  
  <div>
    <!-- Five big buttons for different pages -->
    <button class="button" on:click={() => navigateTo("PS")}>PowerPlay Scorer</button>
    <button class="button" on:click={() => navigateTo("CS")}> <img src={csimg} alt="" width="250"> Scorer</button>
    <button class="button" on:click={() => navigateTo("NS")}>Scorer</button>
    <button class="button" on:click={() => navigateTo("L")}>Leaderboard</button>
    <button class="button" on:click={() => navigateTo("MT")}>My Teams</button>
  </div>
  
  <!-- Sign out and account buttons -->
  <div class="bottom-buttons">
    <button class="button" on:click={signOut}>Sign Out</button>
  </div>
  
  <button class="account-button" on:click={goToAccount}>Account</button>
  