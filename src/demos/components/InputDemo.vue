<template>
  <div class="row-col input-demo">
    <h3>Input</h3>

    A styled input with an ability to set icon and validation.

    <h4>Usage guidlines</h4>
    Input fields can be used either standalone or grouped.

    <p>
      Standalone fields can be in 3 different widths:
    </p>

    <ul>
      <li>Small — 144px</li>
      <li>
        Medium - 252px
      </li>
      <li>
        Large - 464px
      </li>
    </ul>

    <p>
      When used on the same row, there can be only two standalone fields with
      32px margin between them. <br />
      If there is need to use 2 or more fields on the same row that are
      contextually belong together, those fields are called <b>grouped</b>
    </p>

    <p>
      Grouped fields do not have any fixed widths as their width are
      pre-defined by the layout and they always have 16px margin between them.
    </p>

    <h4>Validation</h4>

    <p>
      When input field begin validation, it is emit event <b>@validation</b> <br>
      <i>@return</i> Boolean, is valid field or no.
    </p>

    <p>
      All inputs are listen <b>@validate</b> event, which will run validation inside input,
      even if this input field was not touched.

      <i>@emit</i> event @validation
    </p>

    <p>
      If you need validate some field(s) separately, you can specify
      validation by name property. <br>
      Input with name property will be listen event <b>@validate{name}</b>. <br><br>

      <i>Example:
      <br>
         name: 'test', <br>
         listener = 'validateTest'
      </i>
    </p>
    <Description compnent-name="Input"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="input-component-demo">
      Basic inputs:<br />
      <Input sm label="Small" v-model="textValue"/>
      <Input md label="Medium" v-model="textValue"/>
      <Input lg label="Large" v-model="textValue"/>
      <Input
        md
        help="This is an explanation of what the field is used for."
        icon="search"
        label="Icon, placeholder and help text"
        placeholder="Search"
        v-model="textValue"
      />
      <Input
        md
        help="This is an explanation of what the field is used for."
        iconRight="search"
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
      <Input slideLabel md label="Slide label" v-model="slideTextValue"/>
      <br />

      Date inputs:<br />
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
        sm
        type="date"
        label="Modal"
        datepickerPosition="modal"
        placeholder="Date"
        v-model="dateValue"
      />
      <Input
        sm
        type="date"
        label="Changeable datepicker"
        datepickerPosition="default modal"
        :datepickerBackgroundColor="datepickerBackgroundColor"
        :datepickerBackdropOpacity="datepickerBackdropOpacity"
        :datepickerWrapperStyleObject="datepickerWrapperStyleObject"
        :datepickerFullWidth="datepickerFullWidth"
        :datepickerBorderColorDesktop="borderColor"
        datePositionChangeable
        placeholder="Date"
        v-model="dateValue"
      />
      <br />

      <Input
        md
        type="select"
        placeholder="Select a value"
        label="Select"
        v-model="selectValue"
        :options="[{
          title: 'Hello',
          value: 1,
        }, {
          value: 'World',
        }]"
      />

      <Button alt @click="validate()">
        VALIDATE
      </Button>

      <br />

      Checkbox:<br />
      <Input
        type="checkbox"
        label="Checkbox"
        v-model="textValue"
      />
      <Input
        type="checkbox"
        label="Disabled unchecked"
        disabled
        :value="false"
      />
      <Input
        type="checkbox"
        label="Disabled checked"
        disabled
        :value="true"
      />
      <br />

      Radio:<br />
      <Input
        type="radio"
        label="First"
        radioVal="first"
        v-model="radioValue"
      />

      <Input
        type="radio"
        label="Second"
        radioVal="second"
        v-model="radioValue"
      />

      <Input
        type="radio"
        label="Disabled"
        radioVal="third"
        disabled
        v-model="radioValue"
      />
    </div>
  </div>
</template>

<script>
import Input from '../../components/Input'
import Button from '../../components/Button'
import Description from '../../descriptions/Description'
import Collapser from '../../components/Collapser.vue'
import {InputData} from '../../static/index'

export default {
  name: "InputDemo",
  components: {Input, Button, Description, Collapser},
  data: () => ({
    openUsage: true,
    usage: InputData.usage,
    textValue: '',
    selectValue: {
      value: 1,
      title: 'Hello'
    },
    slideTextValue: 'Test text',
    radioValue: 'first',
    dateValue: new Date(),
    dateValue2: null,
    dateValue3: null,
    demoValidators: [
      {
        name: 'required',
        message: 'The field is required',
        validator: value => !!value
      },
      {
        name: 'long-error',
        message: `
          Long error message: Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nam mollis ullamcorper rutrum. Pellentesque
          rutrum consectetur nulla, eget euismod justo vehicula
        `,
        validator: () => false
      },
    ],
    borderColor: '#e6e7eb',
    datepickerBackgroundColor: '#fff',
    datepickerBackdropOpacity: '0.8',
    datepickerWrapperStyleObject: {
      alignItems: 'flex-end'
    },
    datepickerFullWidth: true
  }),
  methods: {
    validate() {
      const event = new CustomEvent("validate", {});
      document.dispatchEvent(event);
    }
  }
}
</script>

<style lang="less" scoped>
.input-demo {
  .ds-input {
    margin-right: 32px;
    margin-bottom: 60px;
  }
}
</style>
