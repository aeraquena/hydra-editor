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
