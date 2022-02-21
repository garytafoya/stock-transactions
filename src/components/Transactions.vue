<template>
	<div>
    <sell-stock :symbol="this.selectedTradeSymbol" :id="this.selectedTradeID"></sell-stock>
		<b-row>
			<b-table
				class="tableFont"
				striped
				hover
        :fields="fields"
				:items="transactions"
				small
				table-variant="success"
			>
      <template #cell(actions)="row">
        <b-icon-door-closed @click="selectedTrade(row)" v-b-modal.sell-stock></b-icon-door-closed>
        <b-icon-code-slash class="ml-2" @click="exitTrade(row)"></b-icon-code-slash>
      </template>

			</b-table>
		</b-row>
	</div>
</template>

<script>
import SellStock from "../modals/Sell.vue";
export default {
  components: {
      SellStock
  },
	data() {
		return {
      selectedTradeID: null,
      selectedTradeSymbol: null,
      fields: [
        { 
          key: 'buyDate'
        },
        { 
          key: 'buyTime'
        }, 
        {
          key: 'symbol'
        },
        {
          key: 'shares'
        },
        { 
          key: 'buyPrice'
        },
        { 
          key: 'buyTotal'
        },
        { 
          key: 'sellPrice'
        },
        { 
          key: 'sellDate'
        },
        { 
          key: 'sellTotal'
        },
        { 
          key: 'sellTime'
        },
        { 
          key: 'percentGain'
        },
        { 
          key: 'gain'
        },
        { 
          key: 'actions'
        }]
		};
	},
	created() {
    console.log('getting transactions')
		this.$store.dispatch("loadTransactions");
	},
	computed: {
		transactions() {
			return this.$store.getters["allTransactions"];
		},
	},
  methods: {
    selectedTrade(row) {
      this.selectedTradeID = row.item.id
      this.selectedTradeSymbol = row.item.symbol
    },
    exitTrade(row) {
      console.log(row.item.id)
    }
  }
};
</script>

<style>
.tableFont {
	font-size: 0.75rem;
}
</style>