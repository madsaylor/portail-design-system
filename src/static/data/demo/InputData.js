let usage = `
Basic inputs:<br />
<Input sm label="Small" v-model="textValue"/>
<Input md label="Medium" v-model="textValue"/>
<Input lg label="Large" v-model="textValue"/>
<Input
  md
  help="This is an explanation of what the field is used for."
  icon="search-solid"
  icon-color="gray-500"
  icon-size="18px"
  label="Icon, placeholder and help text"
  placeholder="Search"
  v-model="textValue"
/>
<Input
  sm
  disabled
  label="Disabled input"
  placeholder="Disabled"
  v-model="textValue"
/>
<Input
  md
  label="Input with errors"
  :validators="demoValidators"
  v-model="textValue"
/>

Date inputs:
<Input
  sm
  type="date"
  label="Date input"
  v-model="dateValue"
/>
<Input
  sm
  type="date"
  label="Min and max dates"
  placeholder="Date"
  :minDate="new Date('2019-02-16')"
  :maxDate="new Date('2019-02-25')"
  v-model="dateValue2"
/>
<Input
  sm
  type="date"
  label="N days min/max range"
  :datepickerBorderColorDesktop="borderColor"
  placeholder="Date"
  :dateRange="{min: 5, max: 10}"
  v-model="dateValue3"
/>
<Input
  md
  type="select"
  placeholder="Select a value"
  v-model="textValue"
  :options="[{
    title: 'Hello',
    value: 1,
  }, {
    value: 'World',
  }]"
/>
<Input
  type="checkbox"
  label="Checkbox"
  v-model="textValue"
/>
<Input
  type="radio"
  label="First"
  radioVal="first"
  v-model="radioValue"
/>

<Input sm
       v-model="cvvValue"
       type="number"
       :maxlength="3"
       placeholder="xxx"
       label="CVV"
       help="This is an explanation of what the field is used for."/>
       
<Input v-model="cardNumber"
       type="payment-card"
       :maxlength="19"
       label="Card number"/>

<Input v-model="password"
       type="password"
       :confirmModel="confirmPassword"
       placeholder="Placeholder"
       label="New Password"
       :validators="passwordValidators"
       :show-errors="passwordShowErrors.firstField"
       @lastKeyDownDelay="onlastKeyDownDelay('firstField')"/>

<Input v-model="confirmPassword"
       type="password"
       :confirmModel="password"
       placeholder="Placeholder"
       label="Confirm the new password"
       :validators="confirmPasswordValidators"
       :show-errors="passwordShowErrors.secondField"
       @lastKeyDownDelay="onlastKeyDownDelay('secondField')"/>
`.slice(1)

export default {
  usage
}
