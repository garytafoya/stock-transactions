<template>
	<div>
		<b-card
			border-variant="secondary"
			align="center"
			class="shadow text-center"
			text-variant="white"
			style="max-width: 200px"
		>
		<b-row>
				<small class="text-muted text-align-center">
					<strong>LOSERS</strong>
				</small>
			<b-col md="9">
			</b-col>
			<b-col md="3">

			</b-col>
		</b-row>




			<h1>{{ numberOfLosers }}</h1>
		</b-card>
	</div>
</template>

<script>
export default {
	name: "Winners",
	computed: {
		numberOfLosers() {
			return this.$store.getters["numberOfLosers"];
		},
	},
};
</script>