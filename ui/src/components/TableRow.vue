<template>
  <tr class="row" :class="{'row_copied': isCopied.state}">
    <td class="col__1" @click="copyInvoiceNumber('A')">{{ item['A'] }}</td>
    <td class="col__2">{{ item['B'].toFixed(2) }}</td>
  </tr>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue';

const props = defineProps({
  item: Object,
})

const emit = defineEmits(['copied']);

const isCopied = ref({state: false});

function copyInvoiceNumber(colId) {
  const cellText = props.item[colId];
  if (cellText.includes('Рахунок')) {
    const pattern = /( \d* )/gm;
    if (cellText.match(pattern).length) {
      const invoiceNumber = cellText.match(pattern)[0].trim();
      isCopied.value.state = true;
      navigator.clipboard.writeText(invoiceNumber);
      emit('copied', invoiceNumber);
      console.warn('Copy...', invoiceNumber)
    }
  }
}

</script>

<style>
.row {
  padding-bottom: 5px;
}

.row:hover {
  cursor: pointer;
  background-color: darkgrey;
}

.row_copied {
  background-color: rgb(50, 137, 108);
}

.col__1 {
  padding-right: 15px;
}

.col__2 {
  text-align: right;
}
</style>