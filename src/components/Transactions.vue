<template>
  <div>
    <b-row>
     <b-table class="tableFont" striped hover :items="items" small table-variant="success" ></b-table>
    </b-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {buyDate:'03/28/2023', buyTime: '8:00am', symbol:'OCGN', shares:'100', buyPrice: '5.00', buyTotal:'1000', sellPrice:'6.00', sellDate: '03/28/2022', sellTime: '8:05am',sellTotal: '3000', percentGain: '5%', gain: '400', balance: '10000'},
          {buyDate:'03/28/2022', buyTime: '8:00am', symbol:'OCGN', shares:'100', buyPrice: '5.00', buyTotal:'1000', sellPrice:'6.00', sellDate: '03/28/2022', sellTime: '8:05am', sellTotal: '3000', percentGain: '5%', gain: '400', balance: '10000'},
          {buyDate:'03/28/2022', buyTime: '8:00am', symbol:'OCGN', shares:'100', buyPrice: '5.00', buyTotal:'1000', sellPrice:'6.00', sellDate: '03/28/2022', sellTime: '8:05am', sellTotal: '3000', percentGain: '5%', gain: '400', balance: '10000'}
        ]
      }
    }
  }
</script>

<style>
.tableFont {
	font-size: 0.75rem;
}
</style>