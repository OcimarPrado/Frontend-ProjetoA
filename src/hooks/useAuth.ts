import { useState } from "react";

export function useAuth() {
  // TEMPORÁRIO: substitua por login real depois
  const [user] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  return { user };
}

