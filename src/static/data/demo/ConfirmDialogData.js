import GeneralData from '../GeneralData'

let usage = `
<ConfirmDialog
  :opened.sync="opened"
  :borderColor="borderColor"
  title="Dialog box title"
>
  <div slot="ds-confirm-content">
    ${GeneralData.text}
  </div>
</ConfirmDialog>
`

export default { usage }
