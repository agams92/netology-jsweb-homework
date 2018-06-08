'use strict';

if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    var getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

function createThumbnail(video) {
  return new Promise((done, fail) => {
    const preview = document.createElement('video');
    preview.src = URL.createObjectURL(video);
    preview.addEventListener('loadeddata', () => preview.currentTime = 2);
    preview.addEventListener('seeked', () => {
      const snapshot = document.createElement('canvas');
      const context = snapshot.getContext('2d');
      snapshot.width = preview.videoWidth;
      snapshot.height = preview.videoHeight;
      context.drawImage(preview, 0, 0);
      snapshot.toBlob(done);
    });
  });
}

function record(app) {
  return new Promise((done, fail) => {
    app.mode = 'preparing';
    let recorder;
    let recorded = {
      video: null,
      frame: null
    }
    navigator.mediaDevices.getUserMedia(app.config)
      .then(stream => {
        app.mode = 'recording';
        app.preview.srcObject = stream;
        setTimeout(() => {
          recorder = new MediaRecorder(stream);
          let chunks = [];
          recorder.addEventListener('dataavailable', e => {
            chunks.push(e.data);
          });
          recorder.start(2000);
          setTimeout(() => {
            app.preview.srcObject = null;
            stream.getTracks().forEach(track => track.stop());
            recorder.stop();
            app.mode = 'sending';
            recorded.video = new Blob(chunks, {'type': recorder.mimeType});
            chunks = [];
            recorder = stream = null;
            createThumbnail(recorded.video)
              .then(frame => {
                app.mode = 'sended';
                recorded.frame = frame;
                done(recorded);
              })
              .catch(fail);
          }, app.limit)
        }, 1000)
      })
      .catch(fail);
  });
}
