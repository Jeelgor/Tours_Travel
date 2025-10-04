import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 100 }, // Ramp up to 100 users
    { duration: "30s", target: 500 }, // Ramp up to 500 users
    { duration: "1m", target: 1000 }, // Peak at 1000 users
    { duration: "30s", target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<800"], // 95% requests should be <800ms
    http_req_failed: ["rate<0.05"], // <5% of requests should fail
  },
};

export default function () {
  const urls = ["https://portfolio-lilac-xi-98.vercel.app/"];

  let res = http.get(urls[Math.floor(Math.random() * urls.length)]);

  check(res, {
    "status was 200": (r) => r.status === 200,
    "response time < 1s": (r) => r.timings.duration < 1000,
  });

  sleep(1); // Simulate user pause
}
