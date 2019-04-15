<template>
  <div class="row-col">
    <h3>Phone Number Input</h3>
    <PhoneNumberInput @onInput="onInput" :inputOptions="{showDialCode: true}" defaultCountry="fr" value="+33 2 34 32 42 34" />
  </div>
</template>

<script>
import PhoneNumberInput from '../../components/PhoneNumberInput.vue'

export default {
  name: "PhoneNumberInputDemo",
  components: {PhoneNumberInput},
  data: () => {
    return {
      phone: {
        number: '',
        isValid: false,
        country: undefined,
      },
    }
  },
  methods: {
    onInput({ number, isValid, country }) {
      this.phone.number = number;
      this.phone.isValid = isValid;
      this.phone.country = country && country.name;
    },
  }
}
</script>
