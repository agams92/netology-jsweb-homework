const ctx = document.getElementById('chart').getContext('2d');
const realtime = new Chart(ctx).Bar({
  labels: [],
  datasets: [{
    fillColor: 'rgba(0,60,100,1)',
    strokeColor: 'black',
    data: []
  }]
}, {
  responsive: true,
  barValueSpacing: 2
});

let isFirst = true;
const ws = new WebSocket('wss://neto-api.herokuapp.com/realtime');
ws.addEventListener('message', event => {
  let users = JSON.parse(event.data);
  if (isFirst) {
    users
      .forEach(data => realtime.addData([Number(data.online)], data.time));
    isFirst = false;
  } else {
    const {time, online} = users;
    realtime.removeData();
    realtime.addData([Number(online)], time);
  }
});