let usage = `
<Button big>Big</Button>&nbsp;
<Button icon="add">Left Icon</Button>&nbsp;
<Button icon-right="expand_more">Right Icon</Button>&nbsp;
<Button alt>Alt</Button>&nbsp;
<Button icon="add" alt>Alt icon</Button>&nbsp;
<Button plain>Plain </Button>&nbsp;
<Button disabled>Disabled</Button>&nbsp;
<Button icon="menu" big plain></Button>&nbsp;
<Button icon="menu" big></Button>&nbsp;
<Button icon="menu" plain></Button>&nbsp;
<Button icon="menu"></Button>&nbsp;
<!-- OR -->
<button class="ds-button ds-button-primary">
  Button Label
</button>
`.slice(1)

export default {
  usage
}
