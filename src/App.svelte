<script>
    import Scorer from './Scorer.svelte'
	import Login from './Login.svelte'
	import Home from './Home.svelte'
	import Leaderboard from './Leaderboard.svelte';
	import Myteams from './Myteams.svelte'
	
	import { Router, Link, Route } from "svelte-routing";
    
	export let url = "";
	if (window.location.pathname == "/") {
		window.location.href = "/login";
	}


</script>

<main>
	<Router {url}>
		<div>
			<Route path="/home" component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/csscorer" component={Scorer} />
			<Route path="/leaderboard" component={Leaderboard} />
			<Route path="/myteams" component={Myteams} />
		</div>
	</Router>
</main>

<style>
	main {
		text-align: center;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	
</style>


