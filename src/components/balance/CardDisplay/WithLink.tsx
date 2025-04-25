import { Pressable } from "react-native";
import React from "react";
import { CardDisplayProps } from "./CardDisplay";
import { Link } from "expo-router";
import Regular from "./Regular";

interface WithLinkProps extends CardDisplayProps {
  href: string;
}

export default function WithLink({ href, ...props }: WithLinkProps) {
  return (
    <Link href={href}>
      <Regular {...props} />
    </Link>
  );
}
