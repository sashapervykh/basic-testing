import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  let bankAccount: ReturnType<typeof getBankAccount>;
  beforeEach(() => (bankAccount = getBankAccount(5)));
  afterEach(() => jest.clearAllMocks());

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(5);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccount.withdraw(10);
    }).toThrow(new InsufficientFundsError(5));
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      bankAccount.transfer(10, getBankAccount(1));
    }).toThrow(new InsufficientFundsError(5));
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccount.transfer(10, bankAccount);
    }).toThrow(new TransferFailedError());
  });

  test('should deposit money', () => {
    bankAccount.deposit(10);
    expect(bankAccount.getBalance()).toBe(15);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(3);
    expect(bankAccount.getBalance()).toBe(2);
  });

  test('should transfer money', () => {
    const secondBankAccount = getBankAccount(10);
    bankAccount.transfer(2, secondBankAccount);
    expect(bankAccount.getBalance()).toBe(3);
    expect(secondBankAccount.getBalance()).toBe(12);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const result = await bankAccount.fetchBalance();
    expect(result === null || typeof result === 'number').toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(10);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(10);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
  });
});
