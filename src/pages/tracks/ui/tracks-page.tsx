import { useState } from "react";
import { Button } from "@shared/ui/button";

export const TracksPage = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Tracks Page</h1>
      <Button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
    </>
  );
};
