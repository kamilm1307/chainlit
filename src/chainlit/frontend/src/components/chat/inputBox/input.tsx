import SendIcon from '@mui/icons-material/Telegram';
import { IconButton, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  askUserState,
  historyOpenedState,
  loadingState,
  sessionState
} from 'state/chat';
import HistoryButton from 'components/chat/history';

interface Props {
  onSubmit: (message: string) => void;
  onReply: (message: string) => void;
}

function getLineCount(el: HTMLDivElement) {
  const textarea = el.querySelector('textarea');
  if (!textarea) {
    return 0;
  }
  const lines = textarea.value.split('\n');
  return lines.length;
}

const Input = ({ onSubmit, onReply }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const hSetOpen = useSetRecoilState(historyOpenedState);
  const loading = useRecoilValue(loadingState);
  const askUser = useRecoilValue(askUserState);
  const session = useRecoilValue(sessionState);
  const [value, setValue] = useState('');

  const disabled = !session?.socket || loading || askUser?.spec.type === 'file';

  const placeholder = session?.socket
    ? 'Type your message here...'
    : 'Connecting to server...';

  useEffect(() => {
    if (ref.current && !loading) {
      ref.current.querySelector('textarea')?.focus();
    }
  }, [loading]);

  const submit = useCallback(() => {
    if (value === '' || disabled) {
      return;
    }
    if (askUser) {
      onReply(value);
    } else {
      onSubmit(value);
    }
    setValue('');
  }, [value, disabled, setValue, askUser, onSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submit();
      } else if (e.key === 'ArrowUp') {
        const lineCount = getLineCount(e.currentTarget as HTMLDivElement);
        if (lineCount <= 1) {
          hSetOpen(true);
        }
      }
    },
    [submit, hSetOpen]
  );

  const onHistoryClick = useCallback((content: string) => {
    if (ref.current) {
      setValue(content);
    }
  }, []);

  const endAdornment = (
    <IconButton disabled={disabled} color="inherit" onClick={() => submit()}>
      <SendIcon />
    </IconButton>
  );

  return (
    <TextField
      ref={ref}
      id="chat-input"
      autoFocus
      multiline
      variant="standard"
      autoComplete="false"
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      value={value}
      fullWidth
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <InputAdornment
            sx={{ ml: 1, color: 'text.secondary' }}
            position="start"
          >
            <HistoryButton onClick={onHistoryClick} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{ mr: 1, color: 'text.secondary' }}
          >
            {endAdornment}
          </InputAdornment>
        )
      }}
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        boxShadow: 'box-shadow: 0px 2px 4px 0px #0000000D',

        textarea: {
          height: '34px',
          maxHeight: '30vh',
          overflowY: 'scroll !important',
          resize: 'none',
          paddingBottom: '0.75rem',
          paddingTop: '0.75rem',
          color: 'text.primary',
          lineHeight: '24px'
        }
      }}
    />
  );
};

export default Input;
