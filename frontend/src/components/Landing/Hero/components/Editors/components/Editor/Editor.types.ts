import { Transaction } from "@/utils/getTransactions/getTransactions.types";

export type EditorProps = {
  value: string;
  height: string;
  width: string;
  transactions: Transaction[];
};
