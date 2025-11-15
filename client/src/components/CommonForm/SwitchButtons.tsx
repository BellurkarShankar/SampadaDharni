"use client";
import React from "react";
import { Switch } from "../ui/switch";
type SwitchButtons = {
  setFeatured?: (flag: boolean) => void;
};
const SwitchButtons = ({ setFeatured }: SwitchButtons) => {
  return (
    <Switch
      onCheckedChange={(event) => {
        setFeatured?.(event);
      }}
    >
      SwitchButtons
    </Switch>
  );
};

export default SwitchButtons;
