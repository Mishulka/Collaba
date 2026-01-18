'use client'

import React from 'react'
import DashboardLayout from './layout';
import { EmptyOrg } from './_components/empty-org';
import { useOrganization } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import { BoardList } from './_components/board-list';

const DashboardPage = () => {
  const { organization } = useOrganization();
  const searchParams = useSearchParams(); 

  const search = searchParams.get('search') || undefined;
  const favorites = searchParams.get('favorites') || undefined;

  return (
    <DashboardLayout>
      <div className='flex-1 h-[calc(100%-76px)]
      p-6'>
        {!organization ? (
        <EmptyOrg />
        ) : (
          <BoardList
            orgId={organization.id}
            query={searchParams}
          />
        )}
      </div>
    </DashboardLayout>
  )
};

export default DashboardPage;