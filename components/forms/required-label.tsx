type RequiredLabelProps = {
  children: React.ReactNode;
  required?: boolean;
};

export function RequiredLabel({ children, required = false }: RequiredLabelProps) {
  return (
    <span>
      {children}
      {required && <span className="ml-1 text-destructive">*</span>}
    </span>
  );
}