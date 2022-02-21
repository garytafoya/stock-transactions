<template>
  <div class="container fluid">
    <buy-stock></buy-stock>
    
    <h1>Transactions</h1>
    <b-button class="mb-3" variant="success" v-b-modal.buy-stock>Buy</b-button>

    <transactions></transactions>
  </div>
</template>

<script>
import Transactions from "../components/Transactions.vue"
import BuyStock from "../modals/Buy.vue";
  export default {
    components: {
      Transactions,
      BuyStock
    }
  }
</script>