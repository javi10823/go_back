import axios, { AxiosError } from 'axios';
import Jimp from 'jimp';

export const fetchRandomImage = async (): Promise<string> => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY; //Se obtiene la clave de acceso de la API de Unsplash desde las variables de entorno.
  if (!accessKey) { // Valida el caso que no haya accessKey
    throw new Error("Unsplash API access key is not set.");
  }

  const url = `https://api.unsplash.com/photos/random?client_id=${accessKey}`; // Se crea la URL para solicitar una imagen aleatoria de Unsplash usando la clave de acceso.

  try {
    const response = await axios.get(url); //Se hace la peticion a la URL
    if (response.status === 200 && response.data && response.data.urls && response.data.urls.regular) { // Si la respuesta es exitosa (status 200) y contiene una URL válida de la imagen, se devuelve dicha URL
      return response.data.urls.regular;
    } else {
      throw new Error("Invalid response from Unsplash API");
    }
  } catch (error: unknown) {

    //Manejo de Errores: Si ocurre un error durante la solicitud, se maneja de forma adecuada dependiendo del tipo de error (error de respuesta, error de solicitud, etc.).
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`Unsplash API returned an error: ${error.response.data.message}`);
      } else if (error.request) {
        throw new Error("No response received from Unsplash API");
      }
    }
    throw new Error(`Error fetching image from Unsplash: ${(error as Error).message}`);
  }
};


export const addTextToImage = async (text: string): Promise<Buffer> => {
  try {
    const imageUrl = await fetchRandomImage(); // Se llama a fetchRandomImage para obtener la URL de una imagen aleatoria.
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' }); // Se descarga la imagen desde la URL obtenida usando axios con el responseType configurado a 'arraybuffer'.
    const image = await Jimp.read(response.data); // Leer la Imagen con Jimp: Se utiliza Jimp para leer los datos de la imagen.
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK); // Se carga una fuente predeterminada de Jimp para agregar texto a la imagen.
    return image.print(font, 0, 0, { // Se imprime el texto en la imagen centrado horizontal y verticalmente.
        text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }, image.bitmap.width, image.bitmap.height)
    .getBufferAsync(Jimp.MIME_PNG); // Se devuelve la imagen como un buffer en formato PNG.
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to process image with text: ${error.message}`);
    }
    throw new Error('Failed to process image with text due to an unknown error');
  }
};