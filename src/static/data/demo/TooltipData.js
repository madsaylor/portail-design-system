let usage = `
<Tooltip
  popoverWidth="200px"
  placement="left"
  class="default-tooltip"
  :forceShow="forceShow"
  @update:forceShow="forceShowUpdate"
  @onMouseOver="onMouseOver"
  @onMouseOut="onMouseOut"
>
  <div slot="popover">This is a tooltip content</div>
  <div slot="reference">
    <Button>Left</Button>
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
