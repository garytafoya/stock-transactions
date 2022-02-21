<template>
  <div>
    <sell-stock
      :transaction="this.selectedTransaction"
    ></sell-stock>
    <b-row>
      <b-table
        class="tableFont"
        striped
        hover
        :fields="fields"
        :items="transactions"
        small
        table-variant="default"
      >
        <template #cell(actions)="row">
          <b-icon-door-closed
            v-if="row.item.sellDate == null"
            @click="selectedTrade(row)"
            v-b-modal.sell-stock
          ></b-icon-door-closed>
          <b-icon-code-slash
            class="ml-2"
            @click="exitTrade(row)"
            v-b-popover.hover.top="row.item.id"
          ></b-icon-code-slash>
        </template>
      </b-table>
    </b-row>
  </div>
</template>

<script>
import SellStock from "../modals/Sell.vue";
export default {
  components: {
    SellStock,
  },
  data() {
    return {
      selectedTransaction: null,
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
  computed: {
    transactions() {
      return this.$store.getters["allTransactions"];
    },
  },
  methods: {
    selectedTrade(row) {
      this.selectedTransaction = row.item
    },
    exitTrade(row) {
      console.log(row.item.id);
    },
  },
};
</script>

<style>
.tableFont {
  font-size: 0.75rem;
}
</style>