"use client";

import { ClerkProvider, RedirectToSignIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import {
    AuthLoading,
    Authenticated,
    ConvexReactClient,
} from "convex/react";
import React, { useEffect, useState } from "react";
import { Loading } from "@/components/auth/loading";

interface ConvexClientProviderProps {
    children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
    children,
}: ConvexClientProviderProps) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        // На сервере не рендерим ничего (или можно вернуть fallback)
        return null;
    }
    return  (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
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