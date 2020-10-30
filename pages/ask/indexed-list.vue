<template>
<div class="">
	<!-- <div class="5656555">65465465</div>
	<div class="5656555">65465465</div>
	<div class="5656555">65465465</div>
	<div class="5656555">65465465</div>
	<div class="5656555">65465465</div>
	<div class="5656555">65465465</div> -->
		<uni-indexed-list :options="list" :show-select="true" @click="bindClick" />

</div>
</template>

<script>
	import airport from '@/common/airport.js'
	import uniIndexedList from '@/components/uni-indexed-list/uni-indexed-list.vue'
	export default {
		components: {
			uniIndexedList
		},
		data() {
			return {
				list: airport.list
			}
		},
		methods: {
			bindClick(e) {
				console.log('点击item，返回数据' + JSON.stringify(e))
			}
		}
	}
</script>

<style>

</style>