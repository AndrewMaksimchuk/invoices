<template>
  <table>
    <tbody>
      <table-row v-for="(item, index) in data" :key="index" :item="item" @copied="showSuccessNotification"/>
    </tbody>
  </table>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import TableRow from './components/TableRow.vue'
import swal from 'sweetalert2';

const data = ref([]);

onBeforeMount(() => {
  window.addEventListener("beforeunload", () => fetch('/close'));
  getData();
});

async function getData() {
  try {
    const res = await fetch('/data');
    data.value = await res.json();
    if (data.value.length === 0) showMissingFileNotification();
  } catch (error) {
    console.error(error);
    showErrorNotification();
  }
}

function showSuccessNotification(invoiceNumber) {
  swal.fire({
    titleText: 'Номер рахунка скопійовано!',
    text: invoiceNumber,
    showConfirmButton: false,
    position: 'top-end',
    backdrop: false,
    icon: "success",
    width: '300px',
    timer: 3000,
  });
}

function showErrorNotification() {
  swal.fire({
    titleText: 'Сталася помилка при запросі!',
    text: 'Деталі у консолі розробника',
    showConfirmButton: false,
    backdrop: false,
    icon: "error",
  });
}

function showMissingFileNotification() {
  swal.fire({
    titleText: 'Файл із даними відсутній!',
    text: 'Можливо забули скопіювати його у папку з програмою, перевірте',
    showConfirmButton: false,
    backdrop: false,
    icon: "error",
  });
}

</script>

<style>
table {
  border-collapse: collapse;
}
</style>