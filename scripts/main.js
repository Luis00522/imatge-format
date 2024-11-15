const images = Array.from(document.querySelectorAll("img"));
const infoContainers = Array.from(document.querySelectorAll(".image-info"));

async function getImageInfo(url, imgElement) {
  return new Promise(async (resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = async () => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const format = url.split(".").pop();
        const dimensions = {
          width: img.width,
          height: img.height,
        };
        const alt = imgElement.alt; 
        const size = blob.size;

        resolve({ format, dimensions, alt, size });
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = reject;
  });
}

function displayImageInfo(url, container, imgElement) {
  getImageInfo(url, imgElement)
    .then((info) => {
      const formatElement = document.createElement("p");
      formatElement.textContent = `Format: ${info.format}`;
      container.appendChild(formatElement);

      const dimensionsElement = document.createElement("p");
      dimensionsElement.textContent = `Dimensions: ${info.dimensions.width}x${info.dimensions.height}`;
      container.appendChild(dimensionsElement);

      const altElement = document.createElement("p");
      altElement.textContent = `Alt: ${info.alt}`;
      container.appendChild(altElement);

      const sizeInKB = (info.size / 1024).toFixed(2);
      const sizeElement = document.createElement("p");
      sizeElement.textContent = `Size: ${sizeInKB} KB`;
      container.appendChild(sizeElement);
    })
    .catch(console.error);
}

images.forEach((img, i) => {
  displayImageInfo(img.src, infoContainers[i], img); 
});
