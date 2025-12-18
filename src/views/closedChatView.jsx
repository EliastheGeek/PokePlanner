import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import pokeBotRight from "/src/assets/pokeBotRight.png";

export function ClosedChatView(props) {

    function toggleChatACB() {
        props.onToggleChat();
    }

    const preparedPrompts = props.preparedPrompts ?? [];

    return (
        <div className='closedChatView'>
          {preparedPrompts.length > 0 && (
            <div className="preparedPromptClosedFloating">
              {preparedPrompts.map((q, i) => (
                <button
                  key={i}
                  className="preparedPromptClosedBubble"
                  onClick={() => props.onPreparedPromptClick(q.query)}
                >
                  {q.query}
                </button>
              ))}
            </div>
          )}

          <button
            className="chatRestoreBtn"
            onClick={toggleChatACB}
          >
            PokéBot
            <img src={pokeBotRight} width={60}/>
          </button>
        </div>
    );
}