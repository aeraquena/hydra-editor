noise(
  () => cc[k(3, 1)] * 10,
  () => cc[k(3, 2)],
)
  .luma(
    () => cc[s(5)],
    () => cc[s(6)],
  )
  .out(o0);

osc(
  () => cc[k(1, 1)] * 10,
  () => cc[k(1, 2)],
  () => cc[k(1, 3)] * 10,
)
  .color(
    () => cc[k(1, 4)],
    () => cc[k(1, 5)],
    () => cc[k(1, 6)],
  )
  .modulate(o0)
  //.rotate(() => cc[k(1,2)] * 10)
  .modulate(o1, () => cc[k(1, 7)])
  .modulate(o2, () => cc[k(1, 8)])
  //.diff(o3)
  .luma(
    () => cc[s(1)],
    () => cc[s(2)],
  )
  .out(o1);

voronoi(
  () => cc[k(2, 1)] * 10,
  () => cc[k(2, 2)] * 0.05,
  () => cc[k(2, 3)],
)
  .mult(osc(7, 0.1, 10))
  .kaleid(() => cc[k(2, 8)])
  .saturate(2)
  .scrollY(0.01, -1)
  .scale(0.98)
  .modulate(o2, cc[k(2, 7)])
  .luma(
    () => cc[s(3)],
    () => cc[s(4)],
  )
  .out(o2);

render();
