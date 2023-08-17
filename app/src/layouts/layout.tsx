import Navbar from '@/common/components/navbar/Navbar';

export const metadata = {
    title: 'Reddit Clone',
    description: 'A clone of Reddit in its darkest hour',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}
