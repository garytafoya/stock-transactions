<template>
	<div>
		<b-modal
			id="sell-stock"
			centered
			button-size="lg"
			:title="title"
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
								:state="dateState"
							>
                Buy Date
							</label>
							<b-form-datepicker
								id="date"
								v-model="sellDate"
								class="mb-2"
								required
								:state="dateState"
							></b-form-datepicker>
						</b-form-group>

						<b-form-group>
							<label for="time">Time of Transaction (optional)</label>
							<b-form-timepicker
								v-model="sellTime"
								locale="en"
								required
							></b-form-timepicker>
						</b-form-group>

						<b-form-group>
							<label for="price">Price</label>
							<b-form-input
								v-model="sellPrice"
								placeholder=""
								required
							></b-form-input>
						</b-form-group>
					</b-col>
					<b-col md="6"></b-col>
				</b-row>
			</form>
		</b-modal>
	</div>
</template>

<script>
export default {
	name: "ExitTransaction",
	props: ["transaction"],
	data() {
		return {
			sellDate: null,
			sellTime: null,
			sellPrice: null,
			dateState: null,
		};
	},
	computed: {
		title() {
			return "Sell " + this.symbol;
		},
	},
	methods: {
		checkFormValidity() {
			const valid = this.$refs.form.checkValidity();
			//   this.weightState = valid;
			return valid;
		},
		resetModal() {
			this.sellDate = null;
			this.sellTime = null;
			this.sellPrice = null;
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
			this.exitTransaction();
			this.$nextTick(() => {
				this.$bvModal.hide("sell-stock");
			});
		},
		exitTransaction() {
			//do some math
			let st = this.transaction.shares * this.sellPrice;
			st = Number(st).toFixed(2);

			let g = st - Number(this.transaction.buyTotal);
			g = g.toFixed(2);

			let pg = (st - this.transaction.buyTotal) / this.transaction.buyTotal;
			pg = (pg * 100).toFixed(2);

			this.$store.dispatch("updateTransaction", {
				id: this.transaction.id,
				sellPrice: this.sellPrice,
				sellDate: this.sellDate,
				sellTime: this.sellTime,
				sellTotal: st,
				gain: g,
				percentGain: pg,
			});
		},
	},
};
</script>