import { useSelector, useDispatch } from "react-redux";

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

/*
MUI
*/
import SmartToyIcon from '@mui/icons-material/SmartToy';
import FaceIcon from '@mui/icons-material/Face';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export function ChatInterface(props) {

  function promptACB(e){
    e.preventDefault();

    const form = e.target;
    const textarea = form.querySelector("textarea");
    const text = textarea?.value || "";

    if (!text) return;

    props.onPromptNow(text);
    textarea.value = "";
  }

  function excludeTeamACB(e){
    props.onToggleIncludeTeam(e.target.checked);
  }

  return (
    <div className="flex h-full w-full flex-col rounded-lg">
      <b>PokéBot</b>
      <Conversation className="flex-1">
        <ConversationContent>
          {props.messages.map((msg) => (
            <Message key={msg.id} from={msg.role}>
              <MessageContent>{msg.content}</MessageContent>
                <MessageAvatar
                  src={msg.role === "assistant" ? <SmartToyIcon /> : <FaceIcon />}
                  name={msg.role}
                />
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {props.loading && (
        <div className="text-sm text-gray-500 px-4 py-2">
          <CircularProgress />
        </div>
      )}
      <Box> 
        <Box>
          <FormGroup >
          <FormControlLabel
              control={
                <Switch
                  checked={props.includeTeam}
                  onChange={excludeTeamACB}
                />
              }
              label="Include Team Object"
              sx={{ ml: 0, fontSize: 8 }}
            />
          </FormGroup>
        </Box>

        <PromptInput 
          onSubmit={promptACB}>
          <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%"}}>
                                    
            <PromptInputTextarea placeholder="Ask me anything..."/>
            <PromptInputToolbar>
                <PromptInputSubmit />
            </PromptInputToolbar>
          </Box>
        </PromptInput>
      </Box>

      {props.error && (
        <div className="text-red-600 text-sm px-4 py-2">
          Error: {props.error}
        </div>
      )}
    </div>
  );
}

