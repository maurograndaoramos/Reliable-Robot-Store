import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HeaderProps } from '@/lib/interfaces';

const Header: React.FC<HeaderProps> = ({ title = "Reliable Robot Resources" }) => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-xl font-bold flex items-center">
                        <Image
                            src="/robot02_90810.svg"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="mr-2"
                        />
                        {title}
                    </h1>
                </Link>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link className="hover:underline" href="/">
                                Home
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;