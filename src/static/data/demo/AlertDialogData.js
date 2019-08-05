import GeneralData from '../GeneralData'

let usage = `
<AlertDialog
  :opened.sync="opened"
  :borderColor="borderColor"
  title="Dialog box title"
>
  <div slot="ds-alert-content">
    ${GeneralData.text}
  </div>
</AlertDialog>
`

export default { usage }
