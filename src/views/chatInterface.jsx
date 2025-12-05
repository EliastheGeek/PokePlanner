import { useSelector, useDispatch } from "react-redux";
import { resetChat } from "/src/reduxStore";
import { doPromptThunk } from "../store/chatThunks";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/shadcn-io/ai/conversation";

import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/shadcn-io/ai/message";

import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/ui/shadcn-io/ai/prompt-input";

export function ChatInterface() {
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.chat.messages);
  const loading = useSelector((state) => state.chat.loading);
  const error = useSelector((state) => state.chat.error);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const textarea = form.querySelector("textarea");
    const text = textarea?.value || "";

    if (!text) return;

    dispatch(doPromptThunk(text));
    textarea.value = "";
  };

  return (
    <div className="flex h-full w-full flex-col">
      
      <Conversation className="flex-1">
        <ConversationContent>
          {messages.map((msg) => (
            <Message key={msg.id} from={msg.role}>
              <MessageContent>{msg.content}</MessageContent>
              <MessageAvatar
                src={msg.role === "assistant" ? "/bot.png" : "/user.png"}
                name={msg.role}
              />
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <PromptInput 
        onSubmit={handleSubmit}>
        <PromptInputTextarea
          placeholder="Ask me anything..."
        />
        <PromptInputToolbar>
          <PromptInputSubmit />
        </PromptInputToolbar>
      </PromptInput>

      {loading && (
        <div className="text-sm text-gray-500 px-4 py-2">
          Loading...
        </div>
      )}

      {error && (
        <div className="text-red-600 text-sm px-4 py-2">
          Error: {error}
        </div>
      )}
    </div>
  );
}

