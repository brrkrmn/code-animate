export const demoScene = {
  title: "untitled",
  theme: "tomorrowNightBlue",
  radius: "10",
  public: false,
  language: "javascript",
  background: "#05060f",
  id: "90a85421-df29-4eb1-8dfb-844299af0e4b",
  steps: [
    {
      id: "9d8b4b0d-e3a5-47dc-9fd6-1e20f49cc237",
      content: `if (lineDiffSet[1].added) {
  changedLine.split("").map((char, index) => {
    transactions.push({
      from: lineDiffSet[0].value.length - 1 + index,
      insert: char,
    });
  });
} else if (lineDiffSet[1].removed) {
  for (let i = changedLine.length; i >= 0; i--) {
    transactions.push({
      from: //the last position
      to: //to minus 1
      insert: //empty string,
    });
  }
}`,
    },
    {
      id: "cdd6babd-ec2d-4c47-9742-8804b9cac248",
      content: `if (lineDiffSet[1].added) {
  changedLine.split("").map((char, index) => {
    transactions.push({
      from: lineDiffSet[0].value.length - 1 + index,
      insert: char,
    });
  });
} else if (lineDiffSet[1].removed) {
  for (let i = changedLine.length - 1; i >= 0; i--) {
    transactions.push({
      from: //the last position
      to: //to minus 1
      insert: //empty string,
    });
  }
}`,
    },
    {
      id: "d771102d-023e-4286-bb40-9575fe2c86df122",
      content: `if (lineDiffSet[1].added) {
  changedLine.split("").map((char, index) => {
    transactions.push({
      from: lineDiffSet[0].value.length - 1 + index,
      insert: char,
    });
  });
} else if (lineDiffSet[1].removed) {
  for (let i = changedLine.length - 1; i >= 0; i--) {
    transactions.push({
      from:
      to: //to minus 1
      insert: //empty string,
    });
  }
}`,
    },
    {
      id: "d771102d-023e-4286-bb40-9575fe2c86df",
      content: `if (lineDiffSet[1].added) {
  changedLine.split("").map((char, index) => {
    transactions.push({
      from: lineDiffSet[0].value.length - 1 + index,
      insert: char,
    });
  });
} else if (lineDiffSet[1].removed) {
  for (let i = changedLine.length - 1; i >= 0; i--) {
    transactions.push({
      from: lineDiffSet[0].value.length + i - 1,
      to: //to minus 1
      insert: //empty string,
    });
  }
}`,
    },
    {
      id: "d771102d-023e-4286-bb40-9575f232e2c86df1",
      content: `if (lineDiffSet[1].added) {
  changedLine.split("").map((char, index) => {
    transactions.push({
      from: lineDiffSet[0].value.length - 1 + index,
      insert: char,
    });
  });
} else if (lineDiffSet[1].removed) {
  for (let i = changedLine.length - 1; i >= 0; i--) {
    transactions.push({
      from: lineDiffSet[0].value.length + i - 1,
      to:
      insert: //empty string,
    });
  }
}`,
    },
    {
      id: "d771102d-023e-4286-bb40-9575fe2c86df1",
      content: `if (lineDiffSet[1].added) {
  changedLine.split("").map((char, index) => {
    transactions.push({
      from: lineDiffSet[0].value.length - 1 + index,
      insert: char,
    });
  });
} else if (lineDiffSet[1].removed) {
  for (let i = changedLine.length - 1; i >= 0; i--) {
    transactions.push({
      from: lineDiffSet[0].value.length + i - 1,
      to: lineDiffSet[0].value.length + i,
      insert: //empty string,
    });
  }
}`,
    },
    {
      id: "d771102d-023e-4286-bb40-9575fe2c86df2",
      content: `if (lineDiffSet[1].added) {
  changedLine.split("").map((char, index) => {
    transactions.push({
      from: lineDiffSet[0].value.length - 1 + index,
      insert: char,
    });
  });
} else if (lineDiffSet[1].removed) {
  for (let i = changedLine.length - 1; i >= 0; i--) {
    transactions.push({
      from: lineDiffSet[0].value.length + i - 1,
      to: lineDiffSet[0].value.length + i,
      insert:
    });
  }
}`,
    },
    {
      id: "d771102d-023e-4286-bb40-9575fe2c86df2",
      content: `if (lineDiffSet[1].added) {
  changedLine.split("").map((char, index) => {
    transactions.push({
      from: lineDiffSet[0].value.length - 1 + index,
      insert: char,
    });
  });
} else if (lineDiffSet[1].removed) {
  for (let i = changedLine.length - 1; i >= 0; i--) {
    transactions.push({
      from: lineDiffSet[0].value.length + i - 1,
      to: lineDiffSet[0].value.length + i,
      insert: "",
    });
  }
}`,
    },
  ],
};
