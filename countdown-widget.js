const title = "JLPT N3";
const targetDate = new Date("2025-12-07");

const now = new Date();
const totalDays = 300;
const cols = 30;
const rows = Math.ceil(totalDays / cols);
const daysLeft = Math.max(0, Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24)));
const daysPassed = Math.min(totalDays, totalDays - daysLeft);

let widget = new ListWidget();
widget.backgroundColor = new Color("#9FB1AF");

const widgetWidth = 600;
const widgetHeight = 300;
const canvasWidth = widgetWidth * 1.1;
const canvasHeight = widgetHeight * 0.75;

const dotSpacingX = canvasWidth / cols;
const dotSpacingY = canvasHeight / rows;
const dotDiameter = Math.min(dotSpacingX, dotSpacingY) * 0.7;

const draw = new DrawContext();
draw.size = new Size(canvasWidth, canvasHeight);
draw.opaque = false;

for (let i = 0; i < totalDays; i++) {
  const col = i % cols;
  const row = Math.floor(i / cols);
  const centerX = col * dotSpacingX + dotSpacingX / 2;
  const centerY = row * dotSpacingY + dotSpacingY / 2;
  const color = i < daysPassed ? Color.white() : new Color("#C1C9C8");
  draw.setFillColor(color);
  draw.fillEllipse(new Rect(
    centerX - dotDiameter / 2,
    centerY - dotDiameter / 2,
    dotDiameter,
    dotDiameter
  ));
}

const img = draw.getImage();
const imageStack = widget.addStack();
imageStack.layoutHorizontally();
let imgView = imageStack.addImage(img);
imgView.resizable = true;
imgView.widthWeight = 1.0;

widget.addSpacer(8);

let footer = widget.addStack();
footer.layoutHorizontally();

let leftText = footer.addText(title);
leftText.font = Font.semiboldSystemFont(14);
leftText.textColor = Color.white();

footer.addSpacer();

let rightText = footer.addText(daysLeft + " days left");
rightText.font = Font.systemFont(14);
rightText.textColor = Color.white();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}

Script.complete();
