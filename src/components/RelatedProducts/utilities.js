// Utilities functions for RelatedProducts and YourOutfit components

const helpers = {
  getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  },

  numCardsThatFit (screenWidth) {
    let num = Math.floor(screenWidth / 408);

    if (num > 4) {
      return 4;
    }

    if (num < 1) {
      return 1;
    }

    return num;
  }
}

export default helpers;

