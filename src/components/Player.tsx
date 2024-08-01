import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PlayerProps } from '../types';

export function Player(props: PlayerProps) {
  const { song, isPlay, onButtonClick } = props;

  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 p-5">
      <div className="flex justify-between w-full md:max-w-[90%] md:mx-auto">
        <div className="flex items-center">
          {song.album.images.length > 0 && song.album.images[0].url && (
            <img
              alt="thumbnail"
              src={song.album.images[0].url}
              className="rounded-full mr-3 h-[50px] w-[50px]"
            />
          )}
          <div>
            <p className="text-sm font-semibold">{song.name}</p>
            <p className="text-xs text-gray-400">{song.artists[0].name}</p>
          </div>
        </div>
        <div className="flex items-center ">
          <FontAwesomeIcon
            onClick={onButtonClick}
            icon={isPlay ? faStopCircle : faPlayCircle}
            className="text-white text-3xl mx-2 h-[40px] w-[40px] cursor-pointer"
          />
        </div>
      </div>
    </footer>
  );
}
