import debounce from 'lodash/debounce';
import { useCallback } from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState
} from 'recoil';
import io from 'socket.io-client';
import {
  actionState,
  askUserState,
  avatarState,
  chatProfileState,
  chatSettingsInputsState,
  chatSettingsValueState,
  elementState,
  firstUserMessageState,
  loadingState,
  messagesState,
  sessionIdState,
  sessionState,
  tasklistState,
  threadIdToResumeState,
  tokenCountState
} from 'src/state';
import {
  IAction,
  IAvatarElement,
  IElement,
  IMessage,
  IMessageElement,
  ITasklistElement,
  IThread,
  StepOrMessage
} from 'src/types';
import {
  addMessage,
  deleteMessageById,
  updateMessageById,
  updateMessageContentById
} from 'src/utils/message';

import type { IToken } from './useChatData';

const useChatSession = () => {
  const sessionId = useRecoilValue(sessionIdState);

  const [session, setSession] = useRecoilState(sessionState);

  const resetChatSettingsValue = useResetRecoilState(chatSettingsValueState);
  const setFirstUserMessage = useSetRecoilState(firstUserMessageState);
  const setLoading = useSetRecoilState(loadingState);
  const setMessages = useSetRecoilState(messagesState);
  const setAskUser = useSetRecoilState(askUserState);
  const setElements = useSetRecoilState(elementState);
  const setAvatars = useSetRecoilState(avatarState);
  const setTasklists = useSetRecoilState(tasklistState);
  const setActions = useSetRecoilState(actionState);
  const setChatSettingsInputs = useSetRecoilState(chatSettingsInputsState);
  const setTokenCount = useSetRecoilState(tokenCountState);
  const [chatProfile, setChatProfile] = useRecoilState(chatProfileState);
  const idToResume = useRecoilValue(threadIdToResumeState);

  const _connect = useCallback(
    ({
      wsEndpoint,
      userEnv,
      accessToken
    }: {
      wsEndpoint: string;
      userEnv: Record<string, string>;
      accessToken?: string;
    }) => {
      const socket = io(wsEndpoint, {
        path: '/ws/socket.io',
        extraHeaders: {
          Authorization: accessToken || '',
          'X-Chainlit-Session-Id': sessionId,
          'X-Chainlit-Thread-Id': idToResume || '',
          'user-env': JSON.stringify(userEnv),
          'X-Chainlit-Chat-Profile': chatProfile || ''
        }
      });
      setSession((old) => {
        old?.socket?.removeAllListeners();
        old?.socket?.close();
        return {
          socket
        };
      });

      socket.on('connect', () => {
        socket.emit('connection_successful');
        setSession((s) => ({ ...s!, error: false }));
      });

      socket.on('connect_error', (_) => {
        setSession((s) => ({ ...s!, error: true }));
      });

      socket.on('task_start', () => {
        setLoading(true);
      });

      socket.on('task_end', () => {
        setLoading(false);
      });

      socket.on('reload', () => {
        socket.emit('clear_session');
        window.location.reload();
      });

      socket.on('resume_thread', (thread: IThread) => {
        let messages: StepOrMessage[] = [];
        for (const message of thread.messages) {
          messages = addMessage(messages, message);
        }
        for (const step of thread.steps) {
          messages = addMessage(messages, step);
        }
        if (thread.metadata?.chat_profile) {
          setChatProfile(thread.metadata?.chat_profile);
        }
        setMessages(messages);
        setAvatars(
          (thread.elements as IAvatarElement[]).filter(
            (e) => e.type === 'avatar'
          )
        );
        setTasklists(
          (thread.elements as ITasklistElement[]).filter(
            (e) => e.type === 'tasklist'
          )
        );
        setElements(
          (thread.elements as IMessageElement[]).filter(
            (e) => ['avatar', 'tasklist'].indexOf(e.type) === -1
          )
        );
      });

      socket.on('new_message', (message: StepOrMessage) => {
        setMessages((oldMessages) => addMessage(oldMessages, message));
      });

      socket.on('init_thread', (message: IMessage) => {
        setFirstUserMessage(message);
      });

      socket.on('update_message', (message: StepOrMessage) => {
        setMessages((oldMessages) =>
          updateMessageById(oldMessages, message.id, message)
        );
      });

      socket.on('delete_message', (message: StepOrMessage) => {
        setMessages((oldMessages) =>
          deleteMessageById(oldMessages, message.id)
        );
      });

      socket.on('stream_start', (message: StepOrMessage) => {
        setMessages((oldMessages) => addMessage(oldMessages, message));
      });

      socket.on('stream_token', ({ id, token, isSequence }: IToken) => {
        setMessages((oldMessages) =>
          updateMessageContentById(oldMessages, id, token, isSequence)
        );
      });

      socket.on('ask', ({ msg, spec }, callback) => {
        setAskUser({ spec, callback });
        setMessages((oldMessages) => addMessage(oldMessages, msg));

        setLoading(false);
      });

      socket.on('ask_timeout', () => {
        setAskUser(undefined);
        setLoading(false);
      });

      socket.on('clear_ask', () => {
        setAskUser(undefined);
      });

      socket.on('chat_settings', (inputs: any) => {
        setChatSettingsInputs(inputs);
        resetChatSettingsValue();
      });

      socket.on('element', (element: IElement) => {
        if (element.type === 'avatar') {
          setAvatars((old) => [...old, element]);
        } else if (element.type === 'tasklist') {
          setTasklists((old) => [...old, element]);
        } else {
          setElements((old) => [...old, element]);
        }
      });

      socket.on('remove_element', (remove: { id: string }) => {
        setElements((old) => {
          return old.filter((e) => e.id !== remove.id);
        });
        setTasklists((old) => {
          return old.filter((e) => e.id !== remove.id);
        });
        setAvatars((old) => {
          return old.filter((e) => e.id !== remove.id);
        });
      });

      socket.on('action', (action: IAction) => {
        setActions((old) => [...old, action]);
      });

      socket.on('remove_action', (action: IAction) => {
        setActions((old) => {
          const index = old.findIndex((a) => a.id === action.id);
          if (index === -1) return old;
          return [...old.slice(0, index), ...old.slice(index + 1)];
        });
      });

      socket.on('token_usage', (count: number) => {
        setTokenCount((old) => old + count);
      });
    },
    [setSession, sessionId, chatProfile]
  );

  const connect = useCallback(debounce(_connect, 200), [_connect]);

  const disconnect = useCallback(() => {
    if (session?.socket) {
      session.socket.removeAllListeners();
      session.socket.close();
    }
  }, [session]);

  return { connect, disconnect, chatProfile, idToResume, setChatProfile };
};

export { useChatSession };
