import type { RenderOtherPlayer } from "@/features/render/components/RenderEngine";
import { timeAgo } from "@/utils";
import { trimId } from "@/utils";
import { Button } from "../../../components/ui/button";
import { AvatarStandalone } from "../../avatar/components/AvatarStandalone";

interface ProfileViewProps {
  otherPlayer: RenderOtherPlayer;
  onChangeFollow: (otherPlayer: RenderOtherPlayer) => void;
  onClose: () => void;
}

export const ProfileView = ({
  otherPlayer,
  onChangeFollow,
  onClose,
}: ProfileViewProps) => {
  console.log(`ProfileView: otherPlayer: ${JSON.stringify(otherPlayer)}`);

  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-2 items-start justify-between">
        <div>
          <p className="text-lg">{otherPlayer.profile.name}</p>
          <p className="text-muted-foreground">{trimId(otherPlayer.id)}</p>
        </div>
        <Button
          type="button"
          onClick={() => onClose()}
          variant={"ghost"}
          className="text-accent-foreground btn text-xs"
        >
          Close
        </Button>
      </div>
      <AvatarStandalone
        scale={12}
        seed={otherPlayer.profile.avatar}
        animationName={"jump"}
        isPlaying={true}
        isLlama={
          otherPlayer.isNPC || otherPlayer.id === "LlamaSecretary"
            ? true
            : false
        }
      />
      <p>In World: {otherPlayer.profile.currentWorldId}</p>
      <p>Last activity: {timeAgo.format(otherPlayer.profile.lastSeen)}</p>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex flex-row gap-2 items-center">
          <Button
            type="button"
            onClick={() => onChangeFollow(otherPlayer)}
            variant={otherPlayer.isFollowedByUser ? "destructive" : "default"}
            className="btn"
          >
            {otherPlayer.isFollowedByUser ? "Unfollow" : "Follow"}
          </Button>
        </div>
      </div>
    </div>
  );
};
