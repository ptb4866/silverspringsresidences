import React from "react";
import { Link as RouterLink } from "react-router-dom";

type Props = React.ComponentProps<typeof RouterLink> & { href: string };

export default function Link({ href, children, ...rest }: Props) {
  return (
    <RouterLink to={href} {...rest}>
      {children}
    </RouterLink>
  );
}
