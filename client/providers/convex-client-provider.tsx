"use client";

import { ClerkProvider, RedirectToSignIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
    AuthLoading,
    Authenticated,
    ConvexReactClient,
} from "convex/react";
import React, { useSyncExternalStore } from "react";
import { Loading } from "@/components/auth/loading";

interface ConvexClientProviderProps {
    children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;
const useIsClient = () => useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

export const ConvexClientProvider = ({
    children,
}: ConvexClientProviderProps) => {
    const isClient = useIsClient();

    if (!isClient) return null; // На сервере ничего не рендерим

    return (
        <ClerkProvider 
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        clerkJSUrl="/clerk/clerk.browser.js"
        >
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <Authenticated>
                    {children}
                </Authenticated>
                <AuthLoading>
                    <Loading />
                </AuthLoading>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};