import { ReactNode } from "react";

export const GlassCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-2xl p-8 shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
};
