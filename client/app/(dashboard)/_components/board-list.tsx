"use client"

import { useSearchParams } from 'next/navigation';
import { EmptySearch } from './empty-search';
import { EmptyFavorites } from './empty-favorites';
import { EmptyBoards } from './empty-boards';

export const BoardList = () => {
    const searchParams = useSearchParams();

    const search = searchParams.get('search') || undefined;
    const favorites = searchParams.get('favorites') || undefined;

    const data = []; // TODO: Change to API call

    if (!data?.length && search) {
        return (
            <EmptySearch />
        );
    }

    if (!data?.length && favorites) {
        return (
           <EmptyFavorites />
        );
    }

    if(!data.length) {
        return (
            <EmptyBoards />
        )
    }

    return (
        <div>
            {JSON.stringify({ search, favorites })}
        </div>
    )
}