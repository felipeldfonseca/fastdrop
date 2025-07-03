import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

const WatchListCard = () => {
  return (
    <Card className="shadow-lg shadow-cyan-500/10">
      <CardHeader>
        <CardTitle>Watch List</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Placeholder content until watch list feature is implemented */}
        <p className="text-center text-zinc-400 py-8">
          No projects in your watch list yet.
        </p>
      </CardContent>
    </Card>
  );
};

export default WatchListCard; 