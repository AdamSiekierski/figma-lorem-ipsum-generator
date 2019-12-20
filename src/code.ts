import { loremIpsum } from 'lorem-ipsum'

figma.showUI(__html__)
figma.ui.resize(300, 100)

figma.ui.onmessage = msg => {
  if (msg.type = 'createText') {
    const nodes:SceneNode[] = [];
    const text:TextNode = figma.createText();

    figma.loadFontAsync({
      family: 'Roboto',
      style: 'Regular'
    }).then(() => {
      text.characters = loremIpsum({ count: msg.count, units: 'sentences' });
      nodes.push(text);

      if (figma.currentPage.selection[0] && figma.currentPage.selection[0].type === "FRAME") {
        // @ts-ignore
        figma.currentPage.selection[0].appendChild(text);

        if (text.width > figma.currentPage.selection[0].width) {
          text.resize(figma.currentPage.selection[0].width, 10);
          text.textAutoResize = "HEIGHT";
        }
      } else {
        if (text.width > 1000) {
          text.resize(1000, 15);
          text.textAutoResize = "HEIGHT";
        }
      }

      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);

      figma.closePlugin();
    })
  }
}
