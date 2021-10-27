import './charInfo.scss';
import MarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = ({charID}) => {

  const [char, setChar] = useState();
  const [errorStatus, setErrorStatus] = useState(false);
  const [loadingStatus, isLoading] = useState(false);

  useEffect(() => {
    updateChar();
  }, [charID])

  const marvelService = new MarvelService();

  const updateChar = () => {
    if (!charID) return;

    isLoading(true);

    marvelService.getCharacter(charID).then(res => {
      setChar(res);
      isLoading(false);
    }).catch(e => setErrorStatus(true));
  }

  const RenderComicsList = (comics) => {
    if (comics.length <= 0) return 'there is no comics with this character';
    if (comics.length >= 10) comics.splice(10, comics.length); // max 10 comics per page

    return comics.map((item, i) => {
        return (
          <li key={i} className="char__comics-item">
            {item.name}
          </li>
        )
      }
    )
  }

  const RenderCharInfo = (props) => {
    const {name, description, thumbnail, wiki, homepage, comics} = props.char;

    return(
      <>
        <div className="char__basics">
          <img src={thumbnail} alt="Hero avatar" className={thumbnail.includes('image_not_available') ? 'no-img' : ''}/>
          <div>
            <div className="char__info-name">{name}</div>
            <div className="char__btns">
              <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="char__descr">
          {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
          {RenderComicsList(comics)}
        </ul>
      </>
    )
  }


  const View = () => {
    const error = errorStatus ? <ErrorMessage/> : null;
    const loading = loadingStatus ? <Spinner/> : null;
    const skeleton = !char && !loading ? <Skeleton/> : null;
    const content = !errorStatus && !!char && !loadingStatus ? <RenderCharInfo char={char}/> : null;

    return (
      <div className="char__info">
        {error}
        {loading}
        {skeleton}
        {content}
      </div>
    )
  }


  return <View/>;
}

export default CharInfo;
