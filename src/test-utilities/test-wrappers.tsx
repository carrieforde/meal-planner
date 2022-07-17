import { FetchResult } from "@apollo/client";
import {
  MockedProvider,
  MockedResponse,
  ResultFunction,
} from "@apollo/client/testing";
import { DocumentNode, GraphQLError } from "graphql";
import { ReactNode } from "react";

export type TestApolloErrorType = "graphql" | "network";

export const testErrorMessage = "An error occurred!";

interface MockedWrapperArgs {
  result: FetchResult | ResultFunction<FetchResult>;
  query: DocumentNode;
  variables?: Record<string, any>;
}

export function createWrapper(
  args: MockedWrapperArgs[],
  errorType?: TestApolloErrorType
) {
  return function Wrapper({ children }: { children: ReactNode }) {
    const error =
      errorType === "network" ? new Error(testErrorMessage) : undefined;
    const errors =
      errorType === "graphql"
        ? [new GraphQLError(testErrorMessage)]
        : undefined;

    const mappedMocks: MockedResponse[] = args.map(
      ({ result, query, variables }) => {
        return {
          request: {
            query,
            variables,
          },
          result: {
            ...result,
            errors,
          },
          error,
        };
      }
    );

    return <MockedProvider mocks={mappedMocks}>{children}</MockedProvider>;
  };
}
