import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sidePanelState = ["feed", "profile", "video"] as const;
export type SidePanelState = (typeof sidePanelState)[number];

interface SidePanelProps {
  state: SidePanelState;
  onSelectState: (state: SidePanelState) => void;
  activityFeed: JSX.Element;
  petition: JSX.Element;
  profile: JSX.Element;
  // video: JSX.Element;
}

export const SidePanel = ({
  state,
  onSelectState,
  activityFeed,
  petition,
  profile,
  // video,
}: SidePanelProps) => {
  return (
    <Tabs
      value={state}
      onValueChange={(value) => onSelectState(value as SidePanelState)}
      className="flex flex-col items-center h-screen mt-1"
    >
      <TabsList className="flex gap-x-2 pt-4">
        <TabsTrigger value="petition" className="btn text-base">Petition</TabsTrigger>
        <TabsTrigger value="feed" className="btn text-base">Activity Feed</TabsTrigger>
        <TabsTrigger value="profile" className="btn text-base">Profile</TabsTrigger>
        {/* <TabsTrigger value="video">Video</TabsTrigger> */}
      </TabsList>
      <div className="flex panel-wrapper">
        <TabsContent value="petition">{petition}</TabsContent>
        <TabsContent value="feed">{activityFeed}</TabsContent>
        <TabsContent value="profile">{profile}</TabsContent>
        {/* <TabsContent value="video">{video}</TabsContent> */}
      </div>
    </Tabs>
  );
};
