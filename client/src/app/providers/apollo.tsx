import { ApolloProvider } from "@apollo/client/react";

import { apolloClient } from "@/lib/apollo-client";

import type { PropsWithChildren } from "react";

export function ApolloProviderWithSuspense({ children }: PropsWithChildren) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
