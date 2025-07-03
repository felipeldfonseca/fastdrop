import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

const UpdatesFeed = () => {
  return (
    <Card className="shadow-lg shadow-cyan-500/10">
      <CardHeader>
        <CardTitle>Project Updates</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Updates feed will go here */}
        <p>Updates from projects will appear here.</p>
      </CardContent>
    </Card>
  );
};

export default UpdatesFeed; 