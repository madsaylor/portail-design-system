let usage = `
<Pagination :count="count"
            :size="size"
            :current="current">
    <template v-slot="slotProps">
      <Table v-model="clients"
             :range="slotProps.range"
             :ratios="ratios"
             :identifierField="identifierField">
      </Table>
    </template>
</Pagination>
`.slice(1)

export default {
  usage
}
