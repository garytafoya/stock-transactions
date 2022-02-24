<template>
	<div>
		<b-card
			bg-variant="success"
			text-variant="white"
			header="Winners"
			class="text-center"
			style="max-width: 200px"
		>
			<h1>{{ numberOfWinners }}</h1>
		</b-card>
	</div>
</template>

<script>
export default {
	name: "Winners",
	computed: {
		numberOfWinners() {
			return this.$store.getters["numberOfWinners"];
		},
	},
};
</script>