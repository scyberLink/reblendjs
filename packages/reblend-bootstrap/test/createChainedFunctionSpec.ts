import { describe, expect, it, jest } from '@jest/globals';
import createChainedFunction from '../src/createChainedFunction';

describe('createChainedFunction', () => {
  it('returns null with no arguments', async () => {
    expect(createChainedFunction()).toEqual(null);
  });

  it('returns original function when single function is provided', async () => {
    const func1 = jest.fn();
    expect(createChainedFunction(func1)).toEqual(func1);
  });

  it('wraps two functions with another that invokes both when called', async () => {
    const func1 = jest.fn();
    const func2 = jest.fn();
    const chained = createChainedFunction(func1, func2);

    expect(chained).not.toEqual(func1);
    expect(chained).not.toEqual(func2);

    expect(func1).not.toHaveBeenCalled();
    expect(func2).not.toHaveBeenCalled();

    chained();

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(1);
  });

  it('wraps multiple functions and invokes them in the order provided', async () => {
    const results: number[] = [];
    const func1 = () => results.push(1);
    const func2 = () => results.push(2);
    const func3 = () => results.push(3);
    const chained = createChainedFunction(func1, func2, func3);
    chained();
    expect(results).toEqual([1, 2, 3]);
  });

  it('forwards arguments to all chained functions', async () => {
    const in1 = 'herpa derpa';
    const in2 = {
      herpa: 'derpa',
    };

    const func = (arg1: any, arg2: any) => {
      expect(arg1).toEqual(in1);
      expect(arg2).toEqual(in2);
    };

    const chained = createChainedFunction(func, func, func);
    chained(in1, in2);
  });

  it('throws when func is not provided', async () => {
    expect(async () => {
      createChainedFunction({ herpa: 'derpa' });
    }).toThrow(/Invalid Argument Type/);
  });

  it('works with new Function call', async () => {
    const results = [];
    const func1 = new Function('results', 'results.push(1);');
    const func2 = new Function('results', 'results.push(2);');
    const chained = createChainedFunction(func1, func2);
    chained(results);
    expect(results).toEqual([1, 2]);
  });
});
