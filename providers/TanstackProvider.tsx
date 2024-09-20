"use client";

import { getQueryClient } from "@/utils/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";

export const TanstackProvider = ({ children }: PropsWithChildren<{}>) => {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			{children}
		</QueryClientProvider>
	);
};
