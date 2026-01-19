# Technical Challenge Submission

## Problem 1: Three Ways to Sum to N

**Solutions**:

1. **Iterative Loop ($O(n)$)** - Traditional iterative approach
   - Uses a standard `for` loop to increment the total sum.
   - **Advantage**: Highly reliable, easy to understand, and prevents stack overflow.
   - **Validation**: Ensures input is a positive integer before processing.

2. **Recursive Implementation ($O(n)$)** - Functional programming style
   - The function calls itself, reducing $n$ until it reaches the base case of 1.
   - **Advantage**: Clean, declarative code following functional paradigms.



3. **Mathematical Formula ($O(1)$)** - Arithmetic Progression
   - Uses Gauss's summation formula: (n * (n + 1)) / 2.
   - **Advantage**: The most efficient solution with constant time complexity.



**Assumptions**:
- **Strict Validation**: Inputs must be positive integers.
- **Error Handling**: Non-integer inputs (strings, decimals) and negative numbers return a descriptive error message.
- **Safety**: Result is assumed to be within `Number.MAX_SAFE_INTEGER`.

---


---

## Problem 2: Currency Swap Application

**Key Features**:

- **Bidirectional State Synchronization** - Real time calculation logic that updates the "Sell" or "Buy" fields automatically when the opposite amount is changed.
- **Dynamic Asset Integration** - Fetches live token pricing and metadata from the Switcheo repository, ensuring up-to-date exchange rates.
- **Enhanced UX/UI** - Features localized loading states for API calls, smooth dropdown transitions, and a "Quick Swap" button to invert token pairs.
- **Robust Validation Engine** - Prevents invalid inputs (negatives, non-numeric)
- **Responsive Architecture** - Fully optimized for devices ranging from small-screen mobile (320px) to large desktop monitors.

**Tech Stack**:

- **React 19** - Utilizing the latest Concurrent Rendering features and improved action handling.
- **TypeScript 5.9** - Full type safety across token interfaces, API responses, and custom hooks.
- **Vite 7** - Ultra-fast development server and optimized production bundling.
- **Tailwind CSS 4.1 & DaisyUI 5** - Modern, CSS-first utility styling with a comprehensive component system.
- **Axios** - Reliable promise-based HTTP client for real-time pricing data.

**Setup & Run**:

```bash
cd src/problem2
npm install
npm run dev
```

**[Demo: https://fe-coding-challenge-hlyan-htet-aung.vercel.app/](https://fe-coding-challenge-hlyan-htet-aung.vercel.app/)**

### **Implementation Details**
- **Strict Type Safety**: Every data structure is fully typed with **TypeScript** to prevent bugs and ensure data consistency.
- **Performance Optimization**: Used `useMemo` and `useCallback` to ensure math and functions only run when necessary, keeping the UI fast.

- **Smart Synchronization**: Built a custom `useSwapLogic` hook that automatically calculates exchange rates in real-time.
- **Clean Code Structure**: Separated "logic" from "visuals" to make the code easier to read, test, and maintain.
- **Robust Input Handling**: Amount fields are protected against negative numbers and invalid characters.
---

## Problem 3: Messy React Code Analysis & Refactoring

**Issues Identified & Fixed**:

1. **Type Safety Issues**:
   - The original code used `any` for the `blockchain` parameter in the `getPriority` function.
   - The `WalletBalance` interface was missing the `blockchain` property, which led to property access errors.
   - **Refactor**: Defined explicit types and extended interfaces to ensure full TypeScript coverage.

2. **Logic & Variable Errors**:
   - **Undefined Variable**: The code referenced `lhsPriority` inside the filter, which was not defined in that scope, causing a runtime crash.
   - **Flawed Filtering**: The logic incorrectly returned `true` for `amount <= 0`, which would show empty wallets instead of funded ones.
   - **Refactor**: Fixed variable references and corrected the filter to return `priority > -99 && amount > 0`.

3. **Performance & Memoization**:
   - **Incorrect Dependencies**: Included `prices` in the `useMemo` dependency array for sorting. Since prices change frequently (but don't affect sorting), this caused expensive re-sorts.
   - **Double Iteration**: The code mapped the array twice (once for `formattedBalances` and once for `rows`).
   - **Refactor**: Cleaned up dependencies and combined formatting into a single render pass ($O(n)$).



4. **React Anti-Patterns**:
   - **Unstable Keys**: Used `index` as a key for the `WalletRow` components.
   - **Unused Variables**: `formattedBalances` was calculated but never actually used in the rendered output.
   - **Refactor**: Implemented a composite unique key (`${currency}-${blockchain}`) and removed the redundant `formattedBalances` array.



5. **Code Quality & Maintenance**:
   - **Helper Location**: `getPriority` was defined inside the component, causing it to be redefined on every render.
   - **Missing UI**: The `children` prop was destructured but never rendered.
   - **Refactor**: Moved pure helpers outside the component and ensured all props (including `children`) are correctly rendered in the JSX.

---