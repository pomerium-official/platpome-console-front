import { useEffect, useRef } from 'react';

/**
 * 백그라운드 이미지를 잘라 무작위로 애니메이션효과를 보여줍니다.
 */
export const useRandomAnimationImageBackground = () => {
  const refTopVisual = useRef<HTMLElement>(null);

  useEffect(() => {
    const imgEffectEl = refTopVisual.current;

    if (imgEffectEl === null) return;

    let imgHtml = ``;
    let rows;
    let columns;
    let style: string[] | string | undefined;
    let customEffect = false;
    const effectType = [
      'fadeIn',
      'inRight',
      'inRight2',
      'inRight3',
      'inRotate',
      'inScale',
      'inSkew',
      'inMix',
      'inMixCustom',
      'inRotateCustom',
      'inRotateCustom2',
      'inScaleCustom',
      'cover3d',
      'xRotate3d',
      'yRotate3d',
    ];
    const randomNumber = Math.floor(Math.random() * effectType.length);
    const thisType = effectType[randomNumber];

    switch (thisType) {
      case 'fadeIn':
        rows = 4;
        columns = 8;
        style = '';
        break;

      case 'inRight':
        rows = 4;
        columns = 8;
        style = 'transform:translateX(100%);';
        break;

      case 'inRight2':
        rows = 4;
        columns = 1;
        style = 'transform:translateX(100%);';
        break;

      case 'inRight3':
        rows = 1;
        columns = 4;
        style = 'transform:translateX(100%);';
        break;

      case 'inRotate':
        rows = 4;
        columns = 8;
        style = 'transform:rotate(90deg);';
        break;

      case 'inScale':
        rows = 4;
        columns = 8;
        style = 'transform:scale(0.2);';
        break;

      case 'inSkew':
        rows = 4;
        columns = 8;
        style = 'transform:skew(40deg);';
        break;

      case 'inMix':
        rows = 2;
        columns = 4;
        style = 'transform:scale(0.2) skew(40deg) rotate(90deg);';
        break;

      case 'inMixCustom':
        rows = 1;
        columns = 4;
        style = [];
        style[0] =
          'transform-origin: 0% 50%; transform: scale(0.2) skew(40deg) rotate(20deg); transition-delay:.3s;';
        style[1] =
          'transform-origin: 0% 50%; transform: scale(0.2) skew(40deg) rotate(-20deg); transition-delay:.3s;';
        style[2] =
          'transform-origin: 100% 100%; transform: scale(0.2) skew(60deg) rotate(-40deg); transition-delay:1.2s;';
        style[3] =
          'transform-origin: 0% 100%; transform: scale(0.2) skew(-60deg) rotate(40deg); transition-delay:1.2s;';
        customEffect = true;
        break;

      case 'inRotateCustom':
        rows = 1;
        columns = 4;
        style = [];
        style[0] =
          'transform-origin: 0% 50%; transform: rotate(20deg); transition-delay:.3s;';
        style[1] =
          'transform-origin: 0% 50% ; transform: rotate(-10deg); transition-delay:.1s;';
        style[2] =
          'transform-origin: 0% 50% ; transform: rotate(10deg); transition-delay:.7s;';
        style[3] =
          'transform-origin: 0% 50% ; transform: rotate(-15deg); transition-delay:1.2s;';
        customEffect = true;
        break;

      case 'inRotateCustom2':
        rows = 1;
        columns = 4;
        style = [];
        style[0] =
          'transform-origin: 0% 50%; transform: rotateX(-90deg); transition-delay:.3s;';
        style[1] =
          'transform-origin: 0% 50%; transform: rotateX(-90deg); transition-delay:.1s;';
        style[2] =
          'transform-origin: 0% 50%; transform: rotateX(-90deg); transition-delay:.7s;';
        style[3] =
          'transform-origin: 0% 50%; transform: rotateX(-90deg); transition-delay:1.2s;';
        customEffect = true;
        break;

      case 'inScaleCustom':
        rows = 1;
        columns = 4;
        style = [];
        style[0] =
          'transform-origin: 0% 50%; transform: scale(0.1); transition-delay:.3s;';
        style[1] =
          'transform-origin: 0% 50% ; transform: scale(0.2); transition-delay:.1s;';
        style[2] =
          'transform-origin: 0% 50% ; transform: scale(0.3); transition-delay:.7s;';
        style[3] =
          'transform-origin: 0% 50% ; transform: scale(0.7); transition-delay:1.2s;';
        customEffect = true;
        break;

      case 'cover3d':
        rows = 1;
        columns = 2;
        style = [];
        style[0] =
          'transform-style: preserve-3d; transform-origin: 0% 50%; transform:perspective(450px) rotateY(80deg); transition-duration: 3s;';
        style[1] =
          'transform-style: preserve-3d; transform-origin: 100% 50% ; transform:perspective(450px) rotateY(-80deg); transition-duration: 3s;';
        customEffect = true;
        break;

      case 'xRotate3d':
        rows = 1;
        columns = 4;
        style = [];
        style[0] =
          'transform-style: preserve-3d; transform-origin: 0% 50%; transform:perspective(450px) rotateX(-100deg); transition-delay:.3s;';
        style[1] =
          'transform-style: preserve-3d; transform-origin: 0% 50%; transform:perspective(450px) rotateX(-100deg); transition-delay:.1s;';
        style[2] =
          'transform-style: preserve-3d; transform-origin: 0% 50%; transform:perspective(450px) rotateX(-100deg); transition-delay:.7s;';
        style[3] =
          'transform-style: preserve-3d; transform-origin: 0% 50%; transform:perspective(450px) rotateX(-100deg); transition-delay:1.2s;';
        customEffect = true;
        break;

      case 'yRotate3d':
        rows = 1;
        columns = 4;
        style = [];
        style[0] =
          'transform-style: preserve-3d; transform-origin: 0% 50%; transform:perspective(450px) rotateY(-140deg) scale(0.5); transition-delay:.3s;';
        style[1] =
          'transform-style: preserve-3d; transform-origin: 0% 50%; transform:perspective(450px) rotateY(-140deg) scale(0.5); transition-delay:.6s;';
        style[2] =
          'transform-style: preserve-3d; transform-origin: 0% 50%; transform:perspective(450px) rotateY(-140deg) scale(0.5); transition-delay:.9s;';
        style[3] =
          'transform-style: preserve-3d; transform-origin: 0% 50%; transform:perspective(450px) rotateY(-140deg) scale(0.5); transition-delay:1.2s;';
        customEffect = true;
        break;
    }

    if (rows === undefined || columns === undefined || style === undefined) {
      return;
    }

    const rowsHeight = 100 / rows + '%';
    const columnsWidth = 100 / columns + '%';
    const imgWidth = 100 * columns + '%';
    const imgHeight = 100 * rows + '%';

    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        const delaySpeed = (columns - j - i * 0.5) * 0.05;
        const left = -j * 100 + '%';
        const top = -i * 100 + '%';

        if (!customEffect) {
          imgHtml += `
					<div class="img-box" style="${style}; width:${columnsWidth}; height:${rowsHeight}; transition-delay: ${delaySpeed}s; ">
						<div class="img-position" style="width:${imgWidth}; height: ${imgHeight}; left: ${left}; top: ${top};"></div>
					</div>`;
        } else {
          imgHtml += `
					<div class="img-box" style="${style[j]}; width:${columnsWidth}; height:${rowsHeight}; transition-delay: ${delaySpeed}s; ">
						<div class="img-position" style="width:${imgWidth}; height: ${imgHeight}; left: ${left}; top: ${top};"></div>
					</div>`;
        }
      }
    }
    imgEffectEl.insertAdjacentHTML('beforeend', imgHtml);
    const imgBoxEls = imgEffectEl.querySelectorAll('.img-box');
    setTimeout(function () {
      imgBoxEls.forEach((imgBoxEl) => imgBoxEl.classList.add('active'));
      window.scrollTo(0, 0);
    }, 200);

    return () => {
      imgBoxEls.forEach((el) => el.remove());
    };
  }, [refTopVisual]);

  return refTopVisual;
};
