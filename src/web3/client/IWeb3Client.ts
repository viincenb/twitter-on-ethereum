export interface IWeb3Client {
  getBlockNumber: () => Promise<number>
  getAccounts: () => Promise<string[]>
  getBalance: () => Promise<string>
}