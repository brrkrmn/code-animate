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

  const newLineAddedInMiddle =
    lineDiffSet[1].added &&
    currentLineEndsWithNewline &&
    prevLineEndsWithNewline;

  if (newLineAddedInMiddle) {
    const prevLineEndingPattern = prevLineEndsWithNewline[0];
    const currentLineEndingPattern = currentLineEndsWithNewline[0];

    const addedLine =
      prevLineEndingPattern +
      lineDiffSet[1].value.slice(0, -currentLineEndingPattern.length);

    addedLine.split("").map((char, index) => {
      transactions.push({
        from: lineDiffSet[0].value.length - 1 + index,
        insert: char,
      });
    });
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
