<template>
	<div>
		<b-modal
			id="edit-trade"
			centered
			button-size="lg"
			title="Edit Trade"
			@ok="handleOk"
		>
			<form ref="form" @submit.stop.prevent="handleSubmit">
				<b-row>
					<b-col md="6">
						<b-form-group>
							<label
								for="buyDate"
								invalid-feedback="Select Date"
								>
								Purchase Date
								</label>
							<b-form-datepicker
								id="buyDate"
								v-model="buyDate"
								class="mb-2"
								required
							></b-form-datepicker>
						</b-form-group>

						<b-form-group>
							<label for="buyTime">Purchase Time (optional)</label>
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
								for="sellDate"
								invalid-feedback="Select Date"
							>
								Sell Date
							</label>
							<b-form-datepicker
								id="sellDate"
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
export default {
	name: "EditTrade",
	data() {
		return {
			id: null,
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
	mounted() {
    this.$root.$on('bv::modal::show', () => {
			this.loadValues()
    })
  },
	computed: {
	selectedTrade() {
			return this.$store.getters["selectedTrade"];
		}
	},
	methods: {
		loadValues() {
			this.id = this.selectedTrade.id
			this.buyDate = this.selectedTrade.buyDate
			this.sellDate = this.selectedTrade.sellDate
			this.buyTime = this.selectedTrade.buyTime
			this.sellTime = this.selectedTrade.sellTime
			this.symbol = this.selectedTrade.symbol
			this.shares = this.selectedTrade.shares
			this.buyPrice = this.selectedTrade.buyPrice
			this.sellPrice = this.selectedTrade.sellPrice
		},
		checkFormValidity() {
			const valid = this.$refs.form.checkValidity();
			return valid;
		},
		handleOk(bvModalEvt) {
			// Prevent modal from closing
			bvModalEvt.preventDefault();
			// Trigger submit handler
			this.handleSubmit();
		},
		handleSubmit() {
			// Exit when the form isn't valid
			// if (!this.checkFormValidity()) {
			// 	console.log("form not ready");
			// 	return;
			// }
			this.editTrade();
			this.$nextTick(() => {
				this.$bvModal.hide("edit-trade")
			});
		},
		editTrade() {
			let bt = null
			let st = null
			let gn = null
			let pg = null
			
			//calculate buyTotal
			if (this.shares != null && this.buyPrice != null) {
				bt = this.shares * this.buyPrice;
				bt = Number(bt).toFixed(2);
			}

			//calculate sellTotal
			if (this.shares != null && this.sellPrice != null) {
				st = this.shares * this.sellPrice;
				st = Number(st).toFixed(2);
			}

			//calculate gain & percent gain
			if (st != null && bt != null) {
				gn = st - bt
				pg = ((st-bt) / bt) * 100
				pg = pg.toFixed(2)
			}

			this.$store.dispatch("editTrade", {
				id: this.id,
				buyDate: this.buyDate,
				sellDate: this.sellDate,
				buyTime: this.buyTime,
				sellTime: this.sellTime,
				symbol: this.symbol.toUpperCase(),
				shares: this.shares,
				buyPrice: this.buyPrice,
				sellPrice: this.sellPrice,
				buyTotal: bt,
				sellTotal: st,
				gain: gn,
				percentGain: pg
			});
		}
	},
};
</script>