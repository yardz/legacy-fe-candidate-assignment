# Backend Tests

## Overview

This document describes the unit tests implemented for the backend application.

## Test Framework

- **Framework**: Jest
- **TypeScript Support**: ts-jest
- **Test Environment**: Node.js

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Files

### verifyMessage.test.ts

Tests for the `getVerifiedAddress` utility function that verifies Ethereum message signatures.

**Test Cases (6 tests):**

1. **Valid Signature**: Tests that a valid message and signature return the correct checksummed address
2. **Different Combinations**: Tests multiple message/signature combinations to ensure consistency
3. **Invalid Signature**: Tests error handling when `verifyMessage` throws an error
4. **Invalid Address**: Tests error handling when `getAddress` throws an error
5. **Empty Message**: Tests handling of edge case with empty message string
6. **Function Chaining**: Verifies that the output of `verifyMessage` is correctly passed to `getAddress`

**Coverage**: 100% (Statements, Branches, Functions, Lines)

### validateSchema.test.ts

Tests for the `validateSchema` middleware that validates Express request bodies using Zod schemas.

**Test Cases (10 tests):**

1. **Successful Validation**: Tests that valid data passes validation and calls `next()`
2. **Data Transformation**: Tests that Zod transformations are applied correctly
3. **Validation Error (400)**: Tests that invalid data returns 400 status with error details
4. **Detailed Error Information**: Verifies that error response includes field-level validation errors
5. **Missing Required Fields**: Tests handling of missing required fields
6. **Empty Request Body**: Tests validation with empty request body
7. **Non-Zod Error (500)**: Tests error handling for unexpected errors (returns 500 status)
8. **Complex Nested Schema**: Tests validation of nested objects
9. **Optional Fields**: Tests that optional fields are handled correctly
10. **Unknown Fields Stripping**: Tests that unknown fields are removed from validated data

**Coverage**: 100% (Statements, Branches, Functions, Lines)

## Mock Strategy

### verifyMessage.test.ts

The tests use Jest mocks to isolate the `getVerifiedAddress` function from the external `ethers` library dependencies:

- `verifyMessage` is mocked to return predictable addresses
- `getAddress` is mocked to return checksummed addresses
- Error scenarios are simulated by making mocks throw errors

### validateSchema.test.ts

The tests mock Express objects to test the middleware in isolation:

- `Request` objects are mocked with partial implementations
- `Response` objects are mocked with chainable `status()` and `json()` methods
- `NextFunction` is mocked to verify it's called on successful validation
- Zod schemas are tested with both valid and invalid data

This approach ensures:
- Tests run quickly without real cryptographic operations or HTTP requests
- Tests are deterministic and don't depend on external factors
- Each function's behavior is tested in isolation
- Edge cases and error scenarios are thoroughly covered

## Coverage Report

After running `npm run test:coverage`, you can view the detailed coverage report by opening:

```
backend/coverage/index.html
```

The report shows:
- Line-by-line coverage visualization
- Uncovered code paths
- Coverage percentages for all files

