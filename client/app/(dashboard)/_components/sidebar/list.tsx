"use client";

import { OrganizationList, useOrganizationList } from "@clerk/nextjs";
import { OrganizationMembership } from "@clerk/nextjs/server";
import { Item } from "./item";



export const List =  () => {
    const { userMemberships } = useOrganizationList({
        userMemberships: {infinite: true},
    });

    if (!userMemberships.data?.length) return null;

    return (
        <ul className="space-y-4">
            {userMemberships.data?.map((membership) => (
                <Item
                    key={membership.organization.id}
                    id={membership.organization.id}
                    name={membership.organization.name}
                    imageUrl={membership.organization.imageUrl}
                />
            ))}
        </ul>
    );
}