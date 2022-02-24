<template>
	<div>
		<b-card
			bg-variant="primary"
			text-variant="white"
			header="Trades"
			class="text-center"
			style="max-width: 200px"
		>
			<h1>{{ numberOfTrades }}</h1>
		</b-card>
	</div>
</template>

<script>
export default {
	name: "TotalTrades",
	computed: {
		numberOfTrades() {
			return this.$store.getters["numberOfTrades"];
		},
	},
};
</script>