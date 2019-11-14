<template>
  <div>
    <div class="range-input-wrapper" @click="dropdownOpened = !dropdownOpened">
      <Input :value="inputData" ref="inputDrop" />
    </div>

    <Dropdown
      :target="$refs.inputDrop"
      :opened.sync="dropdownOpened"
      position="bottom-middle"
    >
      <div class="range-selection-wrapper">
        <div class="min-max-values">
          <div class="min-value">{{ sliderModel[0] }}</div>
          <div class="max-value">{{ sliderModel[1] }}</div>
        </div>

        <div class="slider-wrapper">
          <vue-slider
            v-model="sliderModel"
            :process="rangeProcess"
            :min="minLimit"
            :max="maxLimit"
            @change="modelChange"
          />
        </div>

        <div class="limit-values">
          <div class="min-limit">{{ currency }}{{ minLimit }}</div>
          <div class="max-limit">{{ currency }}{{ maxLimit }}</div>
        </div>

        <div class="min-max-input-wrapper">
          <Input placeholder="Montant min." v-model="sliderModel[0]" width="100px" />
          <div class="between">To</div>
          <Input placeholder="Montant max." v-model="sliderModel[1]" width="100px" />
        </div>
      </div>
    </Dropdown>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import Input from './Input'
import Dropdown from './Dropdown'

export default {
  name: 'NumberRange',
  components: { Input, Dropdown, VueSlider },
  props: {
    minLimit: {
      type: Number,
      default: 0
    },
    maxLimit: {
      type: Number,
      default: 1000
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: '€'
    }
  },
  data: () => ({
    dropdownOpened: false,
    rangeProcess: dotsPos => [
      [dotsPos[0], dotsPos[1], { backgroundColor: '#1eb386' }]
    ],
    sliderModel: [0, 0]
  }),
  computed: {
    inputData() {
      return this.sliderModel[0] + ' - ' + this.sliderModel[1]
    }
  },
  methods: {
    modelChange(value) {
      this.$emit('chage:range', {min: value[0], max: value[1]})
    }
  },
  mounted() {
    this.sliderModel = [this.min, this.max]
  },
  watch: {
    min(val) {
      this.sliderModel = [val, this.max]
    },
    max(val) {
      this.sliderModel = [this.min, val]
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

.range-input-wrapper {
  display: inline-block;
}

.range-selection-wrapper {
  background-color: @color-white;
  color: @color-dark;
  border: solid 1px @color-gray-300;
  padding: 20px;
  min-width: 200px;

  .min-max-values {
    width: 100%;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .min-value, .max-value {
      width: 40px;
      height: 40px;
      background-color: @color-gray-300;
      border-radius: 3px;
      font-size: 12px;
      line-height: 40px;
      text-align: center;
    }
  }

  .slider-wrapper {
    margin-bottom: 10px;
  }

  .limit-values {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .min-max-input-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .between {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
</style>

