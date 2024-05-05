interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2 className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ` + className}>
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }: TypographyProps) {
  return (
    <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ` + className}>
      {children}
    </h3>
  );
}
