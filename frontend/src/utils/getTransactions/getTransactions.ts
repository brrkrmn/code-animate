import { diffChars } from "diff";
import { Diff, Transaction } from "./getTransactions.types";

const getTransactions = (initial: string, target: string) => {
  const transactions: Transaction[] = [];

  const diffSet = diffChars(initial, target) as Diff[];

  let pos = 0;

  diffSet.forEach((diff) => {
    if (!diff.added && !diff.removed) {
      pos += diff.count!;
    } else if (diff.added) {
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
    }
  });
  return transactions;
};

export default getTransactions;
