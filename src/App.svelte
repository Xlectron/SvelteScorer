<script>
    import Scorer from './Scorer.svelte'
	import Login from './Login.svelte'
	import Home from './Home.svelte'
	import { Router, Link, Route } from "svelte-routing";

	export let url = "";
	if (window.location.pathname == "/") {
		window.location.href = "/login";
	}


</script>

<main>
	<h1>Centerstage Scorer</h1>
	
	<Router {url}>
		<div>
			<Route path="/home" component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/csscorer" component={Scorer} />
		</div>
	</Router>


</main>

<style>
	main {
		text-align: center;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ffffff;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	
</style>


