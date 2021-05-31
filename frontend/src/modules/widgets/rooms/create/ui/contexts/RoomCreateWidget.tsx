import {createContext, FunctionComponent, useContext, useEffect, useMemo} from "react";
import {Control} from "react-hook-form/dist/types/form";
import {useForm} from "react-hook-form";
import {RoomCreateApi} from "../../infra/gql/api";
import {v4} from "uuid";
import {toast} from "react-toastify";
import {IsRoomDescriptionValid, IsRoomNameValid} from "../../../../../global/rooms/core/validations";
import {useGlobalDependenciesContext} from "../../../../../global/ui/contexts/GlobalDependenciesCtx";

export interface RoomCreateCtxStateForm {
  name: string
  description: string
}

export interface RoomCreateCtx {
  state: {
    control: Control<RoomCreateCtxStateForm>,
  },
  fns: {
    onSubmit: () => void,
  }
}

// @ts-ignore
const RoomCreateWidget = createContext<RoomCreateCtx>({})

export const useRoomCreateWidgetContext = () => useContext(RoomCreateWidget)

export const RoomCreateWidgetCtxProvider: FunctionComponent<{onSuccess?: (roomId: string) => void}> = ({children, onSuccess}) => {
  const { register, handleSubmit, control } = useForm<RoomCreateCtxStateForm>({
    defaultValues: {
      name: "",
      description: "",
    }
  });
  const { infra: {gqlApi}, selectors} = useGlobalDependenciesContext()

  const api = useMemo(() => {
    return new RoomCreateApi(
      gqlApi,
    )
  }, [])

  const onSubmit = handleSubmit(async (data: RoomCreateCtxStateForm) => {
    const myId = selectors.getMyId()
    const roomId = v4()

    // . Make API call
    try {
      await api.create({
        id: roomId,
        description: data.description,
        name: data.name,
        author_id: myId,
      })
    } catch (e) {
      debugger
      toast.error("Something went wrong! Try a little bit later")
      return
    }

    if (onSuccess) onSuccess(roomId)
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

  const value = useMemo(() => {
    return {
      state: {
        control,
      },
      fns: {
        onSubmit,
      }
    }
  }, [])

  return (
    <RoomCreateWidget.Provider value={value}>
      { children }
    </RoomCreateWidget.Provider>
  )
}
