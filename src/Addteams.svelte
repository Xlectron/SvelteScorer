<script>
  let name;
  let number;
  let email;

  const getCookie = (name) => {
      const cookieString = document.cookie;
      const cookies = cookieString.split('; ').reduce((acc, cookie) => {
          const [cookieName, cookieValue] = cookie.split('=');
          acc[cookieName] = cookieValue;
          return acc;
      }, {});
      return cookies[name];
  };


  const addTeam = async () => {
    email = getCookie('email')
    console.log(email)
        try {
            const response = await fetch('/myteams/addteamsrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, number, email }) // Send hashedPassword as an array
            });

            const data = await response.json();
            console.log(data);

            if (data.message === 'Add successful') {
                window.location.href = "/myteams";
                name = "";
                number = "";
            } else {
                console.log('Add unsuccessful');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

</script>



<main>
    <h1>FTC Scorer</h1>

    <div class="login-container">
        <h2> Add Team </h2>

        <input bind:value={name} placeholder="Enter the team name" />
        <input bind:value={number} placeholder="Enter team number"/>

        <button on:click={addTeam}>Add</button>
    </div>

    <div class="bottom-buttons">
      <button class="button" on:click={() => window.location.href = "/myteams"}>Back</button>
  </div>    
    
</main>

<style>
    	h2 {
		color: black;
		font-size: 2em;
	}

    .login-container {
        border: 1px solid #dbdbdb;
        border-radius: 8px;
        padding: 20px;
        max-width: 300px;
        margin: 0 auto;
        background-color: white;
    }

    input {
        border: none;
        color: #3b3a30;
        border-bottom: 1px solid #dbdbdb;
        margin-bottom: 20px;
        padding: 10px 12px;
        width: 100%;
        font-size: 16px;
        background-color: #d1d1d1;
        transition: border-color 0.2s ease;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        border-color: #9b3eba;
    }

    button {
        margin-top: 20px;
        background-color: #9b3eba;
        color: #fff;
        padding: 10px 0;
        width: 100%;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        text-transform: uppercase;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    button:hover {
        background-color: #1e87dc;
    }

      /* Style for sign out and account buttons */
    .bottom-buttons {
      position: fixed;
      bottom: 20px;
      left: 20px;
    }
</style>
