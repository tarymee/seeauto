<template>
	<view class="uni-numbox">
		<view class="uni-numbox__minus" :class="{'uni-numbox--disabled': disableSubtract||disabled}" @click="_calcValue('subtract')">-</view>
		<input class="uni-numbox__value" type="number" :disabled="disabled" :value="inputValue" @blur="_onBlur">
		<view class="uni-numbox__plus" :class="{'uni-numbox--disabled': disableAdd||disabled}" @click="_calcValue('add')">+</view>
	</view>
</template>
<script>
	export default {
		name: 'uni-number-box',
		props: {
			value: {
				type: Number,
				default: 1
			},
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				inputValue: this.value
			}
		},
		computed: {
			disableSubtract() {
				return this.inputValue <= this.min
			},
			disableAdd() {
				return this.inputValue >= this.max
			}
		},
		watch: {
			value(val) {
				this.inputValue = val;
			},
			inputValue(val) {
				this.$emit('change', val);
			}
		},
		methods: {
			_calcValue(type) {
				if (this.disabled) {
					return
				}
				const scale = this._getDecimalScale()
				let value = this.inputValue * scale
				let step = this.step * scale
				if (type === 'subtract') {
					value -= step
				} else if (type === 'add') {
					value += step
				}
				if (value < this.min || value > this.max) {
					return
				}
				this.inputValue = value / scale;
			},
			_getDecimalScale() {
				let scale = 1
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, (this.step + '').split('.')[1].length)
				}
				return scale
			},
			_onBlur(event) {
				let value = event.detail.value
				if (!value) {
					this.inputValue = 0
					return
				}
				value = +value;
				if (value > this.max) {
					value = this.max
				} else if (value < this.min) {
					value = this.min
				}
				this.inputValue = value
			}
		}
	}
</script>
<style>
	@charset "UTF-8";

	.uni-numbox {
		display: inline-flex;
		flex-direction: row;
		justify-content: flex-start;
		height: 35px;
		position: relative
	}

	.uni-numbox:after {
		content: '';
		position: absolute;
		transform-origin: center;
		box-sizing: border-box;
		pointer-events: none;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		border: 1px solid #c8c7cc;
		border-radius: 6px;
		transform: scale(.5)
	}

	.uni-numbox__minus,
	.uni-numbox__plus {
		margin: 0;
		background-color: #f8f8f8;
		width: 35px;
		font-size: 20px;
		height: 100%;
		line-height: 35px;
		text-align: center;
		color: #333;
		position: relative
	}

	.uni-numbox__value {
		font-size: 16px;
		position: relative;
		background-color: #fff;
		min-width: 40px;
		max-width: 80px;
		height: 100%;
		text-align: center;
		padding: 0
	}

	.uni-numbox__value:after {
		content: '';
		position: absolute;
		transform-origin: center;
		box-sizing: border-box;
		pointer-events: none;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		border-left: 1px solid #c8c7cc;
		border-right: 1px solid #c8c7cc;
		transform: scale(.5)
	}

	.uni-numbox--disabled {
		color: silver
	}
</style>