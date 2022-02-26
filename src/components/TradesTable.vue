<template>
	<div>
		<b-modal id="delete-trade" title="Delete Trade" @ok="deleteTrade()" size="sm">
			<p class="my-4">Are you sure you want to delete this trade?</p>
		</b-modal>

		<edit-trade></edit-trade>
    <b-row class="mb-3">
      <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              class="mr-2"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
    </b-row>
		<b-row>
			<b-table
				class="tableFont"
				striped
				hover
				:fields="fields"
				:items="transactions"
				small
				table-variant="default"
				sort-by="buyDate"
				sort-desc
        :filter="filter"
        :filter-included-fields="filterOn"
			>
				<!-- :tbody-tr-class="rowClass" -->
				<template #cell(percentGain)="data">
					<div v-if="data.value.includes('-')">
						<h6 class="loser">{{ data.value }}</h6>
					</div>
					<div v-else>
						<h6 class="winner">{{ data.value }}</h6>
					</div>
				</template>

				<template #cell(gain)="data">
					<div v-if="data.value > 0">
						<h6 class="winner">
							<strong>${{ data.value }}</strong>
						</h6>
					</div>
					<div v-else>
						<h6 class="loser">
							<strong>${{ data.value }}</strong>
						</h6>
					</div>
				</template>

				<template #cell(actions)="row">
					<b-icon-pencil-square
						@click="showEditModal(row.item)"
					></b-icon-pencil-square>
					<b-icon-code-slash
						class="ml-2"
						v-b-popover.hover.top="row.item.id"
					></b-icon-code-slash>
					<b-icon-trash
						class="ml-2"
						@click="showDeleteModal(row.item.id)"
					></b-icon-trash>
				</template>
			</b-table>
		</b-row>
	</div>
</template>

<script>
import EditTrade from "../modals/EditTrade.vue";
export default {
	components: {
		EditTrade,
	},
	props: ["id"],
	data() {
		return {
      filter: null,
      filterOn: [],
			selectedTrade: {
				buyDate: null,
				sellDate: null,
				buyTime: null,
				sellTime: null,
				symbol: null,
				shares: null,
				buyPrice: null,
				sellPrice: null,
			},
      selectedId: null,
			fields: [
				{
					key: "buyDate",
					sortable: true,
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
					},
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
						return value + "%";
					},
				},
				{
					key: "gain",
					sortable: true,
					formatter: (value) => {
						return Number(value).toFixed(2);
					},
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
		tradeData() {
			return this.$store.getters["selectedTrade"];
		},
	},
	methods: {
		showEditModal(row) {
			this.$store.dispatch("updateSelectedTrade", row);
			this.$bvModal.show("edit-trade");
		},
		rowClass(item, type) {
			if (!item || type !== "row") return;
			if (item.gain > 0) return "table-success";
			if (item.gain < 0) return "table-danger";
		},
    showDeleteModal(id) {
      this.selectedId = id
      this.$bvModal.show("delete-trade");
    },
		deleteTrade() {
			this.$store.dispatch("deleteTrade", this.selectedId);
		},
	},
};
</script>

<style>
.tableFont {
	font-size: 0.75rem;
}
.winner {
	color: #055702;
}
.loser {
	color: #b60404;
}
</style>