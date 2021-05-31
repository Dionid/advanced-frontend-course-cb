import {createContext, FunctionComponent, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Room} from "../../core/entities/room";
import {useParams} from "react-router-dom"
import {RoomRepository} from "../../infra/repositories/roomRepository";
import {useForm} from "react-hook-form";
import {Control} from "react-hook-form/dist/types/form";
import {RoomCreateCtxStateForm} from "../../../../../../widgets/rooms/create/ui/contexts/RoomCreateWidget";
import {IsRoomDescriptionValid, IsRoomNameValid} from "../../../../../../global/rooms/core/validations";
import {useGlobalDependenciesContext} from "../../../../../../global/ui/contexts/GlobalDependenciesCtx";
import {canUserDeleteRoom, canUserEditRoom} from "../../../../../../global/rooms/core/permissions";

const defaultRoomData: Room = {
  id: "",
  name: "",
  description: "",
  author: {
    id: "",
    username: ""
  },
  createdAt: new Date(),
  members: [],
  activeMembers: [],
  deleted: false,
}

interface RoomInfoPageContextForm {
  name: string
  description: string
}

interface RoomInfoPageContext {
  state: {
    roomData: Room,
    editMode: boolean,
    control: Control<RoomInfoPageContextForm>,
    showChatWidget: boolean,
    showVideoScreen: boolean,
  },
  permissions: {
    canEdit: boolean,
    canDelete: boolean,
  },
  fns: {
    onEdit: () => void,
    onDelete: () => void,
    onSubmit: () => void,
    onCancelEditMode: () => void
  }
}


// @ts-ignore
const RoomInfoPageContext = createContext<RoomInfoPageContext>({})

export const useRoomInfoPageContext = () => useContext(RoomInfoPageContext)

export const RoomInfoPageContextProvider: FunctionComponent = ({children}) => {
  const { register, handleSubmit, control, setValue } = useForm<RoomInfoPageContextForm>({
    defaultValues: {
      name: "",
      description: "",
    }
  });
  const [roomData, setRoomData] = useState(defaultRoomData)
  const [editMode, setEditMode] = useState(false)
  const { id } = useParams() as { id: string }
  const { infra: {gqlApi}, selectors } = useGlobalDependenciesContext()

  const isAuthenticated = selectors.isAuthenticated()

  const roomRepository = useMemo(() => {
    return new RoomRepository(
      roomData,
      setRoomData,
      selectors.getMyId,
      gqlApi,
    )
  }, [])

  const resetFormValues = useCallback(() => {
    setValue("name", roomData.name)
    setValue("description", roomData.description)
  }, [roomData])

  useMemo(() => {
    roomRepository.refresh(roomData)
    resetFormValues()
  }, [roomData])

  useEffect(() => {
    // . Init uc
    ;(async () => {
      await roomRepository.subscribeOnRoomUpdate(id)
    })()

    // . Start cron of my presence room in
    let int: NodeJS.Timeout
    if (isAuthenticated) {
      roomRepository.enterRoom(id, selectors.getMyId())
      int = setInterval(async () => {
        // . Notify that you are still in room every minute
        await roomRepository.enterRoom(id, selectors.getMyId())
      }, 60000)
    }

    return () => {
      // . Unsubscribe
      roomRepository.unsubscribeRoomUpdate()
      // . Stop cron of my presence room in
      clearInterval(int)
    }
  }, [])

  const onDelete = useCallback(() => {
    roomRepository.deleteRoom()
  }, [])

  const onEdit = useCallback(() => {
    setEditMode(true)
  }, [])

  const onCancelEditMode = useCallback(() => {
    setEditMode(false)
    resetFormValues()
  }, [resetFormValues])

  const onSubmit = handleSubmit(async (data: RoomCreateCtxStateForm) => {
    if (
      data.name === roomData.name
      && data.description === roomData.description
    ) {
      onCancelEditMode()
      return
    }
    await roomRepository.editRoom({
      roomId: roomData.id,
      name: data.name,
      description: data.description,
    })
    onCancelEditMode()
  })

  useEffect(() => {
    register("name", {
      required: {
        value: true,
        message: "Name is required"
      },
      validate: (value) => IsRoomNameValid.check(value).map(e => e.message)[0]
    });
    register("description", {
      validate: (value) => IsRoomDescriptionValid.check(value).map(e => e.message)[0]
    });
  }, [register]);

  const myId = selectors.getMyId()
  const value = useMemo(() => {
    return {
      state: {
        roomData,
        editMode,
        control,
        showChatWidget: isAuthenticated,
        showVideoScreen: isAuthenticated,
      },
      permissions: {
        canEdit: canUserEditRoom(myId, roomData),
        canDelete: canUserDeleteRoom(myId, roomData),
      },
      fns: {
        onDelete,
        onEdit,
        onSubmit,
        onCancelEditMode,
      }
    }
  }, [roomData, control, editMode, myId])
  return (
    <RoomInfoPageContext.Provider value={value}>
      { children }
    </RoomInfoPageContext.Provider>
  )
}
