import './charList.scss';
import MarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";


const CharList = ({onCharSelected}) => {
  const [charArray, setCharArray] = useState([]);
  const [error, setErrorStatus] = useState(false);
  const [newCharsLoading, setNewCharsLoading] = useState(false);
  const [charsEnded, setCharsEndedStatus] = useState(false);
  const offset = 210;

  const marvelService = new MarvelService();


  useEffect(() => {
    OnRequest();
  }, [])

  const OnRequest = (offset) => {

    setNewCharsLoading(true);

    marvelService.getSomeCharacters(offset)
      .then(res => {
        const chars = res.map(RenderCharacterCard);

        if (chars.length < 9) setCharsEndedStatus(true);
        setCharArray([...charArray, ...chars])
        setNewCharsLoading(false);

      })
      .catch(e => setErrorStatus(true));
  }


  const RenderCharacterCard = (char) => {
    const {thumbnail, name, id} = char;
    return (
      <li key={id}
          onClick={() => onCharSelected(id)}
          className="char__item">
        <img src={thumbnail} alt="abyss" className={thumbnail.includes('image_not_available') ? 'no-img' : ''}/>
        <div className="char__name">{name}</div>
      </li>
    )
  }


  if (charArray.length === 0) return (<Spinner/>);
  if (error) return (<ErrorMessage/>);

  return (
    <div className="char__list">
      <ul className="char__grid">
        {charArray}
      </ul>
      <button className="button button__main button__long"
              onClick={() => {OnRequest(charArray.length + offset)}}
              disabled={newCharsLoading}
              style={{visibility: `${charsEnded ? 'hidden' : 'initial'}`}}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default CharList;
