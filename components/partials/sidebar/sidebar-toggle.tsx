"use client";

import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { motion } from "framer-motion";
import { useConfig } from "@/hooks/use-config";

export function SidebarToggle() {
  const [config, setConfig] = useConfig();
	const collapsed = config.collapsed;
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  if (!isDesktop) return null;

  return (
    <Button
      onClick={() => setConfig({ ...config, collapsed: !collapsed })}
      className="rounded-md h-auto p-0 hover:bg-transparent hover:text-default-800 text-default-500 "
      variant="ghost"
      size="icon"
    >
      {collapsed ? (
        <motion.div
          key={collapsed ? "collapsed" : "expanded"}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ArrowRight className="h-6 w-6" />
        </motion.div>
      ) : (
        <motion.div
          key={collapsed ? "collapsed" : "expanded"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Menu className="h-6 w-6" />
        </motion.div>
      )}
    </Button>
  );
}
