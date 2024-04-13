<script>
    let email = '';
    let password = '';
    export let loginType = "login";

	const login = () => {
		console.log("Email: " + email);
		console.log("Password: " + email);
        window.location.href = "/home";
	}

    const signUp = () => {
        loginType = "signup"
        
    }
    console.log(loginType)
</script>


<main>
    {#if loginType == "login"}
    <div class="login-container">
        <h2> Log In </h2>

        <input bind:value={email} placeholder="Enter your email" />
        <input bind:value={password} placeholder="Enter your password" type="password"/>

        <button on:click={login}>Submit</button>

        <button on:click={signUp}> Sign up </button>
        
    </div>

    {:else if loginType == "signup"}
    <div class="login-container">
        <h2> Sign Up </h2>

        <input bind:value={email} placeholder="Enter your email" />
        <input bind:value={password} placeholder="Enter your password" type="password"/>
        <input bind:value={password} placeholder="Confirm password" type="password"/>

        <button on:click={login}> Sign up </button>
    </div>
    {/if}
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
        color: black;
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
        border-color: #3897f0;
    }

    button {
        margin-top: 20px;
        background-color: #3897f0;
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
</style>
