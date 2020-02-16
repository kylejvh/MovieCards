import React, { useState } from "react";

const Scrollable = () => {
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  return (
    <div>
      Buttons
      <button>Previous</button>
      <button>Next</button>
    </div>
  );
};

export default Scrollable;
