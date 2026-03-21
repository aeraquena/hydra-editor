osc(
  () => cc[k(2, 1)] * 20,
  () => cc[k(2, 2)],
  () => cc[k(2, 3)] * 10,
)
  .kaleid(() => cc[k(2, 4)] * 10)
  .out(o1);

voronoi(
  () => cc[k(3, 1)] * 20,
  () => cc[k(3, 2)],
  () => cc[k(3, 3)],
)
  .mult(o1, () => cc[k(1, 3)])
  .hue(() => cc[k(1, 7)])
  .saturate(() => cc[k(1, 8)] * 100)
  .kaleid(() => cc[k(1, 5)] * 10)
  .scrollY(0.01, -0.5)
  .scrollX(0.01, -0.5)
  .scale(1.1)
  .modulate(o2, cc[k(1, 2)])
  .scale(() => cc[k(1, 4)] * 5)
  .luma(
    () => cc[s(1)],
    () => cc[s(2)],
  )
  .out(o2);

render(o2);
