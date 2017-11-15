export function imageFilter(srcImageData: any, range = 5, levels = 180) {
  const srcPixels    = srcImageData.data,
    srcWidth     = srcImageData.width,
    srcHeight    = srcImageData.height,
    dstImageData = new ImageData(srcWidth, srcHeight),
    dstPixels    = dstImageData.data;

  const rh = [],
    gh = [],
    bh = [],
    rt = [],
    gt = [],
    bt = [];

  let index = 0, x, y, i, row, col,
    rowIndex, colIndex, offset, srcIndex,
    sr, sg, sb, ri, gi, bi,
    r, g, b;

  for (y = 0; y < srcHeight; y += 1) {
    for (x = 0; x < srcWidth; x += 1) {
      for (i = 0; i < levels; i += 1) {
        rh[i] = gh[i] = bh[i] = rt[i] = gt[i] = bt[i] = 0;
      }

      for (row = -range; row <= range; row += 1) {
        rowIndex = y + row;

        if (rowIndex < 0 || rowIndex >= srcHeight) {
          continue;
        }

        offset = rowIndex * srcWidth;

        for (col = -range; col <= range; col += 1) {
          colIndex = x + col;
          if (colIndex < 0 || colIndex >= srcWidth) {
            continue;
          }

          srcIndex = (offset + colIndex) << 2;
          sr = srcPixels[srcIndex];
          sg = srcPixels[srcIndex + 1];
          sb = srcPixels[srcIndex + 2];
          ri = (sr * levels) >> 8;
          gi = (sg * levels) >> 8;
          bi = (sb * levels) >> 8;
          rt[ri] += sr;
          gt[gi] += sg;
          bt[bi] += sb;
          rh[ri] += 1;
          gh[gi] += 1;
          bh[bi] += 1;
        }
      }

      r = g = b = 0;
      for (i = 1; i < levels; i += 1) {
        if (rh[i] > rh[r]) {
          r = i;
        }
        if (gh[i] > gh[g]) {
          g = i;
        }
        if (bh[i] > bh[b]) {
          b = i;
        }
      }

      dstPixels[index]     = rt[r] / rh[r] | 0;
      dstPixels[index + 1] = gt[g] / gh[g] | 0;
      dstPixels[index + 2] = bt[b] / bh[b] | 0;
      dstPixels[index + 3] = srcPixels[index + 3];
      index += 4;
    }
  }

  return dstImageData;
}
