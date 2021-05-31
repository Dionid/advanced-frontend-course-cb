import {createContext, FunctionComponent, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {messagesAdapter, messagesReducer} from "../../infra/redux";
import {ChatRepository} from "../../infra/repositories/chatRepository";
import {useSyncReducer} from "libs/react/hooks/useSyncReducer";
import {MessageRowPropsMessage} from "../MessageRow";
import {useGlobalDependenciesContext} from "../../../../../../../../global/ui/contexts/GlobalDependenciesCtx";


interface ChatWidgetContext {
  state: {
    newMessage: string,
    editModeMessageId: string,
    allMessages: MessageRowPropsMessage[],
  }
  fns: {
    setNewMessage: (value: string) => void
    onNewMessageSubmit: (value: string) => void
    onDelete: (messageId: string) => void
    onEdit: (messageId: string) => void
    onCancelEdit: () => void
  }
}

// @ts-ignore
const ChatWidgetContext = createContext<ChatWidgetContext>({})

export const useChatWidgetContext = () => useContext(ChatWidgetContext)

export const ChatWidgetContextProvider: FunctionComponent<{ roomId: string }> = ({roomId, children}) => {
  const [messages, dispatchMessages] = useSyncReducer(messagesReducer, messagesAdapter.getInitialState())
  const [prevNewMessage, setPrevNewMessage] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [editModeMessageId, setEditModeMessageId] = useState("")
  const { selectors, infra: {gqlApi} } = useGlobalDependenciesContext()

  const chatRepo = useMemo(() => {
    return new ChatRepository(
      messages,
      dispatchMessages,
      gqlApi,
    )
  }, [])

  useMemo(() => {
    chatRepo.refresh(
      messages,
    )
  }, [messages])

  useEffect(() => {
    chatRepo.subscribeOnMessages(roomId)

    return () => {
      chatRepo.unsubscribe()
    }
  }, [])

  const onEdit = useCallback((messageId: string) => {
    setEditModeMessageId(messageId)
    if (!editModeMessageId) {
      setPrevNewMessage(newMessage)
    }
    setNewMessage(messages!.entities[messageId]!.content)
  }, [messages, newMessage])

  const onCancelEdit = useCallback(() => {
    setEditModeMessageId("")
    setNewMessage(prevNewMessage)
    setPrevNewMessage("")
  }, [prevNewMessage])

  const onNewMessageSubmit = useCallback(async (newMessage: string) => {
    // . Validate
    // ...

    if (editModeMessageId) {
      // . Check that message
      if (newMessage !== messages!.entities[editModeMessageId]!.content) {
        await chatRepo.editMessage({
          body: newMessage,
          messageId: editModeMessageId,
        })
      }
      onCancelEdit()
    } else {
      // . Create new message
      await chatRepo.createNewMessage({
        body: newMessage,
        authorId: selectors.getMyId(),
        roomId: roomId,
      })

      // . Reset new message field
      setNewMessage("")
    }
  }, [chatRepo, newMessage, onCancelEdit, editModeMessageId])

  const onDelete = useCallback((messageId: string) => {
    chatRepo.deleteMessage(messageId)
  }, [])

  const allMessages: MessageRowPropsMessage[] = useMemo(() => {
    return messagesAdapter.getSelectors().selectAll(messages).map((m) => {
      const mine = m.author.id === selectors.getMyId()
      const isEditing = editModeMessageId == m.id
      return {
        ...m,
        mine,
        isEditing,
      }
    })
  }, [messages, editModeMessageId])

  const value: ChatWidgetContext = useMemo(() => {
    return {
      state: {
        allMessages,
        newMessage,
        editModeMessageId,
      },
      fns: {
        setNewMessage,
        onNewMessageSubmit,
        onDelete,
        onEdit,
        onCancelEdit,
      }
    }
  }, [allMessages, newMessage, prevNewMessage])
  return (
    <ChatWidgetContext.Provider value={value}>
      { children }
    </ChatWidgetContext.Provider>
  )
}
