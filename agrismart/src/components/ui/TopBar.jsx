import React from "react";
import LanguageSelector from "../../pages/login/components/LanguageSelector";
import Icon from "../AppIcon";

const TopBar = () => {
  return (
    <header className="w-full bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Leaf" size={20} color="var(--color-primary)" />
          <span className="font-semibold text-card-foreground">AgriSmart</span>
        </div>
        <LanguageSelector />
      </div>
    </header>
  );
};

export default TopBar;


