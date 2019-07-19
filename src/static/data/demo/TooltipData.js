let usage = `
<Tooltip popoverWidth="500px">
  <div slot="popover">
    This is a tooltip content
  </div>
  <div slot="reference">
    <Button></Button>
  </div>
</Tooltip>

<Tooltip type="mini">
  <div>This is the mini Tooltip content</div>
  <div>Second line of mini tooltip</div>
</Tooltip>
`.slice(1)

export default {
  usage
}
