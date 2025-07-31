// Command interface placeholder
export interface CommandInterface {
  name: string;
  description: string;
  execute: (options: any) => Promise<void>;
}