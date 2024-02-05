import { useState } from "react";
import { Breadcrumb } from "@gull";

const Dashboard = () => {
  const [state, setState] = useState({
    openItem: "",
    questionList: [
      "Where can I buy Gull React from?",
      "Do I have right to use it in another template?",
      "What are the benefits that will be provided?",
      "How long shall I get support?",
    ],
  });

  const setOpenItem = (name) => {
    if (name === state.openItem) {
      setState((prevState) => ({ ...prevState, openItem: "" }));
    } else setState((prevState) => ({ ...prevState, openItem: name }));
  };

  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Pages", path: "/pages" },
          { name: "Blank Page" },
        ]}
      />
    </div>
  );
};

export default Dashboard;
