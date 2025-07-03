"use client";

import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/dialog";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";

const WatchListCard = () => {
  return (
    <Card className="shadow-lg shadow-cyan-500/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Watch List</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">+ Add</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add to Watch List</DialogTitle>
              <DialogDescription>
                Add a new airdrop to your watch list.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Airdrop Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="program-id" className="text-right">
                  Program ID / Mint
                </Label>
                <Input id="program-id" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="x-handle" className="text-right">
                  Official X Handle
                </Label>
                <Input id="x-handle" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {/* Watchlist content will go here */}
        <p className="text-zinc-400 text-center py-8">
          Your watched projects will appear here.
        </p>
      </CardContent>
    </Card>
  );
};

export default WatchListCard; 