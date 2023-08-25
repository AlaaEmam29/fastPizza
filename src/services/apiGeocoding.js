import axios from 'axios';

export async function getAddress({ latitude, longitude }) {
  try {
    const { data } = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
