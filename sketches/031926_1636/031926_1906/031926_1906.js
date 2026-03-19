noise(
  () => cc[k(2, 1)],
  () => cc[k(2, 2)],
).out(o3);

osc(
  () => cc[k(3, 1)] * 50,
  () => cc[k(3, 2)],
  () => cc[k(3, 3)] * 10,
)
  .color(
    () => cc[k(3, 4)],
    () => cc[k(3, 5)],
    () => cc[k(3, 6)],
  )
  .luma(
    () => cc[s(3)],
    () => cc[s(4)],
  )
  .out(o2);

voronoi(
  () => cc[k(1, 1)],
  () => cc[k(1, 2)],
  () => cc[k(1, 3)],
)
  .mult(o2, () => cc[k(1, 7)])
  //.hue(() => cc[k(1,8)])
  .saturate(10)
  .kaleid(() => cc[k(1, 6)])
  .rotate(() => cc[k(1, 4)])
  .scrollY(0.01, 1)
  .scale(1.01)
  .modulate(o0, () => cc[k(1, 5)])
  //.modulate(o3, () => cc[k(2,3)])
  .luma(
    () => cc[s(1)],
    () => cc[s(2)],
  )
  .out(o0);

render(o0);
