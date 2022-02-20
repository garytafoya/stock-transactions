<template>
  <div>
    <b-modal
      id="buy-stock"
      centered
      button-size="lg"
      title="Buy Stock"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">

          <b-form-group>
            <label for="date" invalid-feedback="Select Date" :state="dateState">Transaction Date</label>
            <b-form-datepicker id="date" v-model="date" class="mb-2" required :state="dateState"></b-form-datepicker>
          </b-form-group>

          <b-form-group>
            <label for="time">Time of Transaction (optional)</label>
            <b-form-timepicker v-model="time" locale="en" required></b-form-timepicker>
          </b-form-group>

          <b-form-group>
            <label for="symbol">Stock Symbol</label>
            <b-form-input v-model="symbol" placeholder="" required></b-form-input>
          </b-form-group>

          <b-form-group>
            <label for="shares">Shares</label>
            <b-form-input v-model="shares" placeholder="" required></b-form-input>
          </b-form-group>

          <b-form-group>
            <label for="price">Price</label>
            <b-form-input v-model="price" placeholder="" required></b-form-input>
          </b-form-group>

      </form>
    </b-modal>
  </div>
</template>

<script>
// import moment from "moment";
// import FishCatch from "../classes/FishCatch";
export default {
  name: "AddFishModal",
  props: ["anglerName"],
  data() {
    return {
      date: null,
      time: null,
      symbol: null,
      shares: null,
      price: null,
      dateState: null
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
    //   this.weightState = valid;
      return valid;
    },
    resetModal() {
      this.date = null;
      this.time = null;
      this.symbol = null;
      this.shares = null;
      this.price = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        console.log('form not ready')
        return;
      }
      this.addTransaction();
      this.$nextTick(() => {
        this.$bvModal.hide("buy-stock");
      });
    },
    addTransaction() {
        alert('added')
    }
  },
};
</script>