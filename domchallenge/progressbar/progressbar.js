{
  /* <div class="container">
  <div class="progress-bar"></div>
</div>
<div>Queued bars: <span class="queued">0</span></div>
<button onclick="loadBar(1)">Load</button> 

.container {
  width: 300px;
  height: 50px;
  background-color: #D3D3D3;
}

.progress-bar {
  width: 0%;
  height: 50px;
  background-color: #90EE90;
} */
}

const bar = document.querySelector(".progress-bar");
const queued = document.querySelector(".queued");

let loading = false;
let count = 0;

function tick(timestamp, dist, duration) {
  const runtime = timestamp - starttime;
  let progress = runtime / duration;
  progress = Math.min(progress, 1);
  bar.style.width = `${dist * progress}%`;
  if (runtime > duration) {
    loading = false;
    count--;
    loadBar(0);
    return;
  }
  requestAnimationFrame(function (timestamp) {
    tick(timestamp, dist, duration);
  });
}

function loadBar(increment) {
  count += increment;
  queued.innerText = count;
  if (loading === true || count < 1) {
    return;
  }
  bar.style.width = 0;
  loading = true;
  requestAnimationFrame(function (timestamp) {
    starttime = timestamp;
    tick(timestamp, 100, 3000);
  });
}
