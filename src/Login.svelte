<script>
    let email = '';
    let password = '';
    export let loginType = "login";

    const hashPassword = async () => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const buffer = await crypto.subtle.digest('SHA-256', data);
        return new Uint8Array(buffer);
    };

    const login = async () => {
        const hashedPassword = await hashPassword();
        console.log(hashedPassword)

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, hashedPassword })
            });
            const data = await response.json();
            console.log(data); // Log the response from the server
            if (data.message === 'Login successful') {
                window.location.href = "/home"; // Redirect to home page
            } else {
                console.log('Login unsuccessful');
                // Handle unsuccessful login here
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const signUp = async () => {
        // Handle sign up logic
    };
</script>


<main>
    <h1>FTC Scorer</h1>

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

        <button on:click={signUp}> Sign up </button>
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
</style>
