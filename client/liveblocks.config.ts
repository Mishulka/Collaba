import {
  createClient, 
  LiveList,
  LiveMap,
  LiveObject,
} from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  throttle: 16,
  authEndpoint: "/api/liveblocks-auth",
});

import { Layer, Color } from "@/types/canvas";

declare global {
  interface Liveblocks {
    Presence: {
      selection: string[];pencilDraft: [x: number, y: number, pressure: number][] | null;
      cursor: { x: number, y: number } | null;
      penColor: Color | null;
    };
    Storage: {
      layers: LiveMap<string, LiveObject<Layer>>;
      layerIds: LiveList<string>;
    };
    UserMeta: {
      id?: string;
      info?: {
        name?: string;
        picture?: string;
      };
    };
  }
}

export const {
  RoomProvider,
  useRoom,
  useMyPresence,
  useUpdateMyPresence,
  useSelf,
  useOthers,
  useStorage,
  useMutation,
  useOthersConnectionIds,
  useOther,
} = createRoomContext(client);