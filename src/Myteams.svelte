<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  let email;
  let password;
  let teams = [];
  let number;
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

  const myTeams = async () => {
      email = getCookie('email')
      password = getCookie('password')
      console.log("Email:", email, "Password:", password)
      
      try {
          const response = await fetch('/myteams', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password }) 
          });

          const data = await response.json();
          teams = data; 
          isLoading = false; // Set loading indicator to false after data is received

      } catch (error) {
          console.error('Error:', error);
      }
  };

  const deleteTeam = async (index) => {
        number = teams[index].number;
        try {
            const response = await fetch('/myteams/deleteteamsrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ number }) // Send hashedPassword as an array
            });

            const data = await response.json();
            console.log(data);

            if (data.message === 'Delete successful') {
                window.location.href = "/myteams";
            } else {
                console.log('Delete unsuccessful');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

  onMount(() => {
      myTeams();
  });

  const addTeam = () => {
    window.location.href = "/myteams/addteam";
  };

  const confirmDelete = (index) => {
      const confirmDelete = confirm("Are you sure you want to delete this team?");
      if (confirmDelete) {
          deleteTeam(index);
      }
  };


</script>


<main>
  <h1>FTC Scorer</h1>

  {#if isLoading}
      <p>Loading...</p> <!-- Display loading indicator while waiting for data -->
  {:else}
      <div class="team-container">
          {#each teams as team, index}
              <div class="team">
                  <h2>{team.name}</h2>
                  <p> {team.number} </p>
                  <p class="avg-score">Average Score: {team.avgscore}</p>
                  <button class="delete-btn" on:click={() => confirmDelete(index)}>🗑️</button>
              </div>
          {/each}
      </div>
  {/if}

  <div class="bottom-buttons">
      <button class="button" on:click={() => window.location.href = "/home"}>Back</button>
      <button class="button add-team-btn" on:click={addTeam}>Add Team</button>
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
