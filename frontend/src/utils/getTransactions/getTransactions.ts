import { diffChars, diffLines } from "diff";
import { Diff, Transaction } from "./getTransactions.types";

const getTransactions = (initial: string, target: string) => {
  const transactions: Transaction[] = [];

  const charDiffSet = diffChars(initial, target) as Diff[];
  const lineDiffSet = diffLines(initial, target, {
    newlineIsToken: true,
  });

  let pos = 0;

  const prevLineEndsWithNewline = lineDiffSet[0].value.match(/(\n\s*)$/);
  const currentLineEndsWithNewline = lineDiffSet[1].value.match(/(\n\s*)$/);

  const newLineAddedOrRemoved =
    currentLineEndsWithNewline && prevLineEndsWithNewline;

  if (newLineAddedOrRemoved) {
    const prevLineEndingPattern = prevLineEndsWithNewline[0];
    const currentLineEndingPattern = currentLineEndsWithNewline[0];
    const changedLine =
      prevLineEndingPattern +
      lineDiffSet[1].value.slice(0, -currentLineEndingPattern.length);

    if (lineDiffSet[1].added) {
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
    }
  } else {
    charDiffSet.forEach((diff) => {
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
  }
  return transactions;
};

export default getTransactions;
