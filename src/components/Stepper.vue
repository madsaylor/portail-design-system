<template>
  <div class="stepper">
    <slot name="header"></slot>
    <div v-if="value.length">
      <div class="step" :style="{height: `${isMobile ? 40 : 56}px`}">
        <div v-for="(step, index) in value"
             @click="stepIndex = index + 1">
          <Icon :source="isMobile ? 'round' : 'check_circle'"
                :color="getIconColor(index)"
                size="18px"
                padding="3px">
          </Icon>
          <span v-show="!isMobile" :class="getIconColor(index)">
            {{step.name}}
          </span>
          <Icon source="arrow_right"
                :color="getIconColor(index)"
                size="18px"
                padding="3px"
                v-show="!isMobile && index + 1 !== value.length">
          </Icon>
        </div>
      </div>

      <slot :name="activeStepName"></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
  import Icon from './Icon';

  const DesktopWidth = 960;

  export default {
    name: 'Stepper',
    components: {Icon},
    props: {
      value: {
        type: Array
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
        return this.windowWidth < DesktopWidth;
      }
    },
    methods: {
      getIconColor(index) {
        index++;
        return this.stepIndex > index ? 'primary' : this.stepIndex < index ? 'gray-400' : 'dark';
      },
      swipeStep(regulator) {
        let futureStep = this.stepIndex + regulator;

        if (futureStep <= this.value.length && futureStep >= 1) {
          this.stepIndex += regulator;
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$el.addEventListener('touchstart', (event) => {
          this.startX = event.changedTouches[0].pageX;
          event.preventDefault();
        });

        this.$el.addEventListener('touchmove', (event) => {
          event.preventDefault();
        });

        this.$el.addEventListener('touchend', (event) => {
          let endX = event.changedTouches[0].pageX - this.startX;
          if (Math.abs(endX) > this.minDistance) {
            this.swipeStep(endX > 0 ? 1 : -1);
          }
          event.preventDefault()
        })
      });
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
    box-shadow: @shadow-divider;
    margin-bottom: @stepper-step-margin-bottom;
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
