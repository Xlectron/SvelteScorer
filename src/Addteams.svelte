<script>
    const addTeam = () => {
  
    };
  </script>
  
  <main>
    <h1>FTC Scorer</h1>
  
    <!-- Your existing code here -->
  
    <div class="bottom-buttons">
      <button class="button back-btn" on:click={() => window.location.href = "/home"}>Back</button>
      <button class="button add-team-btn" on:click={addTeam}>Add Team</button>
    </div>    
  </main>
  
  <style>
    /* Your existing styling here */
  
    /* Style for back button */
    .back-btn {
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 1; /* Ensure it's above other content */
    }
  </style>
  