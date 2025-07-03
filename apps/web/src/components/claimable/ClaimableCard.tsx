import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";
import { Button } from "@repo/ui/button";

const mockAirdrops = [
  {
    token: "WEN",
    amount: "150,000",
    estValue: "$15.50",
    timeLeft: "2d 4h",
  },
  {
    token: "JUP",
    amount: "200",
    estValue: "$120.00",
    timeLeft: "Expired",
  },
];

const ClaimableAirdropsCard = () => {
  const airdrops = mockAirdrops; // Using mock data

  return (
    <Card className="shadow-lg shadow-cyan-500/10">
      <CardHeader>
        <CardTitle>Claimable Airdrops</CardTitle>
      </CardHeader>
      <CardContent>
        {airdrops.length === 0 ? (
          <div className="text-center text-zinc-400 py-8">
            {/* Rocket illustration will go here */}
            <p className="mt-4">No claimable airdrops detected right now.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Est. Value</TableHead>
                <TableHead>Time Left</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {airdrops.map((airdrop) => (
                <TableRow key={airdrop.token}>
                  <TableCell className="font-medium">{airdrop.token}</TableCell>
                  <TableCell>{airdrop.amount}</TableCell>
                  <TableCell>{airdrop.estValue}</TableCell>
                  <TableCell>{airdrop.timeLeft}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm">Claim & Sell</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ClaimableAirdropsCard; 