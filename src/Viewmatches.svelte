<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  let email;
  let password;
  let matches = [];
  let teams;
  let isLoading = true; // Initialize loading indicator
  const dispatcher = createEventDispatcher();

  const getCookie = (name) => {
      const cookieString = document.cookie;
      const cookies = cookieString.split('; ').reduce((acc, cookie) => {
          const [cookieName, cookieValue] = cookie.split('=');
          acc[cookieName] = cookieValue;
          return acc;
      }, {});
      return cookies[name];
  };

  const myMatches = async () => {
    console.log("Loading matches...")
      email = getCookie('email')
      password = getCookie('password')
      console.log("Email:", email, "Password:", password)
      
      try {
          const response = await fetch('/myteams/getmatchesfromdatabase', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password }) 
          });

          const data = await response.json();
          matches = data; 
          isLoading = false; // Set loading indicator to false after data is received

      } catch (error) {
          console.error('Error:', error);
      }
  };

  const deleteMatches = async (index) => {
        teams = matches[index].teams;
        try {
            const response = await fetch('/myteams/deletematchesrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ teams }) // Send hashedPassword as an array
            });

            const data = await response.json();
            console.log(data);

            if (data.message === 'Delete successful') {
                window.location.href = "/myteams/viewmatches";
            } else {
                console.log('Delete unsuccessful');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

  onMount(() => {
    myMatches();
  });

  const confirmDelete = (index) => {
      const confirmDelete = confirm("Are you sure you want to delete this match?");
      if (confirmDelete) {
          deleteMatches(index);
      }
  };

  const openDialog = (team) => {
      // Here, you can define your dialog box logic
      // For example, you can use a modal library like @sveltejs/modal
      // Or create your own custom dialog component
      
      // For demonstration, I'll just log the selected team
      console.log('Selected team:', team);
  };


  const viewMatches = () => {
    // Navigate to the page where you want to display the matches
    window.location.href = "/myteams/viewmatches";
  };
  

</script>

<main>
  <h1>FTC Scorer</h1>

  {#if isLoading}
      <p>Loading...</p> <!-- Display loading indicator while waiting for data -->
  {:else}
      <div class="team-container">
          {#each matches as match, index}
              <div class="team">
                  <h2>{match.teams}</h2>
                  <p> {match.scores} </p>
                  <button class="delete-btn" on:click={() => confirmDelete(index)}>🗑️</button>
              </div>
          {/each}
      </div>
  {/if}

  <div class="bottom-buttons">
      <button class="button" on:click={() => window.location.href = "/home"}>Back</button>
  </div>    
</main>


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
  }

  /* Style for sign out and account buttons */
  .bottom-buttons {
    position: fixed;
    bottom: 20px;
    left: 20px;
  }

  /* Style for team container */
  .team-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 20px;
  }

  /* Style for each team */
  .team {
    position: relative;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    background-color: #f9f9f9;
    width: 300px;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: black; 
  }

  .team h2 {
    margin-bottom: 10px;
  }

  /* Style for average score */
  .avg-score {
    font-size: 18px;
    margin-top: 10px;
  }

  /* Style for delete button */
  .delete-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #999;
  }

  .delete-btn:hover {
    color: #ff0000;
  }

  /* Style for add team button */
  .add-team-btn {
    margin-left: 20px;
  }
</style>
