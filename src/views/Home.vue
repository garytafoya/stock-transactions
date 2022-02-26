<template>
	<div class="container">
		<add-trade></add-trade>

		<h1 class="display-5">TRANSACTIONS</h1>
		<b-row>
				<b-col md="4">
					<total-trades></total-trades>
				</b-col>
				<b-col md="4">
					<winners></winners>
				</b-col>
				<b-col md="4">
					<losers></losers>
				</b-col>
		</b-row>
		<b-button
      class="mb-3 mt-3"
      variant="primary"
      v-b-modal.add-trade
		>
    ADD NEW TRADE
    </b-button>

		<trades-table></trades-table>
	</div>
</template>

<script>
import TradesTable from "../components/TradesTable.vue";
import AddTrade from "../modals/AddTrade.vue";
import TotalTrades from "../metrics/TotalTrades.vue";
import Winners from "../metrics/Winners.vue";
import Losers from "../metrics/Losers.vue";
export default {
	components: {
		TradesTable,
		AddTrade,
		TotalTrades,
		Winners,
		Losers
	}
};
</script>