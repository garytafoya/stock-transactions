<template>
	<div>
		<b-modal
			id="add-trade"
			centered
			button-size="lg"
			title="Add Trade"
			@show="resetModal"
			@hidden="resetModal"
			@ok="handleOk"
		>
			<form ref="form" @submit.stop.prevent="handleSubmit">
				<b-row>
					<b-col md="6">
						<b-form-group>
							<label
								for="date"
								invalid-feedback="Select Date"
								>Purchase Date</label
							>
							<b-form-datepicker
								id="date"
								v-model="buyDate"
								class="mb-2"
								required
							></b-form-datepicker>
						</b-form-group>

						<b-form-group>
							<label for="time">Purchase Time (optional)</label>
							<b-form-timepicker
								v-model="buyTime"
								locale="en"
							></b-form-timepicker>
						</b-form-group>

						<b-form-group>
							<label for="symbol">Stock Symbol</label>
							<b-form-input
								v-model="symbol"
								placeholder=""
								required
							></b-form-input>
						</b-form-group>

						<b-form-group>
							<label for="shares">Number of Shares</label>
							<b-form-input
								v-model="shares"
								placeholder=""
								required
								type="number"
							></b-form-input>
						</b-form-group>

						<b-form-group>
							<label for="price">Buy Price</label>
							<b-form-input
								v-model="buyPrice"
								placeholder=""
								required
								type="number"
							></b-form-input>
						</b-form-group>
					</b-col>

					<b-col md="6">
						<b-form-group>
							<label
								for="date"
								invalid-feedback="Select Date"
							>
								Sell Date
							</label>
							<b-form-datepicker
								id="date"
								v-model="sellDate"
								class="mb-2"
							></b-form-datepicker>
						</b-form-group>

						<b-form-group>
							<label for="time">Sell Time (optional)</label>
							<b-form-timepicker
								v-model="sellTime"
								locale="en"
							></b-form-timepicker>
						</b-form-group>

						<b-form-group>
							<label for="price">Sell Price</label>
							<b-form-input
								v-model="sellPrice"
								placeholder=""
							></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>
			</form>
		</b-modal>
	</div>
</template>

<script>
// import moment from "moment";
import { generateTransactionID } from "../js/utilities.js";
export default {
	name: "AddTrade",
	data() {
		return {
			buyDate: null,
			sellDate: null,
			buyTime: null,
			sellTime: null,
			symbol: null,
			shares: null,
			buyPrice: null,
			sellPrice: null
		};
	},
	computed: {
		modalTitle() {
			if (this.mode == "add") {
				return 'New Trade'
			} else if (this.mode == "edit") {
				return 'Edit Trade'
			}
			return ''
		}
	},
	methods: {
		checkFormValidity() {
			const valid = this.$refs.form.checkValidity();
			//   this.weightState = valid;
			return valid;
		},
		resetModal() {
			this.buyDate = null
			this.sellDate = null
			this.buyTime = null
			this.sellTime = null
			this.symbol = null
			this.shares = null
			this.buyPrice = null
			this.sellPrice = null
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
				this.$bvModal.hide("add-trade")
			});
		},
		addTransaction() {
			let bt = this.shares * this.buyPrice;
			bt = Number(bt).toFixed(2);

			this.$store.dispatch("addStockPurchase", {
				id: generateTransactionID(16),
				buyDate: this.buyDate,
				sellDate: this.sellDate,
				buyTime: this.buyTime,
				sellTime: this.sellTime,
				symbol: this.symbol.toUpperCase(),
				shares: this.shares,
				buyPrice: this.buyPrice,
				sellPrice: this.sellPrice,
				buyTotal: bt,
				sellTotal: null,
				gain: null,
				percentGain: null
			});
		},
	},
};
</script>