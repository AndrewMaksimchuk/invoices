const closeServer = () => fetch('/close');

const loadData = async () => {
  try {
    const res = await fetch('/data');
    const data = await res.json();
    console.table(data);
  } catch (error) {
    // closeServer()
    alert('ERROR');
  }
}

window.addEventListener("beforeunload", () => closeServer());
window.addEventListener('DOMContentLoaded', () => loadData());
