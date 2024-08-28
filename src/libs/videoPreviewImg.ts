// 출처- https://github.com/Rajesh-Royal/vThumb.js/blob/master/src/index.ts
// 썸네일 하나만 가져오는 함수가 export 되어있지 않아서 복사해서 사용함
/**
 * @description
 * This function takes an VideoFile and Timeframe as an Input and returns the `base64` image of that particular timeFrame of video.
 * - It create video element and play it at the given time then,
 * - Create an svg element and draws the current frame of video on to svg.
 * - This svg then get converted to dataURI and sent as response.
 *
 * @param {File} file The video file
 * @param {number} videoTimeInSeconds Timeframe of video [at this particular time the thumbnail will be generated]
 * @returns {string} Returns an Array of `base64` Images
 */
export const getVideoThumbnail = (
  file: File | string,
  videoTimeInSeconds: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if ((file as File)?.type?.match('video')) {
      importFileandPreview(file as File).then((urlOfFIle) => {
        getVideoCover(urlOfFIle, videoTimeInSeconds).then((res) => {
          resolve(res);
        });
      });
    } else if (file) {
      getVideoCover(file as string, videoTimeInSeconds)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject('file not valid');
    }
  });
};

/**
 * @description
 * Convert an Asset File to object URI for better performance
 * - A user can use this url as a resource url
 *      - For example it can be used as src of image, video tag.
 *
 * Refer to this link for more detailed information
 * https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
 *
 * @param {File} file  The video file
 * @param {boolean} revoke If true the object uri will be removed after its creation
 * @returns {string} window object url ex. https://blob:video58699
 *
 */

export const importFileandPreview = (
  file: File,
  revoke?: boolean
): Promise<string> => {
  return new Promise((resolve) => {
    window.URL = window.URL || window.webkitURL;
    const preview = window.URL.createObjectURL(file);
    // remove reference
    if (revoke) {
      window.URL.revokeObjectURL(preview);
    }
    setTimeout(() => {
      resolve(preview);
    }, 10);
  });
};

/**
 * @ref - https://stackoverflow.com/questions/23640869/create-thumbnail-from-video-file-via-file-input
 *
 * @param {string} urlOfFIle
 * @param {number} seekTo - sktip to the frame by default
 * @returns {string} base64 image string
 */
export const getVideoCover = (
  urlOfFIle: string,
  seekTo = 0.0
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // load the file to a video player
      const videoPlayer = document.createElement('video');
      // videoPlayer.setAttribute('src', URL.createObjectURL(urlOfFIle));
      videoPlayer.setAttribute('src', urlOfFIle);
      videoPlayer.crossOrigin = 'Anonymous';
      videoPlayer.load();
      videoPlayer.addEventListener('error', (ex) => {
        reject(`error when loading video file ${ex}`);
      });
      // load metadata of the video to get video duration and dimensions
      videoPlayer.addEventListener('loadedmetadata', () => {
        // seek to user defined timestamp (in seconds) if possible
        if (videoPlayer.duration < seekTo) {
          reject('video is too short.');
          return;
        }
        // delay seeking or else 'seeked' event won't fire on Safari
        setTimeout(() => {
          videoPlayer.currentTime = seekTo;
        }, 200);
        // extract video thumbnail once seeking is complete
        videoPlayer.addEventListener('seeked', () => {
          // console.log('video is now paused at %ss.', seekTo);
          // define a canvas to have the same dimension as the video
          const canvas = document.createElement('canvas');
          canvas.width = videoPlayer.videoWidth;
          canvas.height = videoPlayer.videoHeight;
          // draw the video frame to canvas
          const ctx = canvas.getContext('2d');
          ctx!.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
          // return the canvas image as a blob
          // then convert it to base 64
          ctx!.canvas.toBlob(
            (blob) => {
              const reader = new FileReader();
              reader.readAsDataURL(blob as Blob);
              reader.onloadend = function () {
                const base64data = reader.result;
                resolve(base64data as string);
              };
            },
            'image/jpeg',
            1 /* quality */
          );
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};
