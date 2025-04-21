import CardWrapper from '@/app/ui/dashboard/cards'; // Import the CardWrapper component
//import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
//import { fetchCardData } from '@/app/lib/data';  
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardSkeleton, } from '@/app/ui/skeletons';

export default async function Page() {
    //const revenue = await fetchRevenue(); // Fetch the revenue data
    //const latestInvoices = await fetchLatestInvoices(); // Fetch the latest invoices
    //const { totalPaidInvoices,
    //    totalPendingInvoices,
    //    numberOfInvoices,
    //    numberOfCustomers

    //} = await fetchCardData();

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <CardWrapper title="Collected" value={totalPaidInvoices} type="collected" />
                <CardWrapper title="Pending" value={totalPendingInvoices} type="pending" />
                <CardWrapper title="Total Invoices" value={numberOfInvoices} type="invoices" />
                <CardWrapper
                    title="Total Customers"
                    value={numberOfCustomers}
                    type="customers"
                />
            </div> */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense> {/* Wrap the RevenueChart component in a Suspense component */}
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense> {/* Wrap the LatestInvoices component in a Suspense component */}
                <Suspense fallback={<CardSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
        </main>
    );
}