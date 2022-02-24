<template>
	<div class="container">
		<add-trade></add-trade>

		<h1>Stock Trades</h1>
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
      class="mb-3"
      variant="success"
      v-b-modal.add-trade
		>
    Trade
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