"use client";

import React from "react";
import clsx from "clsx";

export function Card({ className, children, ...props }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border bg-white shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div
      className={clsx("p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
