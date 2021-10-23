class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public';
  _apiKey = 'apikey=fe24f95c382853613a3bcae73647175d';
  getResource = async (url) => {


    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
  }

  getSomeCharacters = async (limit = 9, offset = 210) => {
    const res = await this.getResource(`${this._apiBase}/characters?limit=${limit}&offset=${offset}&${this._apiKey}`);

    return res.data.results.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }

  _transformCharacter = (char) => {

    return {
      name: char.name,
      description: char.description || 'no description',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url
    }
  }

}

export default MarvelService;