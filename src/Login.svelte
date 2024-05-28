<script>
    let email = 'josh@gmail.com';
    let password = 'test123';
    export let loginType = "login";

    const hashPassword = async () => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const buffer = await crypto.subtle.digest('SHA-256', data);
        const hexString = Array.from(new Uint8Array(buffer))
        .map(byte => ('0' + (byte & 0xFF).toString(16)).slice(-2))
        .join(' ');
        return `<Buffer ${hexString}>`;
        // return new TextDecoder().decode(buffer); // Convert ArrayBuffer to Array
    };

    const setCookie = (name, value, days) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    };

    const getCookie = (name) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ').reduce((acc, cookie) => {
            const [cookieName, cookieValue] = cookie.split('=');
            acc[cookieName] = cookieValue;
            return acc;
        }, {});
        return cookies[name];
    };


    const login = async () => {
        console.log("Logging in")
        try {
            const hashedPassword = await hashPassword();
            console.log(hashedPassword);

            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, hashedPassword }) // Send hashedPassword as an array
            });

            const data = await response.json();
            console.log(data);

            if (data.message === 'Login successful') {
                setCookie('loggedIn', true, 7);
                setCookie('email', email, 7);
                setCookie('password', hashedPassword, 7);

                window.location.href = "/home";
            } else {
                console.log('Incorrect email or password');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const signUp = async () => {
        try {
            const hashedPassword = await hashPassword();
            console.log(hashedPassword);

            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, hashedPassword }) // Send hashedPassword as an array
            });

            const data = await response.json();
            console.log(data);

            if (data.message === 'Signup successful') {
                window.location.href = "/home";
            } else {
                console.log('Signup unsuccessful');
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
