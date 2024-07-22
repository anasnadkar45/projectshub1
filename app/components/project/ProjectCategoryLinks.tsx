"use client"
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export const categoryLinks = [
    {
        id: 0,
        name: 'All',
        href: '/dashboard/all'
    },
    {
        id: 1,
        name: 'Ecommerce',
        href: '/dashboard/ECOMMERCE'
    },
    {
        id: 2,
        name: 'Portfolio',
        href: '/dashboard/PORTFOLIO'
    },
    {
        id: 3,
        name: 'EdTech',
        href: '/dashboard/EDTECH'
    },
    {
        id: 4,
        name: 'FinTech',
        href: '/dashboard/FINTECH'
    },
    {
        id: 5,
        name: 'HealthTech',
        href: '/dashboard/HEALTHTECH'
    },
    {
        id: 6,
        name: 'SaaS',
        href: '/dashboard/SAAS'
    },
    {
        id: 7,
        name: 'Social Media',
        href: '/dashboard/SOCIAL_MEDIA'
    },
    {
        id: 8,
        name: 'Entertainment',
        href: '/dashboard/ENTERTAINMENT'
    },
    {
        id: 9,
        name: 'Travel',
        href: '/dashboard/TRAVEL'
    },
    {
        id: 10,
        name: 'Real Estate',
        href: '/dashboard/REAL_ESTATE'
    },
    {
        id: 11,
        name: 'Productivity',
        href: '/dashboard/PRODUCTIVITY'
    },
    {
        id: 12,
        name: 'Gaming',
        href: '/dashboard/GAMING'
    },
    {
        id: 13,
        name: 'IoT',
        href: '/dashboard/IOT'
    },
    {
        id: 14,
        name: 'AI & ML',
        href: '/dashboard/AI_ML'
    },
    {
        id: 15,
        name: 'Blockchain',
        href: '/dashboard/BLOCKCHAIN'
    },
    {
        id: 16,
        name: 'AgriTech',
        href: '/dashboard/AGRITECH'
    },
    {
        id: 17,
        name: 'HRTech',
        href: '/dashboard/HRTECH'
    },
    {
        id: 18,
        name: 'FoodTech',
        href: '/dashboard/FOODTECH'
    },
    {
        id: 19,
        name: 'Logistics',
        href: '/dashboard/LOGISTICS'
    },
    {
        id: 20,
        name: 'Renewable Energy',
        href: '/dashboard/RENEWABLE_ENERGY'
    },
    {
        id: 21,
        name: 'Cybersecurity',
        href: '/dashboard/CYBERSECURITY'
    }
];


interface TabProps {
    name: string;
    href: string;
    selected: boolean;
    setSelected: (href: string) => void;
}

const Tab = ({ name, href, selected, setSelected }: TabProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                selected
                    ? 'bg-card border-primary rounded-lg'
                    : 'hover:bg-card hover:bg-opacity-75',
                'group text-sm flex items-center px-5 py-1 border-2 font-medium rounded-md transition-colors cursor-pointer'
            )}
            onClick={() => setSelected(href)}
        >
            {name}
        </motion.div>
    );
};

export function ProjectCategoryLinks() {
    const location = usePathname();
    const [selectedTab, setSelectedTab] = useState<string>(location);

    return (
        <ScrollArea className="w-full bg-card whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-2">
                {categoryLinks.map((item) => (
                    <Link href={item.href} key={item.id}>
                        <Tab
                            name={item.name}
                            href={item.href}
                            selected={selectedTab === item.href}
                            setSelected={setSelectedTab}
                        />
                    </Link>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}