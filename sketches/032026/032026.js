osc(
  () => cc[k(2, 1)] * 60,
  () => cc[k(2, 2)],
  () => cc[k(2, 3)] * 10,
)
  .hue(() => cc[k(2, 4)])
  //.luma(() => cc[s(3)], () => cc[s(4)])
  .out(o1);

//shape(() => cc[k(1,1)] * 8)
voronoi(
  () => cc[k(1, 1)] * 10,
  () => cc[k(1, 2)],
  () => cc[k(1, 3)],
)
  .rotate(() => cc[k(1, 4)] * 60)
  .kaleid(() => cc[k(1, 8)] * 5)
  .scrollY(-0.01, 1)
  .scale(1.01)
  .mult(o1, () => cc[k(1, 5)])
  .saturate(10)
  .modulate(
    o0,
    () => cc[k(1, 6)],
    () => cc[k(1, 7)],
  )
  .scale(() => cc[s(5)] * 2)
  .luma(
    () => cc[s(1)],
    () => cc[s(2)],
  )
  .out(o0);

render(o0);
