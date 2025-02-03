import { diffChars } from "diff";
import { Diff, Transaction } from "./getTransactions.types";

const getTransactions = (initial: string, target: string) => {
  const transactions: Transaction[] = [];

  const diffSet = diffChars(initial, target) as Diff[];

  let pos = 0;

  diffSet.forEach((diff, index) => {
    if (diff.added && index > 0) {
      const prevDiff = diffSet[index - 1];
      const match = prevDiff.value.match(/(\n\s*)$/);

      if (match) {
        const trailingNewlineAndSpaces = match[0];

        prevDiff.value = prevDiff.value.slice(
          0,
          -trailingNewlineAndSpaces.length
        );

        diff.value = trailingNewlineAndSpaces + diff.value;

        if (diff.value.endsWith("\n")) {
          diff.value = diff.value.slice(0, -1);
        }

        pos -= trailingNewlineAndSpaces.length;
      }
    }

    if (diff.added) {
      diff.value.split("").map((char, index) => {
        transactions.push({
          from: pos + index,
          insert: char,
        });
      });
    } else if (diff.removed) {
      for (let i = diff.value.length; i > 0; i--) {
        transactions.push({
          from: pos + i - 1,
          to: pos + i,
          insert: "",
        });
      }
      pos -= diff.count;
    }
    pos += diff.count!;
  });
  return transactions;
};

export default getTransactions;
