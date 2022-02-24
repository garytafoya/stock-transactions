<template>
  <div>
    <edit-trade></edit-trade>
    <b-row>
      <b-table
        class="tableFont"
        striped
        hover
        :fields="fields"
        :items="transactions"
        small
        table-variant="default"
        :tbody-tr-class="rowClass"
      >
        <template #cell(actions)="row">
          <b-icon-pencil-square
            @click="showEditModal(row.item)"
          ></b-icon-pencil-square>
          <b-icon-code-slash
            class="ml-2"
            v-b-popover.hover.top="row.item.id"
          ></b-icon-code-slash>
        </template>
      </b-table>
    </b-row>
  </div>
</template>

<script>
import EditTrade from "../modals/EditTrade.vue";
export default {
  components: {
		EditTrade
	},
  props: ["id"],
  data() {
    return {
      selectedTrade: {
        buyDate: null,
        sellDate: null,
        buyTime: null,
        sellTime: null,
        symbol: null,
        shares: null,
        buyPrice: null,
        sellPrice: null
      },
      fields: [
        {
          key: "buyDate",
        },
        {
          key: "buyTime",
        },
        {
          key: "symbol",
        },
        {
          key: "shares",
        },
        {
          key: "buyPrice",
          formatter: (value) => {
            return Number(value).toFixed(2);
          },
        },
        {
          key: "buyTotal",
        },
        {
          key: "sellPrice",
          formatter: (value) => {
            return Number(value).toFixed(2);
          }
        },
        {
          key: "sellDate",
        },
        {
          key: "sellTotal",
        },
        {
          key: "sellTime",
        },
        {
          key: "percentGain",
          formatter: (value) => {

            if ( value < 0 ) {
              return '(' + value + ')%'
            } else {
              return value + '%'
            }
          }
        },
        {
          key: "gain",
          formatter: (value) => {
            return Number(value).toFixed(2);
          }
        },
        {
          key: "actions",
        },
      ],
    };
  },
  created() {
    this.$store.dispatch("loadTransactions");
  },
   watch: {
		tradeData(value) {
			console.log('trade changed')
      console.log(value)
      this.$bvModal.show("edit-trade")
		}
	},
  computed: {
    transactions() {
      return this.$store.getters["allTransactions"];
    },
    tradeData() {
			return this.$store.getters["selectedTrade"];
		}
  },
  methods: {
    showEditModal(row) {
      console.log('clicked')
      this.$store.dispatch("updateSelectedTrade", row)
      this.$bvModal.show("edit-trade")
    },
    rowClass(item, type) {
      if (!item || type !== 'row') return
      if (item.gain > 0) return 'table-success'
      if (item.gain < 0) return 'table-danger'
    }
  },
};
</script>

<style>
.tableFont {
  font-size: 0.75rem;
}
</style>