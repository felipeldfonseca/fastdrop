"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { Slider } from "@repo/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { Switch } from "@repo/ui/switch";
import { Label } from "@repo/ui/label";
import { Input } from "@repo/ui/input";

const SetClaimPanel = () => {
  return (
    <Card className="shadow-lg shadow-cyan-500/10">
      <CardHeader>
        <CardTitle>Set a Claim</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="token-mint">Token Mint</Label>
          <Select>
            <SelectTrigger id="token-mint">
              <SelectValue placeholder="Select a token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wen">WEN</SelectItem>
              <SelectItem value="jup">Jupiter</SelectItem>
              <SelectItem value="pyth">Pyth</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Sell %</Label>
          <Slider defaultValue={[100]} max={100} step={1} />
        </div>
        <div className="space-y-2">
          <Label>Slippage (bps)</Label>
          <Input type="number" defaultValue={300} />
        </div>
        <div className="space-y-2">
            <Label>Priority Fee (μ lamports)</Label>
            <Input type="number" defaultValue={100000} />
        </div>
        <div className="space-y-2">
            <Label>Retries</Label>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="3" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="flex items-center space-x-2">
            <Switch id="pre-monitor" defaultChecked/>
            <Label htmlFor="pre-monitor">Pre-monitor</Label>
        </div>
        <Button className="w-full">Enable Auto-Sell</Button>
      </CardContent>
    </Card>
  );
};

export default SetClaimPanel; 