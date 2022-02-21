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
					<label for="date" invalid-feedback="Select Date" :state="dateState"
						>Transaction Date</label
					>
					<b-form-datepicker
						id="date"
						v-model="buyDate"
						class="mb-2"
						required
						:state="dateState"
					></b-form-datepicker>
				</b-form-group>

				<b-form-group>
					<label for="time">Time of Transaction (optional)</label>
					<b-form-timepicker
						v-model="buyTime"
						locale="en"
						required
					></b-form-timepicker>
				</b-form-group>

				<b-form-group>
					<label for="symbol">Stock Symbol</label>
					<b-form-input v-model="symbol" placeholder="" required></b-form-input>
				</b-form-group>

				<b-form-group>
					<label for="shares">Number of Shares</label>
					<b-form-input v-model="shares" placeholder="" required></b-form-input>
				</b-form-group>

				<b-form-group>
					<label for="price">Price</label>
					<b-form-input v-model="buyPrice" placeholder="" required></b-form-input>
				</b-form-group>
			</form>
		</b-modal>
	</div>
</template>

<script>
// import moment from "moment";
import { generateTransactionID } from "../js/utilities.js";
export default {
	name: "AddTransaction",
	data() {
		return {
			buyDate: null,
			buyTime: null,
			symbol: null,
			shares: null,
			buyPrice: null,
			dateState: null,
		};
	},
	methods: {
		checkFormValidity() {
			const valid = this.$refs.form.checkValidity();
			//   this.weightState = valid;
			return valid;
		},
		resetModal() {
			this.buyDate = null;
			this.buyTime = null;
			this.symbol = null;
			this.shares = null;
			this.buyPrice = null;
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
				console.log("form not ready");
				return;
			}
			this.addTransaction();
			this.$nextTick(() => {
				this.$bvModal.hide("buy-stock");
			});
		},
		addTransaction() {
			this.$store.dispatch("addStockPurchase", {
				id: generateTransactionID(16),
				buyDate: this.buyDate,
				buyTime: this.buyTime,
				symbol: this.symbol.toUpperCase(),
				shares: this.shares,
				buyPrice: this.buyPrice,
				sellPrice: null,
				sellDate: null,
				sellTime: null
			});
		},
	},
};
</script>