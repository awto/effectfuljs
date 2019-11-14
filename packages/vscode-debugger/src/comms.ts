import { ChildProcess } from "child_process";

export interface Handler {
  id: number;
  name?: string;
  closed?: boolean;
  childProcess?: ChildProcess;
  send(data: any): void;
  onerror?: (data: any) => void;
  onmessage?: (data: any) => void;
  onclose?: () => void;
  close(): void;
}
