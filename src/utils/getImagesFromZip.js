import JSZip from 'jszip';
import { cachedFetch } from '@/utils';

export default function getImagesFromZip(zipURL) {
  return new Promise(resolve => {
    cachedFetch(zipURL, {
      blob: true
    })
      .then(JSZip.loadAsync)
      .then(zip => {
        const re = /(.jpg|.png|.gif|.ps|.jpeg)$/;
        const promises = Object.keys(zip.files)
          .filter(fileName => {
            // don't consider non image files
            return re.test(fileName.toLowerCase());
          })
          .map(fileName => {
            const file = zip.files[fileName];
            return file.async('blob').then(blob => {
              return [
                fileName, // keep the link between the file name and the content
                URL.createObjectURL(blob) // create an url. img.src = URL.createObjectURL(...) will work
              ];
            });
          });
        // `promises` is an array of promises, `Promise.all` transforms it
        // into a promise of arrays
        return Promise.all(promises);
      })
      .then(result => {
        // we have here an array of [fileName, url]
        // if you want the same result as imageSrc:
        resolve(result.map(elem => elem[1]));
      });
  });
}
