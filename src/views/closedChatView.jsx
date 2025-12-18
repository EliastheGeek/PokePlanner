export function ClosedChatView(props) {

    function toggleChatACB() {
        props.onToggleChat();
    }

    const preparedPrompts = props.preparedPrompts ?? [];

    return (
        <>
          {/* 👇 Prepared prompts when chat is CLOSED */}
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
            💬
          </button>
        </>
    );
}