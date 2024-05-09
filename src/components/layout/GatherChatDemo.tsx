import type { GatherContractState } from "@/features/ao/components/GatherContractLoader";
import { randomSeed } from "@/features/avatar/lib/edit";
import {
  RenderEngine,
  type RenderState,
  type RenderPlayer,
} from "@/features/render/components/RenderEngine";
import { createDecoratedRoom } from "@/features/worlds/DecoratedRoom";
import { useMemo, useState } from "react";

interface GatherChat2Props {
  containerRef: React.RefObject<HTMLDivElement>;
  state: GatherContractState;
}

export const GatherChatDemo = ({
  containerRef,
  state: contractState,
}: GatherChat2Props) => {
  const [randomAvatar] = useState(() => randomSeed());
  // Convert raw GatherContractState to RenderEngineState
  const renderEngineState: RenderState = useMemo(() => {
    const player: RenderPlayer = {
      id: "123",
      profile: {
        processId: "123",
        created: 0,
        lastSeen: 0,
        name: "You?",
        avatar: randomAvatar,
        status: "",
        currentWorldId: "",
        following: {},
      },
    };

    return {
      world: {
        id: contractState.worldId,
        data: contractState.world,
      },
      player: {
        ...player,
        savedPosition: undefined,
      },
      otherPlayers: Object.entries(contractState.users)
        .map(([address, otherPlayer]) => {
          const savedPosition = contractState.world.playerPositions[address]
          return {
            id: address,
            profile: otherPlayer,
            savedPosition,

            // Derived
            isInWorld: true,
            hasPositionInWorld: savedPosition !== undefined,
            isFollowingUser: false,
            isFollowedByUser: false,

            isActivated: false,
            isTalking: false,
          };
        }),
    };
  }, [contractState, randomAvatar]);

  const world = useMemo(
    () =>
      createDecoratedRoom(
        "room_default",
        {
          w: 21,
          h: 12,
        },
        3,
        {
          w: 4,
          h: 4,
        },
      ),
    [],
  );

  return (
    <RenderEngine
      parentRef={containerRef}
      lastResized={0}
      world={world}
      state={renderEngineState}
      events={{
        onPositionUpdate: () => {},
        onPlayerClick: () => {},
      }}
      flags={{
        enableMovement: false,
        animateMovement: false,
        showWorld: true,
        showPlayer: true,
        showOtherPlayers: true,
        showObjects: true,
      }}
    />
  );
};
