import {createEntityAdapter, createSlice,} from '@reduxjs/toolkit'
import {Message} from "../../core/entities";

export interface MessageModel extends Message {}

export interface MessageModelStore {
  ids: string[],
  entities: {
    [key: string]: MessageModel
  }
}

export const messagesAdapter = createEntityAdapter<MessageModel>({
  // Assume IDs are stored in a field other than `message.id`
  selectId: (message) => message.id,
})

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `messageAdded` action type / creator
    addOne: messagesAdapter.addOne,
    addMany: messagesAdapter.addMany,
    setAll: messagesAdapter.setAll,
    removeOne: messagesAdapter.removeOne,
    removeMany: messagesAdapter.removeMany,
    removeAll: messagesAdapter.removeAll,
    updateOne: messagesAdapter.updateOne,
    updateMany: messagesAdapter.updateMany,
    upsertOne: messagesAdapter.upsertOne,
    upsertMany: messagesAdapter.upsertMany,
  },
})

export const messagesReducer = messagesSlice.reducer

// export const messagesSelectors = messagesAdapter.getSelectors<RootState>(
//   (state) => state.messages,
// )
