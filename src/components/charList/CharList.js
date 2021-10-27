import './charList.scss';
import MarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";


const CharList = ({onCharSelected}) => {
  const [charArray, setCharArray] = useState(null);
  const [error, setErrorStatus] = useState(false);

  const marvelService = new MarvelService();


  useEffect(() => {

    marvelService.getSomeCharacters()
      .then(res => {
        const chars = res.map(RenderCharacterCard);
        setCharArray(chars);
      })
      .catch(e => setErrorStatus(true));
  }, [])

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

  if (!charArray) return (<Spinner/>);
  if (error) return (<ErrorMessage/>);

  return (
    <div className="char__list">
      <ul className="char__grid">
        {charArray}
      </ul>
      <button className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default CharList;
