import axios, { AxiosError } from 'axios';
import Jimp from 'jimp';

export const fetchRandomImage = async (): Promise<string> => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("Unsplash API access key is not set.");
  }

  const url = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200 && response.data && response.data.urls && response.data.urls.regular) {
      return response.data.urls.regular;
    } else {
      throw new Error("Invalid response from Unsplash API");
    }
  } catch (error: unknown) {
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
    const imageUrl = await fetchRandomImage();
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const image = await Jimp.read(response.data);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    return image.print(font, 0, 0, {
        text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }, image.bitmap.width, image.bitmap.height)
    .getBufferAsync(Jimp.MIME_PNG);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to process image with text: ${error.message}`);
    }
    throw new Error('Failed to process image with text due to an unknown error');
  }
};