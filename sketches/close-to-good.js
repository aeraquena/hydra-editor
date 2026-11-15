s0.initImage(
  "https://raw.githubusercontent.com/aeraquena/hydra-editor/main/media/ctg-magfest-logo-2025.png",
);
// s0.initImage("https://raw.githubusercontent.com/aeraquena/hydra-editor/main/media/ctg-pattern1.png")
// s0.initImage("https://raw.githubusercontent.com/aeraquena/hydra-editor/main/media/legacy-disco-ball.png")

// one transform, used for both the image and its mask
const t = (x) => x.scale(0.7, () => Math.cos(time * 0.7), 1).rotate(0, 0.1);

osc(10, 0.1, 1.2)
  //.layer(t(src(s0)))
  .layer(t(src(s0)).mask(t(shape(4, 1, 0.001))))
  .out();
hush();

// 2
// neon blocks

speed = 0.75;

osc(10, 1, 300)
  .color(0.9, 0.7, 0.8)
  .diff(
    osc(() => 45, 0.3, 100)
      .color(0.9, 0.9, 0.9)
      .rotate(0.18)
      .pixelate(() => cc[k(1, 1)] * 10 + 5),
  )
  .scrollX(() => cc[k(1, 2)])
  .luma(
    () => cc[s(1)],
    () => cc[s(2)],
  )
  .modulate(osc(0.1, 1))
  .scale(() => cc[k(1, 3)] * 0.5 + 0.5)
  .out();

// 5
// glitch river

speed = 1;
voronoi(() => cc[k(1, 1)] * 10, 1)
  .mult(
    osc(7, 0.1, () => Math.cos(time) * 3)
      .saturate(2)
      .kaleid(() => cc[k(1, 2)] * 100),
  )
  .modulate(o0, () => cc[k(1, 3)])
  .add(o0, () => cc[k(1, 4)])
  .scrollY(-0.01)
  .scale(0.98)
  .modulate(
    voronoi(() => cc[k(1, 5)] * 10, 1),
    () => cc[k(1, 6)] * 0.05,
  )
  .luma(
    () => cc[s(1)],
    () => cc[s(2)],
  )
  .out(o0);

// 6
// acid bus seat

speed = 1;
osc(() => cc[k(1, 1)] * 200)
  .color(0.5, 0.1, 0.8)
  .rotate(0.11, 0.1)
  .modulate(
    osc(10)
      .rotate(0.3)
      .add(o0, () => cc[k(1, 2)] * 0.2),
  )
  .add(osc(20, 0.01, 1).color(0, 0.8, 1))
  .luma(
    () => cc[s(1)],
    () => cc[s(2)],
  )
  .out(o0);
osc(50, 0.05, 0.7)
  .color(1, 0.7, 0.5)
  .diff(o0)
  .modulate(o1, () => cc[k(1, 3)] * 0.1)
  .luma(
    () => cc[s(3)],
    () => cc[s(4)],
  )
  .scale(() => cc[k(1, 4)] * 5)
  .out(o1);
render(o1);

// 7
// clouds

hush();
speed = 1.5;
shape([4, 5, 6].fast(0.1).smooth(1), 0.000001, [0.2, 0.7].smooth(1))
  .color(0.2, 0.4, 0.3)
  .scrollX(() => Math.sin(time * 0.27))
  .add(
    shape(
      [4, 5, 6].fast(0.1).smooth(1),
      0.000001,
      [0.2, 0.7, 0.5, 0.3].smooth(1),
    )
      .color(0.6, 0.2, 0.5)
      .scrollY(() => cc[k(1, 1) * 0.1])
      .scrollX(() => Math.sin(time * 0.33)),
  )
  .add(
    shape([4, 5, 6].fast(0.1).smooth(1), 0.000001, [0.2, 0.7, 0.3].smooth(1))
      .color(0.2, 0.4, 0.6)
      .scrollY(-0.35)
      .scrollX(() => Math.sin(time * 0.41) * -1),
  )
  .add(
    src(o0)
      .shift(0.001, 0.01, 0.001)
      .scrollX([0.05, -0.05].fast(0.1).smooth(1))
      .scale(
        [1.05, 0.9].fast(0.3).smooth(1),
        [1.05, 0.9, 1].fast(0.29).smooth(1),
      ),
    () => cc[k(1, 2)] * 0.75,
  )
  .luma(
    () => cc[s(1)],
    () => cc[s(2)],
  )
  .scale(() => cc[k(1, 3)])
  .out();

// 8
// noisy neon port

osc(5, 0.9, 0.001)
  .kaleid([3, 4, 5, 7, 8, 9, 10].fast(0.1))
  .color(
    () => cc[k(2, 1)],
    () => cc[k(2, 2)],
  )
  .colorama(() => cc[k(1, 1)])
  .rotate(0.009, () => Math.sin(time) * -0.001)
  .modulateRotate(o0, () => Math.sin(time) * 0.003)
  .modulate(o0, () => cc[k(1, 2)])
  .scale(() => cc[k(1, 3)])
  .luma(
    () => cc[s(1)],
    () => cc[s(2)],
  )
  .out(o0);
