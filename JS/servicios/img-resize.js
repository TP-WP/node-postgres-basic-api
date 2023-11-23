const sharp = require("sharp");

async function resizeFile(path) {
    let buffer = await sharp(path)
      .resize(500, 500, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toBuffer();
    return sharp(buffer).toFile(path);
}

module.exports = {resizeFile};