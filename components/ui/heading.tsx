import React from "react";

type HeadingProps = {
  title: string;
  description: string;
};

function Heading({ title, description }: HeadingProps) {
  return (
    <section>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </section>
  );
}

export default Heading;
