<!--
  Stepper

  Usage:

    <Step v-model="steps">
      <template #header></template>
      <template #step-1>
        <Card class="dashboard-report">
          <div class="report-title">
            Chiffre d'affaires réalisé en 2018
          </div>
          <div class="report-amount green">
            <Icon arrow_upward></Icon>95,00 €
          </div>
          <div class="report-subtitle">
            dont 0,00 € ce mois-ci
          </div>
        </Card>
      </template>
      <template #step-2>
        <Icon account_circle size="12px" padding="30px 2px" />
        <Icon account_circle size="16px" padding="28px 2px" color="primary" />
        <Icon account_circle padding="24px 2px" color="blue"/>
        <Icon account_circle size="36px" padding="18px 2px" color="red" />
        <Icon account_circle size="52px" padding="10px 2px" color="gray-400" />
        <Icon account_circle size="72px" color="#55aaff" />
      </template>
      <template #step-3>
        <Input sm label="Small"/>
        <Input md label="Medium"/>
        <Input lg label="Large"/>
      </template>
      <template #footer></template>
    </Step>

  Properties:

    value - Array<Object> Steps to display on the Stepper. Where objects look like:
      [{
        name: String           - Displayed step name
      }, {
        ...
      }]
-->

<template>
  <div class="stepper">
    <slot name="header"></slot>
    <div v-if="value.length">
      <div class="step" :style="{height: `${isMobile ? 40 : 56}px`}">
        <div v-for="(step, index) in value"
             @click="nextStep(index + 1)">
          <Icon :source="isMobile ? 'round' : 'check_circle'"
                :color="getIconColor(index)"
                size="18px"
                padding="3px">
          </Icon>
          <span v-if="!isMobile" :class="getIconColor(index)">
            {{step.name}}
          </span>
          <Icon source="arrow_right"
                :color="getIconColor(index)"
                size="18px"
                padding="3px"
                v-if="!isMobile && index + 1 !== value.length">
          </Icon>
        </div>
      </div>

      <slot :name="activeStepName"></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
  import Icon from './Icon'

  const DesktopWidth = 960

  export default {
    name: 'Stepper',
    components: {Icon},
    props: {
      value: {
        type: Array
      },
      selectedStep: {
        default: 1,
        type: Number
      }
    },
    data: () => ({
      windowWidth: window.innerWidth,
      stepIndex: 1,
      startX: undefined,
      minDistance: 100
    }),
    computed: {
      activeStepName() {
        return `step-${this.stepIndex}`
      },
      isMobile() {
        return this.windowWidth <= DesktopWidth
      }
    },
    methods: {
      getIconColor(index) {
        switch (true) {
          case(this.stepIndex > index + 1):
            return 'primary'
          case(this.stepIndex === index + 1):
            return 'dark'
          default:
            return 'gray-400'
        }
      },

      nextStep(index) {
        this.stepIndex = index;
        this.$emit('current:step', this.stepIndex)
      },

      swipeStep(regulator) {
        let futureStep = this.stepIndex + regulator

        if (futureStep <= this.value.length && futureStep >= 1) {
          this.stepIndex += regulator
        }
      },

      touchStart(event) {
        this.startX = event.changedTouches[0].pageX
        event.preventDefault()
      },

      touchEnd(event) {
        let endX = event.changedTouches[0].pageX - this.startX
        if (Math.abs(endX) > this.minDistance) {
          this.swipeStep(endX > 0 ? 1 : -1)
        }
        event.preventDefault()
      },

      onResize() {
        this.windowWidth = window.innerWidth
      }
    },
    watch: {
      selectedStep(val) {
        if (this.value.length < val) {
          this.stepIndex = 1
          this.$emit('current:step', this.stepIndex)
        } else if (val < 1) {
          this.stepIndex = this.value.length
          this.$emit('current:step', this.stepIndex)
        } else {
          this.stepIndex = val
        }
      }
    },
    mounted() {
      window.addEventListener('resize', this.onResize)

      this.$el.addEventListener('touchstart', this.touchStart)
      this.$el.addEventListener('touchend', this.touchEnd)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize)
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .step {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @color-white;
    box-shadow: @card-shadow;
    margin-bottom: @stepper-step-margin-bottom;
    cursor: pointer;
  }

  .primary {
    color: @color-primary;
  }
  .gray-400 {
    color: @color-gray-400;
  }
  .dark {
    color: @color-dark;
  }
</style>
